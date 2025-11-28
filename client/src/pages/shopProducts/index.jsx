import { memo, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaAnglesLeft } from "react-icons/fa6";
import { useParams, Navigate } from "react-router-dom";
import { Text } from "../../components/atoms";
import { CardItem, CardBanner } from "../../components/molecules";
import { useBackMenu } from "../../utils/usePopUp";
import { MainLayout } from "../../components/organisms";
import { useProducts, useProductsByCategory } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useAddToCart } from "../../hooks/useCart";
import { setFilters } from "../../store/slices/productsSlice";
import { showToast } from "../../store/slices/uiSlice";

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
  </div>
);

// Error Component
const ErrorMessage = ({ message }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <Text level="h5" className="text-red-500 mb-2">
        Error
      </Text>
      <Text>{message || "Something went wrong"}</Text>
    </div>
  </div>
);

// BackButton Component
const BackButton = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 left-4 z-10 text-white hover:text-black bg-black hover:bg-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
    aria-label="Go back"
  >
    <FaAnglesLeft size={20} />
  </button>
));

BackButton.displayName = "BackButton";

// Hero Section Component
const HeroSection = memo(({ title, backgroundImage, onBack }) => (
  <div className="col-span-12 lg:col-span-6 border-b border-black flex flex-col items-start h-[50vw] lg:max-h-[50vw] lg:min-h-[50vw] lg:sticky top-0 relative">
    <BackButton onClick={onBack} />
    <div
      className="flex flex-col gap-4 flex-1 items-center justify-center self-stretch h-full bg-center bg-cover"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : { backgroundColor: "#ffffff" }
      }
    >
      <Text
        level="h2"
        className={backgroundImage ? "text-white drop-shadow-lg" : "text-black"}
        data-aos="fade-up"
      >
        {title}
      </Text>
    </div>
  </div>
));

HeroSection.displayName = "HeroSection";

// Shop Products Page - All Categories
export const ShopProductsPage = memo(() => {
  const handleBack = useBackMenu();
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <MainLayout>
      <section className="col-span-12 grid grid-flow-dense grid-cols-12">
        <HeroSection
          title={
            <>
              Choose a <br /> Category
            </>
          }
          onBack={handleBack}
        />

        <div className="col-span-12 lg:col-span-6">
          {categories?.categories?.map((category, index) => (
            <CardBanner
              key={category.id}
              index={index}
              label={category.name}
              itemName={category.name}
              itemImg={category.image_url}
              to={`/shop/${category.slug}`}
              buttonLink="Shop Now"
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
});

ShopProductsPage.displayName = "ShopProductsPage";

// Category Products Page - Specific Category
export const CategoryProductsPage = memo(() => {
  const handleBack = useBackMenu();
  const { name } = useParams();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const [page, setPage] = useState(1);
  
  // Fetch category data
  const { data: categories } = useCategories();
  const category = useMemo(() => {
    return categories?.categories?.find(
      (cat) => cat.slug === decodeURIComponent(name)
    );
  }, [categories, name]);

  // Fetch products for this category
  const {
    data: productsData,
    isLoading,
    error,
  } = useProductsByCategory(name, {
    page,
    limit: 12,
    ...filters,
  });

  // Add to cart mutation
  const addToCart = useAddToCart();

  const handleAddToCart = (product) => {
    addToCart.mutate(
      { product_id: product.id, quantity: 1 },
      {
        onSuccess: () => {
          dispatch(
            showToast({
              type: "success",
              message: `${product.name} added to cart!`,
            })
          );
        },
        onError: (error) => {
          dispatch(
            showToast({
              type: "error",
              message: error.response?.data?.message || "Failed to add to cart",
            })
          );
        },
      }
    );
  };

  // Handle category not found
  if (!isLoading && !category) {
    return <Navigate to="/shop" replace />;
  }

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const products = productsData?.products || [];

  return (
    <MainLayout>
      <section className="grid grid-flow-dense grid-cols-12 col-span-12">
        <HeroSection
          title={category?.name}
          backgroundImage={category?.image_url}
          onBack={handleBack}
        />

        <div className="col-span-12 lg:col-span-6 grid grid-cols-2">
          {products.length === 0 ? (
            <div className="col-span-2 flex items-center justify-center p-20">
              <Text level="h5" className="text-gray-500">
                No products available in this category
              </Text>
            </div>
          ) : (
            products.map((product, i) => (
              <div
                key={product.id}
                className="col-span-2 md:col-span-1"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <CardItem
                  itemPrice={product.price}
                  index={i}
                  itemName={product.name}
                  itemImg={product.image_url}
                  onAddToCart={() => handleAddToCart(product)}
                  product={product}
                />
              </div>
            ))
          )}

          {/* Pagination */}
          {productsData?.pagination?.totalPages > 1 && (
            <div className="col-span-2 flex justify-center gap-4 py-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <Text>
                Page {page} of {productsData.pagination.totalPages}
              </Text>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= productsData.pagination.totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
});

CategoryProductsPage.displayName = "CategoryProductsPage";

export default ShopProductsPage;
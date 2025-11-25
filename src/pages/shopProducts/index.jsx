import { memo, useMemo } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import { useParams, Navigate } from "react-router-dom";
import { Categories } from "../../../assets/data/categoryShop";
import { Text } from "../../../components/atoms";
import { CardItem, CardBanner } from "../../../components/molecules";
import { useBackMenu } from "../../../utils/usePopUp";
import { MainLayout } from "../../../components/organisms";
import { FRESH_FLOWER } from "../data/dataFreshFlowers";

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
          {Categories.map((category, index) => (
            <CardBanner
              key={category.name}
              index={index}
              label={category.name}
              itemName={category.name}
              itemImg={category.itemImg}
              to={`/shop/${encodeURIComponent(category.name)}`}
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

  // Find category
  const category = useMemo(() => {
    const decodedName = decodeURIComponent(name);
    return Categories.find((cat) => cat.name === decodedName);
  }, [name]);

  // Filter products by category (currently showing all FRESH_FLOWER)
  // In production, you would filter based on category
  const products = useMemo(() => {
    // TODO: Filter products based on category
    return FRESH_FLOWER;
  }, []);

  // Handle category not found
  if (!category) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <MainLayout>
      <section className="grid grid-flow-dense grid-cols-12 col-span-12">
        <HeroSection
          title={category.name}
          backgroundImage={category.itemImg}
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
                key={product.name}
                className="col-span-2 md:col-span-1"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <CardItem
                  itemPrice={product.price}
                  index={i}
                  itemName={product.name}
                  itemImg={product.image}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
});

CategoryProductsPage.displayName = "CategoryProductsPage";

// Detail Product Page
export const DetailProductPage = memo(() => {
  return (
    <MainLayout>
      <div className="col-span-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Text level="h2" className="mb-4">
            Product Detail
          </Text>
          <Text>Coming Soon...</Text>
        </div>
      </div>
    </MainLayout>
  );
});

DetailProductPage.displayName = "DetailProductPage";

export default ShopProductsPage;
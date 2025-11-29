import { memo } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import { Text } from "../../components/atoms";
import { CardBanner } from "../../components/molecules";
import { MainLayout } from "../../components/organisms";
import { useCategories } from "../../hooks/useCategories";
import { useBackMenu } from "../../utils/usePopUp";

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

  console.log("data categories", categories);

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
          {categories?.map((category, index) => (
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

export default ShopProductsPage;
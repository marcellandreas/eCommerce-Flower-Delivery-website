import { CardBanner } from "../../components/molecules/Card";
import { Categories } from "../../assets/data/categoryShop";
import { FaAnglesLeft } from "react-icons/fa6";
import useBackMenu from "../../utils/useBackMenu";
import { Text } from "../../components/atoms";
import { MainLayout } from "../../components/organisms";

const ShopProductsPage = () => {
  const handleBack = useBackMenu();

  return (
    <MainLayout>
      <section className="col-span-12 grid grid-flow-dense grid-cols-12">
        {/* Header Section */}
        <div className="col-span-12 lg:col-span-6 border-b border-black flex flex-col items-start h-[50vw] lg:max-h-[50vw] lg:min-h-[50vw] lg:sticky top-0 relative">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-white hover:text-black bg-black hover:bg-white p-3 rounded-full"
          >
            <FaAnglesLeft size={20} />
          </button>
          <div className="flex flex-col gap-4 bg-red-700 flex-1 items-center justify-center self-stretch h-full bg-center bg-cover">
            <Text level="h2" color="white">
              SHOP
            </Text>
          </div>
        </div>

        {/* Categories Section */}
        <div className="col-span-12 lg:col-span-6">
          {Categories.map((category, index) => (
            <CardBanner
              key={index}
              index={index}
              label={category.name}
              itemImg={category.itemImg}
              to={`/shop/${category.name}`}
              buttonLink="Shop Now"
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default ShopProductsPage;

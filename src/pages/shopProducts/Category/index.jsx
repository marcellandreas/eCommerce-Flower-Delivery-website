import { FaAnglesLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Categories } from "../../../assets/data/categoryShop";
import Text from "../../../components/atoms/Text";
import { MainLayout } from "../../../components/Layout/MainLayout";
import { CardItem } from "../../../components/molecules/Card";
import useBackMenu from "../../../utils/useBackMenu";
import { freshFlowers } from "../dataFreshFlowers";

const CategoryPage = () => {
  const handleBack = useBackMenu();

  const { name } = useParams();

  // Cari kategori berdasarkan nama
  const category = Categories.find((cat) => cat.name === name);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  return (
    <MainLayout>
      <section className="  grid grid-flow-dense grid-cols-12 col-span-12">
        <div className=" col-span-12 lg:col-span-6  border-b border-black flex flex-col items-start h-[50vw] lg:max-h-[50vw] lg:min-h-[50vw]  lg:sticky top-0 relative">
          {/* row 1 */}
          <button
            onClick={handleBack}
            className=" absolute top-4 left-4 text-white hover:text-black  bg-black hover:bg-white p-3 rounded-full"
          >
            <FaAnglesLeft size={20} className="" />
          </button>
          <div
            className="flex flex-col gap-4 flex-1 items-center justify-center self-stretch h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${category.itemImg})` }}
          >
            <Text level="h2" className="text-white">
              {category?.name}
            </Text>
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-6 grid grid-cols-2 grid-rows-2  ">
          {freshFlowers.map((data, i) => (
            <div
              key={i}
              className=" col-span-2 row-span-1  md:col-span-1 md:row-span-1"
            >
              <CardItem
                itemPrice={data.price}
                index={i}
                itemName={data.name}
                itemImg={data.image}
              />
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default CategoryPage;

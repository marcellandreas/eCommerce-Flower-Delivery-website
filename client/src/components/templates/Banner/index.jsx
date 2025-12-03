import hero from "../../../assets/images/hero.png";
import { useCategories } from "../../../hooks/useCategories";
import { Text } from "../../atoms";
import { Layout } from "../../organisms";
import { CardBanner } from "../../molecules";

const Banner = () => {
  const { data: categoriesData, isLoading } = useCategories();
  const categories = categoriesData?.data || [];

  return (
    <Layout>
      <div className=" col-span-12 lg:col-span-6 px-4 py-10 md:p-20 border-b border-black flex flex-col items-start lg:max-h-[50vw] lg:min-h-[50vw]  lg:sticky top-0">
        {/* row 1 */}
        <div
          data-aos="fade-up"
          className="flex flex-col  gap-4 flex-1 self-stretch "
        >
          <Text level="h2">
            Kyiv LuxeBouquets
            <Text level="h3">®</Text>
          </Text>
          <Text level="subtitle" className="self-stretch">
            Discover Uniquely Crafted Bouquets and Gifts for Any Occasion:
            Spread Joy with Our Online Flower Delivery Service
          </Text>
        </div>
        {/* row 2 */}

        <div className="flex pt-6 justify-end items-end flex-1 self-stretch border-t border-black">
          {/* 1 */}
          <div className=" flex pr-6 items-start flex-1 self-stretch border-r border-black">
            <img src={hero} className="w-full h-full" alt="" />
          </div>
          {/* 2 */}
          <div className=" flex pl-6 items-end flex-1 self-stretch  text-justify">
            <Text level="caption">
              Experience the joy of giving with our modern floral studio. Order
              online and send fresh flowers, plants and gifts today.
            </Text>
          </div>
        </div>
      </div>
      <div className=" col-span-12 lg:col-span-6  ">
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vw]">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          categories?.map((data, i) => (
            <CardBanner
              key={data.id || i}
              index={i}
              label={data.name}
              itemName={data.name}
              itemImg={data.image_url}
              to={`/shop/${data.slug}`}
              buttonLink={"Shop Now"}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Banner;

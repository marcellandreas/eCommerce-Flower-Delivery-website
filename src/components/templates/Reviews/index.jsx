import { FaGoogle } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "../../atoms/Button";
import Text from "../../atoms/Text";
import Content from "../../molecules/Content";

import { ReviewsCustomer } from "../../../assets/data/DataReview";

const Reviews = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4 self-stretch">
      <Content>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <p>
              <FaGoogle />
            </p>
            <Text level="overline">Reviews</Text>
          </div>
          <div className=" flex justify-center gap-8 items-center flex-col">
            <Text level="h2">Our Clients say</Text>
            <div className="w-[1200px] w-max-[1200px]">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {ReviewsCustomer.map((review, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="h-[180px]">
                        <div className="  px-40 flex justify-center items-center h-full flex-col">
                          <Text>{review.commentCustomer}</Text>
                          <Text level="h5">- {review.nameCustomer}</Text>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className=" w-1/5">
              <Button>Read Views</Button>
            </div>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default Reviews;

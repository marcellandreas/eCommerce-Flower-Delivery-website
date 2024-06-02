import { FaGoogle } from "react-icons/fa6";
import Content from "../../molecules/Content";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Reviews = () => {
  const reviews = [
    {
      commentCustomer:
        "The flowers were absolutely stunning and lasted for a long time! Highly recommend this service.",
      nameCustomer: "Alice Johnson",
      dateComment: "2024-01-15",
    },
    {
      commentCustomer:
        "Great customer service and beautiful arrangements. Will definitely order again.",
      nameCustomer: "Michael Brown",
      dateComment: "2024-02-10",
    },
    {
      commentCustomer:
        "The bouquet was even better than the pictures. Delivered on time and in perfect condition.",
      nameCustomer: "Sophia Davis",
      dateComment: "2024-03-22",
    },
    {
      commentCustomer:
        "I ordered flowers for my anniversary and they were perfect. My wife loved them!",
      nameCustomer: "James Wilson",
      dateComment: "2024-04-05",
    },
    {
      commentCustomer:
        "Easy to order and the flowers were beautiful. Great experience overall.",
      nameCustomer: "Emily Martinez",
      dateComment: "2024-05-13",
    },
    {
      commentCustomer:
        "Excellent service and beautiful flowers. They really made my day special.",
      nameCustomer: "Daniel Taylor",
      dateComment: "2024-06-01",
    },
    {
      commentCustomer:
        "The flowers were fresh and beautifully arranged. Highly satisfied with my purchase.",
      nameCustomer: "Olivia Anderson",
      dateComment: "2024-06-10",
    },
    {
      commentCustomer:
        "Fantastic experience! The flowers were gorgeous and the delivery was prompt.",
      nameCustomer: "Lucas Thomas",
      dateComment: "2024-07-08",
    },
    {
      commentCustomer:
        "The best flower delivery service I've used. The flowers were stunning and lasted for weeks.",
      nameCustomer: "Emma Lee",
      dateComment: "2024-08-19",
    },
    {
      commentCustomer:
        "Beautiful flowers and great customer service. Will definitely order again!",
      nameCustomer: "Henry Harris",
      dateComment: "2024-09-23",
    },
  ];
  return (
    <section className="flex flex-col justify-center items-center gap-4 self-stretch">
      <Content>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <p>
              <FaGoogle />
            </p>
            <p className=" text-mobileOverline md:text-desktopOverline">
              REVIEWS
            </p>
          </div>
          <div className=" flex justify-center gap-8 items-center flex-col">
            <h2 className=" text-mobileH2 md:text-desktopH2 font-bold ">
              Our Clients say
            </h2>
            <div className="w-[1200px] w-max-[1200px]   ">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {reviews.map((review, i) => {
                  return (
                    <SwiperSlide>
                      <div className="h-[180px]">
                        <div className="  px-40 flex justify-center items-center h-full flex-col">
                          <p>{review.commentCustomer}</p>
                          <p>- {review.nameCustomer}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default Reviews;

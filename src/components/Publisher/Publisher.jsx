import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Autoplay } from "swiper/modules"; // Import Autoplay module

const Publisher = () => {
  const axiosPublic = useAxiosPublic();

  const { data: publishers = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-4">
        All publishers
      </h2>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={4}
        autoplay={{ delay: 1000, disableOnInteraction: false }} // Autoplay set to 1s
        modules={[Autoplay]} // Add Autoplay module
        className="mySwiper"
      >
        {publishers.map((publisher) => (
          <SwiperSlide key={publisher._id}>
            <div className="p-3 flex flex-col justify-center items-center">
              <img
                className="w-40 p-3 rounded-xl border"
                src={publisher.logo}
                alt=""
              />
              <h3 className="lg:text-2xl text-sm md:text-xl font-semibold mt-3 text-green-600">
                {publisher.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Publisher;

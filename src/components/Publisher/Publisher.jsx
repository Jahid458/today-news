import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// import "./styles.css";
const Publisher = () => {
  const axiosPublic = useAxiosPublic();

  const { data: publishers = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  console.log(publishers);
  return (
    <div className="w-11/12 mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 mb-8">
        All publishers
      </h2>
      <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
        {publishers.map((publisher) => (
          <SwiperSlide key={publisher._id}>
            <div  className="p-3 flex flex-col  justify-center items-center ">
              <img
                className="w-40 p-3 rounded-xl  border"
                src={publisher.logo}
                alt=""
              />
              <h3 className="lg:text-2xl text-sm md:text-xl font-semibold mt-3 text-orange-600">
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

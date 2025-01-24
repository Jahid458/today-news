
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch trending articles using TanStack Query
  const {
    data: trendingArticles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trendingArticles");
      return res.data;
    },
  });

  const handleViewCount = (id) => {
    console.log(id);
    axiosPublic.patch(`/viewCount/${id}`).then((res) => {
      refetch();
      console.log(res);
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-green-600">
        Failed to load trending articles.
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-9">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Trending Articles</h2>
      <Swiper
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1, 
          },
          768: {
            slidesPerView: 2, 
          },
          1024: {
            slidesPerView: 3, 
          },
        }}
      >
        {trendingArticles.map((article) => (
          <SwiperSlide key={article._id}>
            <div className="card bg-white h-[400px] shadow-lg rounded-lg overflow-hidden">
              <figure>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body p-3">
                {/* Title */}
                <h3 className="text-lg font-bold">{article.title}</h3>

                {/* Publisher */}
                <p className="text-sm text-gray-500 ">
                  <strong>Publisher:</strong> {article.publisher}
                </p>

                {/* View Count */}
                <p className="text-sm text-green-600">
                  <strong>Views:</strong> {article.viewCount}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <div className="mt-4">
                  <button onClick={() => handleViewCount(article._id) }>
                    <Link
                      to={`/article-details/${article._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticles;

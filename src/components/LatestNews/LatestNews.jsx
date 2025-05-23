import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const LatestNews = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch trending articles using TanStack Query
  const { data: Articles = [] } = useQuery({
    queryKey: ["all-article-user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-article-user");
      return res.data;
    },
  });
  console.log(Articles);
  return (
    <div>
      {/* <h2 className="text-3xl font-bold mb-3 text-center text-green-600">
        Latest News
      </h2> */}

      <h2 className="lg:text-5xl md:text-3xl dark:text-white  text-2xl w-11/12 mx-auto font-serif font-extrabold text-gray-800 uppercase tracking-wider border-b-8 border-double border-gray-700 pb-3">
        📰 Latest News
      </h2>
      <div className="w-11/12 mx-auto my-10">
        {Articles.length > 0 && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div className="">
              <img
                src={Articles[0].image}
                alt={Articles[0].title}
                className="w-full h-[300px] object-cover "
              />
              <h2 className="text-xl font-bold mt-4 hover:underline">
                <Link to={`/article-details/${Articles[0]._id}`}>
                  {Articles[0].title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-white">
                {Articles[0].description.slice(0, 350)}...
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                {Articles.slice(1, 5).map((news) => (
                  <div key={news._id} className="flex flex-col gap-6 w-full ">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-32 object-cover "
                    />
                    <div>
                      <h3 className="text-md font-semibold  hover:underline">
                        <Link to={`/article-details/${news._id}`}>
                          {news.title}
                        </Link>
                      </h3>
                      <h3 className="text-gray-600 dark:text-white">
                        {news.description.slice(0, 50)}...
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNews;

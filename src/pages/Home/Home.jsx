import Publisher from "../../components/Publisher/Publisher";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";

const Home = () => {
    return (
        <div className="mt-20">
           <TrendingArticles></TrendingArticles>
           <Publisher></Publisher>
        </div>
    );
};

export default Home;
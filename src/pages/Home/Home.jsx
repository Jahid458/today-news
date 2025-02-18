
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Plans from "../../components/Plans/Plans";
import Publisher from "../../components/Publisher/Publisher";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import UserStats from "../../components/UserStats/UserStats";
import NewspaperAccordion from "../../components/AccordionItem/NewspaperAccordion";
import Reviews from "../../components/Reviews/Reviews";
import LatestNews from "../../components/LatestNews/LatestNews";
import SubscribeNewsletter from "../../components/SubscribeNewsletter/SubscribeNewsletter";


const Home = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate(); // Navigation function from react-router

  useEffect(() => {
    // Trigger modal after 10 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToSubscription = () => {
    navigate("/subscription"); // Navigate to the subscription page
  };

  return (
    <div className="mt-10">
      {/* Sections */}
      <LatestNews/>
      <TrendingArticles />
      <Publisher />
      <Plans />
      <UserStats/>
      <NewspaperAccordion />
      <Reviews/>
      <SubscribeNewsletter/>
      

      {/* Modal for Subscription */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-10 rounded-2xl shadow-xl text-center relative">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-xl p-2 hover:bg-red-600 transition"
        aria-label="Close"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">Subscribe Now!</h2>
      <p className="mb-4">
        Get access to Premium by subscribing to our plans.
      </p>
      <button
        onClick={handleNavigateToSubscription}
        className="btn w-64 rounded-full bg-slate-500 hover:text-white hover:bg-green-600 transition"
      >
        Go to Subscription
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;

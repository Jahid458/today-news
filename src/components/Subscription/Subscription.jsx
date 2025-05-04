import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('');
  const navigate = useNavigate();

  const prices = {
    '1 minute': '$2.99',
    '5 days': '$12',
    '10 days': '$19',
  };

  const handleSubscribe = () => {
    if (subscriptionPeriod) {
      navigate('/payment', { state: { subscriptionPeriod, price: prices[subscriptionPeriod] } });
    } else {
      alert('Please select a subscription period.');
    }
  };

  return (
    <div className="bg-white text-black p-12 flex flex-col items-center space-y-8 shadow-xl rounded-lg">
      <h1 className="text-5xl font-extrabold text-center">Subscribe to Our Newspaper!</h1>
      <p className="text-xl text-center max-w-3xl">
        Unlock exclusive content, stay updated, and enjoy a seamless reading experience with our premium subscription plans. Choose the plan that suits your needs!
      </p>

      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-2xl font-semibold">Choose Your Subscription Plan</p>
        </div>

        <div className="space-y-4">
          <select 
            className="w-full border-2 border-green-500 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={subscriptionPeriod}
            onChange={(e) => setSubscriptionPeriod(e.target.value)}
          >
            <option value="" disabled>Select a subscription</option>
            <option value="1 minute">1 Minute - {prices['1 minute']}</option>
            <option value="5 days">5 Days - {prices['5 days']}</option>
            <option value="10 days">10 Days - {prices['10 days']}</option>
          </select>
        </div>

        {/* Pricing details display */}
        {subscriptionPeriod && (
          <div className="text-center mt-4">
            <p className="text-lg font-semibold">Price: {prices[subscriptionPeriod]}</p>
          </div>
        )}

        <div className="flex justify-center">
          <button 
            className="bg-green-500 hover:bg-green-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-md transition duration-300"
            onClick={handleSubscribe}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      <p className="text-sm text-center">
        Your premium status will expire after the selected subscription period ends. Enjoy uninterrupted access until then!
      </p>
    </div>
  );
};

export default Subscription;

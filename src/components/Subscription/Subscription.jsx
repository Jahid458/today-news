import  { useState } from 'react';
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
    <div 
      className="bg-green-200 text-black  p-10 shadow-xl flex flex-col items-center"
    >
      <h1 className="text-5xl font-extrabold mb-6">Subscribe Our Newspaper!</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Unlock exclusive features and elevate your experience. Select a subscription plan that works best for you!
      </p>

      <div className="bg-white text-gray-800 p-14  rounded-2xl shadow-lg w-full max-w-md mb-8">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">Select Your Plan</p>
          <select 
            className="w-full border border-gray-300 rounded-lg p-3 text-lg"
            value={subscriptionPeriod}
            onChange={(e) => setSubscriptionPeriod(e.target.value)}
          >
            <option value="" disabled>Choose a subscription</option>
            <option value="1 minute">1 Minute - {prices['1 minute']}</option>
            <option value="5 days">5 Days - {prices['5 days']}</option>
            <option value="10 days">10 Days - {prices['10 days']}</option>
          </select>
        </div>
      </div>

      <button 
        className="bg-green-400 hover:bg-green-600 text-black font-bold text-lg px-8 py-3 rounded-full shadow-md"
        onClick={handleSubscribe}
      >
        Subscribe Now
      </button>

      <p className="text-sm mt-6 text-black text-center">
        Your premium status will revert to normal after the subscription period ends.
      </p>
    </div>
  );
};

export default Subscription;
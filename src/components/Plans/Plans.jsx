
// import { FaNewspaper, FaBook, FaStopwatch, FaUsers, FaCloudDownloadAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Plans = () => {
//   return (
//     <div className=" text-center p-5">
//       <h1 className="text-4xl font-bold text-green-600 mb-8">Our Plans</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Premium */}
//         <div className="bg-gray-800 text-white h-[500px] rounded-lg shadow-md p-6 hover:scale-105 transition-transform">
//           <h2 className="text-2xl font-bold mb-2">FREE</h2>
//           <p className="text-lg mb-4 text-green-400">FREE FOR 1 MONTH</p>
//           <ul className="text-green-200 text-left mb-6 space-y-3">
//             <li className="flex items-center">
//               <FaNewspaper className="mr-2 text-green-400" /> 25+ free newspapers
//             </li>
//             <li className="flex items-center">
//               <FaBook className="mr-2 text-green-400" /> Access to premium articles
//             </li>
//             <li className="flex items-center">
//               <FaStopwatch className="mr-2 text-green-400" /> 15 hours/month of reading time
//             </li>
//             <li className="flex items-center">
//               <FaCloudDownloadAlt className="mr-2 text-green-400" /> Offline downloads
//             </li>
//             <li className="flex items-center">
//               <FaUsers className="mr-2 text-green-400" /> 1 Premium account
//             </li>
//           </ul>
//           <Link to='subscription'>
//           <button className="btn btn-success w-full">Subscribe Now</button>
//           </Link>
//         </div>

//         {/* Premium Duo */}
//         <div className="bg-gray-800 text-white h-[500px] rounded-lg shadow-md p-6 hover:scale-105 transition-transform">
//           <h2 className="text-2xl font-bold mb-2">Premium</h2>
//           <p className="text-lg mb-4 text-green-400">$10 PER MONTH</p>
//           <ul className="text-green-200 text-left mb-6 space-y-3">
//             <li className="flex items-center">
//               <FaNewspaper className="mr-2 text-green-400" /> 50+ free newspapers
//             </li>
//             <li className="flex items-center">
//               <FaBook className="mr-2 text-green-400" /> Shared premium articles
//             </li>
//             <li className="flex items-center">
//               <FaStopwatch className="mr-2 text-green-400" /> 15 days of reading time
//             </li>
//             <li className="flex items-center">
//               <FaCloudDownloadAlt className="mr-2 text-green-400" /> Offline downloads
//             </li>
//             <li className="flex items-center">
//               <FaUsers className="mr-2 text-green-400" /> 2 Premium accounts
//             </li>
//           </ul>
//           <Link to='subscription'>
//           <button className="btn btn-success w-full">Subscribe Now</button>
//           </Link>
          
//         </div>

//         {/* Premium Family */}
//         <div className="bg-gray-800 text-white h-[500px] rounded-lg shadow-md p-6 hover:scale-105 transition-transform">
//           <h2 className="text-2xl font-bold mb-2">Premium Ultra</h2>
//           <p className="text-lg mb-4 text-green-400">$15 PER MONTH</p>
//           <ul className="text-green-200 text-left mb-6 space-y-3">
//             <li className="flex items-center">
//               <FaNewspaper className="mr-2 text-green-400" /> Unlimited newspapers
//             </li>
//             <li className="flex items-center">
//               <FaBook className="mr-2 text-green-400" /> Full premium catalog
//             </li>
//             <li className="flex items-center">
//               <FaStopwatch className="mr-2 text-green-400" /> Unlimited reading time
//             </li>
//             <li className="flex items-center">
//               <FaCloudDownloadAlt className="mr-2 text-green-400" /> Offline downloads
//             </li>
//             <li className="flex items-center">
//               <FaUsers className="mr-2 text-green-400" /> Up to 6 accounts
//             </li>
//           </ul>
//           <Link to='subscription'>
//           <button className="btn btn-success w-full">Subscribe Now</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Plans;

import { FaNewspaper, FaBook, FaStopwatch, FaUsers, FaCloudDownloadAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Plans = () => {
  const plans = [
    {
      title: "FREE",
      price: "FREE FOR 1 MONTH",
      features: [
        "25+ free newspapers",
        "Access to premium articles",
        "15 hours/month of reading time",
        "Offline downloads",
        "1 Premium account"
      ]
    },
    {
      title: "Premium",
      price: "$10 PER MONTH",
      features: [
        "50+ free newspapers",
        "Shared premium articles",
        "15 days of reading time",
        "Offline downloads",
        "2 Premium accounts"
      ]
    },
    {
      title: "Premium Ultra",
      price: "$15 PER MONTH",
      features: [
        "Unlimited newspapers",
        "Full premium catalog",
        "Unlimited reading time",
        "Offline downloads",
        "Up to 6 accounts"
      ]
    }
  ];

  const icons = [FaNewspaper, FaBook, FaStopwatch, FaCloudDownloadAlt, FaUsers];

  return (
    <div className="text-center p-5 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-8">Our Plans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <p className="text-lg mb-4 text-green-600 dark:text-green-400">{plan.price}</p>
              <ul className="text-green-800 dark:text-green-200 text-left mb-6 space-y-3">
                {plan.features.map((feature, i) => {
                  const Icon = icons[i];
                  return (
                    <li className="flex items-center" key={i}>
                      <Icon className="mr-2 text-green-500" />
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link to="subscription">
              <button className="btn btn-success w-full">Subscribe Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;

const SubscribeNewsletter = () => {
    return (
        <div className="w-11/12 mx-auto">
      <div className="flex items-center  justify-center px-9 sm:px-6 lg:py-20 py-12 bg-gray-900 rounded-3xl mb-6">
        <div className="text-center max-w-4xl w-full">
          <h2 className="lg:text-3xl text-2xl font-extrabold text-white">
            Subscribe our newsletter
          </h2>
          <p className="text-gray-300 mt-2 text-base sm:text-lg">
            Never miss out on the latest news, trending articles, and exclusive content. <br />
            Subscribe to our newsletter and get regular updates directly to your inbox.
          </p>
          <div className="mt-6 flex flex-wrap sm:flex-nowrap justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            />
            <button className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default SubscribeNewsletter;
  
import { FaNewspaper, FaUsers, FaRegLightbulb } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">About Today News</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Welcome to <span className="font-semibold text-blue-600">Today News</span>, 
        your go-to source for the latest and most reliable news from around the world. 
        We are committed to delivering accurate and timely updates on politics, business, 
        technology, entertainment, and more.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Our Mission */}
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <FaRegLightbulb className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To provide unbiased, in-depth, and up-to-date news that empowers 
            our readers with knowledge.
          </p>
        </div>

        {/* Who We Are */}
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <FaUsers className="text-4xl text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Who We Are</h3>
          <p className="text-gray-600">
            A team of passionate journalists, editors, and tech experts dedicated 
            to keeping you informed.
          </p>
        </div>

        {/* What We Cover */}
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <FaNewspaper className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">What We Cover</h3>
          <p className="text-gray-600">
            From breaking news to in-depth analysis on global affairs, technology, 
            sports, and entertainment.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
        <p className="text-gray-600 mb-4">
          Follow us on social media and subscribe to our newsletter for daily updates.
        </p>
        <button className="btn btn-primary">Subscribe Now</button>
      </div>
    </div>
  );
};

export default AboutPage;

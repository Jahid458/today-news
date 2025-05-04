import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const categories = [
  {
    title: "Latest News",
    content:
      "Stay updated with the latest breaking news from around the world, including politics, entertainment, and global events.",
  },
  {
    title: "Politics",
    content:
      "Explore in-depth political analysis, government updates, and insights on current affairs.",
  },
  {
    title: "Sports",
    content:
      "Get the latest sports news, match highlights, and scores from football, cricket, basketball, and more.",
  },
  {
    title: "Entertainment",
    content:
      "Dive into the world of movies, TV shows, celebrity news, and trending entertainment stories.",
  },
  {
    title: "Technology",
    content:
      "Discover the latest in tech, gadgets, software updates, and cutting-edge innovations.",
  },
];

const NewspaperAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null); // Start with no section open

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl w-full mx-auto mt-5 px-4 sm:px-6 lg:px-4">
      <div className="rounded-xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          News Categories
        </h2>

        <div className="space-y-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className="border border-base-300 dark:border-gray-600 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left text-lg font-medium bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 text-white transition-colors duration-300"
                onClick={() => toggleIndex(index)}
              >
                <span>{item.title}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  {openIndex === index ? "▲" : "▼"}
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 500 }}  // Animating maxHeight for better performance
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.2 }} // Reduced duration for faster speed
                    className="px-4 pb-4 pt-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <p>{item.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewspaperAccordion;

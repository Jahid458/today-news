
const NewspaperAccordion = () => {
  return (
    <div className=" p-8 join join-vertical w-full sm:w-11/12 md:w-11/12 lg:ml-40 md:ml-11 mx-auto mt-8">
      <h2 className="text-xl font-bold text-center mb-4">News Categories</h2>

      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="news-accordion" defaultChecked />
        <div className="collapse-title text-lg md:text-xl font-medium">Latest News</div>
        <div className="collapse-content">
          <p>Stay updated with the latest breaking news from around the world, including politics, entertainment, and global events.</p>
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="news-accordion" />
        <div className="collapse-title text-lg md:text-xl font-medium">Politics</div>
        <div className="collapse-content">
          <p>Explore in-depth political analysis, government updates, and insights on current affairs.</p>
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="news-accordion" />
        <div className="collapse-title text-lg md:text-xl font-medium">Sports</div>
        <div className="collapse-content">
          <p>Get the latest sports news, match highlights, and scores from football, cricket, basketball, and more.</p>
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="news-accordion" />
        <div className="collapse-title text-lg md:text-xl font-medium">Entertainment</div>
        <div className="collapse-content">
          <p>Dive into the world of movies, TV shows, celebrity news, and trending entertainment stories.</p>
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="news-accordion" />
        <div className="collapse-title text-lg md:text-xl font-medium">Technology</div>
        <div className="collapse-content">
          <p>Discover the latest in tech, gadgets, software updates, and cutting-edge innovations.</p>
        </div>
      </div>
    </div>
  );
};

export default NewspaperAccordion;

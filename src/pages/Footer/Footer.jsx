import { Link } from "react-router-dom";
import logo from '/todayNews.jpeg'

const Footer = () => {
    return (
        <footer className="footer bg-orange-300 text-base-content p-10">
         <div className="flex  justify-center items-center gap-2">
       <Link to="/" className="text-2xl font-bold text-white">
          News
        </Link>
       <img src={logo} className="w-20 rounded-full" /> 
       </div>
        <nav>
          <h6 className="footer-title">Our Website</h6>
          <a href="public-all-article" className="link link-hover">All Article</a>
          <a  href='my-article' className="link link-hover">My Article</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item" />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    );
};

export default Footer;
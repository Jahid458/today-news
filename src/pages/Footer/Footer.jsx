import { Link } from "react-router-dom";
import logo from '/todayNews.jpeg';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-12">
            <div className="footer">
                <div className="flex justify-center items-center gap-2">
                    <Link to="/" className="text-2xl font-bold text-white">
                        News
                    </Link>
                    <img src={logo} className="w-20 rounded-full" alt="Logo" />
                </div>
                <nav>
                    <h6 className="footer-title text-white">Our Website</h6>
                    <a href="public-all-article" className="link link-hover text-white">All Article</a>
                    <a href="my-article" className="link link-hover text-white">My Article</a>
                    <a className="link link-hover text-white">Jobs</a>
                    <a className="link link-hover text-white">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-white">Legal</h6>
                    <a className="link link-hover text-white">Terms of use</a>
                    <a className="link link-hover text-white">Privacy policy</a>
                    <a className="link link-hover text-white">Cookie policy</a>
                </nav>
                <form>
                    <h6 className="footer-title text-white">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text text-white">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item"
                            />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div>
                <p className="mt-8 text-center text-white ">
                    © {new Date().getFullYear()} News, All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

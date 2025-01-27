import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Reviews = () => {
    return (
        <section className=" p-10">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Readers Say</h2>
                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Single Review */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="https://i.ibb.co.com/Tr5s0dg/download2.jpg"
                                alt="User"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="text-lg font-semibold">Jaman Hossain</h4>
                                <p className="text-sm text-gray-500">January 21, 2023</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            &ldquo;This website provides timely and accurate news. I love the editorial
                            articles and the diverse range of topics!&quot;
                        </p>
                        <div className="flex items-center text-yellow-500">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                    </div>

                    {/* Additional Reviews */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="https://i.ibb.co.com/bL10n9w/people2.jpg"
                                alt="User"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="text-lg font-semibold">Selina Hossain</h4>
                                <p className="text-sm text-gray-500">June, 2024</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            &quot;The layout is user-friendly, and the newsletter keeps me updated. Keep
                            up the great work!&ldquo;
                        </p>
                        <div className="flex items-center text-yellow-500">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </div>
                    </div>

                    {/* Another Review */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="https://i.ibb.co.com/bmwNchJ/Human2.jpg"
                                alt="User"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="text-lg font-semibold">Dibya Kanti Basak</h4>
                                <p className="text-sm text-gray-500">January 20, 2025</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            &quot;I’ve been a reader for years. Their investigative journalism is
                            unmatched!&quot;
                        </p>
                        <div className="flex items-center text-yellow-500">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                            <FaRegStar />
                        </div>
                    </div>
                </div>

              
            </div>
        </section>
    );
};

export default Reviews;

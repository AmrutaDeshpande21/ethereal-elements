import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';

const Home = () => {
    return (
        <div>
            <Hero />
            <FeaturedProducts />

            <section className="relative py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass rounded-2xl p-8 text-center hover:shadow-pastel transition-shadow">
                            <div className="w-16 h-16 bg-gradient-pink-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl mb-2 gradient-text-pink-purple">Quality Products</h3>
                            <p className="text-dark-grey">Premium makeup from trusted brands</p>
                        </div>

                        <div className="glass rounded-2xl p-8 text-center hover:shadow-pastel transition-shadow">
                            <div className="w-16 h-16 bg-gradient-purple-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl mb-2 gradient-text-pink-purple">Fast Delivery</h3>
                            <p className="text-dark-grey">Quick shipping to your doorstep</p>
                        </div>

                        <div className="glass rounded-2xl p-8 text-center hover:shadow-pastel transition-shadow">
                            <div className="w-16 h-16 bg-gradient-pastel rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl mb-2 gradient-text-pink-purple">Satisfaction Guaranteed</h3>
                            <p className="text-dark-grey">Love it or your money back</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

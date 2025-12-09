import React from 'react';
import { Link } from 'react-router-dom';
import WavyDivider from '../common/WavyDivider';

const Hero = () => {
    return (
        <section className="relative wavy-bg min-h-[600px] flex items-center overflow-hidden">
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-text">Discover</span> Your
                            <br />
                            Perfect Beauty
                        </h1>
                        <p className="text-lg text-dark-grey mb-8 leading-relaxed">
                            Explore our curated collection of premium makeup products from top brands.
                            Find everything you need to express your unique style.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/products"
                                className="bg-gradient-pink-purple text-white px-8 py-3 rounded-full font-medium hover:shadow-pastel-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Shop Now
                            </Link>
                            <Link
                                to="/about"
                                className="glass px-8 py-3 rounded-full font-medium hover:shadow-pastel transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="relative animate-float">
                        <div className="relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop"
                                alt="Beauty Products"
                                className="rounded-3xl shadow-pastel-lg"
                            />
                        </div>
                        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-pink-purple rounded-full opacity-20 blur-3xl -z-10"></div>
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-purple-blue rounded-full opacity-20 blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>

            <WavyDivider color="pastel" flip={true} />
        </section>
    );
};

export default Hero;

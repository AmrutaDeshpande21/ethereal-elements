import React from 'react';
import WavyDivider from '../components/common/WavyDivider';

const About = () => {
    return (
        <div>
            <section className="bg-gradient-soft py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">
                        <span className="gradient-text">About</span> Ethereal Elements
                    </h1>
                    <p className="text-xl text-dark-grey max-w-3xl mx-auto">
                        Your trusted destination for premium beauty products
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-dark-grey leading-relaxed mb-6">
                        <span className="gradient-text-pink-purple font-bold">Ethereal Elements</span> is the leading premium beauty
                        platform, offering an extensive collection of makeup products from top brands around the world.
                        Our mission is to help you discover and express your unique beauty through quality cosmetics.
                    </p>
                    <p className="text-lg text-dark-grey leading-relaxed">
                        We believe that beauty is personal and diverse. That's why we've curated a wide selection of
                        products to suit every style, skin tone, and preference. From everyday essentials to special
                        occasion glamour, we've got everything you need to look and feel your best.
                    </p>
                </div>
            </section>

            <div className="relative">
                <WavyDivider color="pink-purple" />
                <section className="bg-gradient-pink-purple py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white text-center">
                            <div>
                                <div className="text-5xl font-bold mb-2">1000+</div>
                                <div className="text-xl opacity-90">Products</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">50+</div>
                                <div className="text-xl opacity-90">Brands</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">10k+</div>
                                <div className="text-xl opacity-90">Happy Customers</div>
                            </div>
                        </div>
                    </div>
                </section>
                <WavyDivider color="pink-purple" flip={true} />
            </div>

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        <span className="gradient-text">Our</span> Promise
                    </h2>
                    <p className="text-lg text-dark-grey leading-relaxed">
                        We're committed to providing you with authentic, high-quality products at competitive prices.
                        Every item in our collection is carefully selected to ensure it meets our standards of excellence.
                        Your satisfaction is our top priority, and we're here to help you every step of the way.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;

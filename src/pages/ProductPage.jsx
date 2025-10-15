import { React, useEffect, useRef, useState } from 'react';
import { StickyNavbar } from '../components/Navbar';
import { Banners } from './HomePage';
import card1 from '../assets/images/card/aircon-service-man.jpg'
import Carousel from 'react-multi-carousel';
import { Footer } from '../components/Footer';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import imagPath from '../../public/image.png'

export const ProductPage = () => {
    const [banner, setBanner] = useState([]);
    const fetchBanner = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/banners/all/public/1`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            console.log("Banner data:", data);
            setBanner(data);
        } catch (e) {
            console.error("Error fetching banner:", e);
        }
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    return (
        <div>
            <StickyNavbar />
            <Banners backgroundImage={`${import.meta.env.VITE_API_URL}/uploads/${banner.path}`} />
            <div className='px-8 py-5 md:px-15'>
                <RelatedProducts products={'Related products'} />
            </div>
            <HeroSection />
            <div className='px-8 py-5 md:px-15'>
                <VRFMultiCarousel products={"Products"} />
            </div>
            <Footer />
        </div>
    );
}

export const RelatedProducts = ({ products }) => {
    const ref1 = useRef(null);

    const isInView1 = useInView(ref1, { amount: 0.1 });

    const fadeVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        hidden: { opacity: 0, y: 60, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const navigate = useNavigate();

    const [productsDetails, setProductsDetails] = useState([]);
    const fetchSolutionCategory = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setProductsDetails(data);
        } catch (e) {
            console.error("Error fetching solution categories:", e);
        }
    };
    useEffect(() => {
        fetchSolutionCategory();
    }, []);

    const handleClick = (product) => {
        navigate(`/products/${product.id}`, { state: { product } });
        window.scrollTo(0, 0);
    };

    return (
        <div ref={ref1}>
            <h1 className='text-[32px] mt-5 mb-5 font-medium'>{products}</h1>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 cursor-pointer"
                variants={fadeVariants}
                initial="hidden"
                animate={isInView1 ? 'visible' : 'hidden'}
            >
                {productsDetails.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-full h-64 shadow-2xl bg-red-100 rounded-2xl overflow-hidden group"
                        onClick={() => handleClick(item)}
                    >
                        <img
                            // src={item.images[0]}
                            src={
                                item.primary_path
                                    ? `${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`
                                    : imagPath
                            }
                            alt={item.title}
                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="mb-6 px-4 py-2 bg-opacity-70 rounded-full text-black text-xl">
                                {item.title}
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
export const HeroSection = () => {
    const [welcome, setWelcome] = useState([]);
    const fetchWelcome = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/welcome/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("welcome:", data);
            setWelcome(data);
        } catch (e) {
            console.error("Error fetching solution categories:", e);
        }
    };
    useEffect(() => {
        fetchWelcome();
    }, []);

    return (
        <>
            {welcome.map((item, index) => {
                return (
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat min-h-[500px] flex items-center"
                        style={{
                            backgroundImage: `url(${import.meta.env.VITE_API_URL}/uploads/${item.path})`,
                        }}
                        key={index}
                    >
                        <div className="px-6 md:px-24 max-w-3xl text-white w-full">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {item.title}
                            </h1>
                            <p dangerouslySetInnerHTML={{
                                __html: item.detail && item.detail.trim() !== ""
                                    ? item.detail
                                    : "No details provided"
                            }} />
                        </div>
                    </div>
                )
            })}
        </>
    );
};


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

export const VRFMultiCarousel = ({ products }) => {
    const [VRFMultiCarousel, setVRFMultiCarousel] = useState([]);
    const fetchVRFMultiCarousel = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("dd:", data);
            setVRFMultiCarousel(data);
        } catch (e) {
            console.error("Error fetching solution categories:", e);
        }
    };
    useEffect(() => {
        fetchVRFMultiCarousel();
    }, []);
    return (
        <div className="w-full px-0 py-10 bg-white">
            <h1 className='text-[32px] mt-5 mb-5 font-medium'>{products}</h1>

            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                arrows={false}
                showDots={false}
                className="pb-4"
            >
                {VRFMultiCarousel.map((item, index) => (
                    <div key={index} className="relative mx-2">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`}
                            alt={item.text}
                            className="rounded-lg object-cover w-full h-64"
                        />
                        {/* Button at bottom of image */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <button className="text-white hover:text-blue-500 text-base font-medium px-6 py-5 transition-all duration-300">
                                View more
                            </button>
                        </div>
                    </div>
                ))}
            </Carousel>
            <RelatedProducts />
        </div>
    );
};


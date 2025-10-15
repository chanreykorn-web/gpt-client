import React, { useEffect, useState, useRef } from 'react';
import banner1 from '../assets/images/banner/1734663252864-Goal Plus Trading.jpg'
import card1 from '../assets/images/card/card1.png'
import CastIcon from '@mui/icons-material/Cast';
import AirIcon from '@mui/icons-material/Air';
import DryIcon from '@mui/icons-material/Dry';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Footer } from '../components/Footer';
import { motion, useInView } from 'framer-motion';
import { fedeIn } from '../components/varrain.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { StickyNavbar } from '../components/Navbar.jsx';
import Copyright from '../utils/Copyright.jsx';
import { useNavigate } from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";


AOS.init();

export const HomePage = () => {
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
            <Banners backgroundImage={`${import.meta.env.VITE_API_URL}/uploads/${banner.path}`} title={banner.title} service={'Service'} />
            <div className='px-8 py-5 md:px-15'>
                <ChooseUS />
                <Solutions />
                <WarrantySection />
                <ProductCard />
                <ProcessSection />
                <News />
                <VRFMultiCarousel />
            </div>
            <Footer />
            <Copyright title={'© 2025 AIRZ, ALL RIGHTS RESERVED.'} />
        </div>
    );
}


export const Banners = ({ backgroundImage, title, service }) => {
    const [banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchBanner = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/banners/all/public`);
            // replace with your API endpoint
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data)
            setBanner(data);
        } catch (e) {
            console.error("Error fetching banner:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanner();
    }, [])
    return (
        <div className="relative bg-gray-500 h-[93vh] w-full">
            <img src={backgroundImage} alt="" className="object-cover h-[93vh] w-full" />

            <motion.div
                className="absolute bottom-30 md:left-1/2 transform md:-translate-x-1/2 text-center"
                variants={fedeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl  font-bold  text-fujiaire-text"
                    style={{ textShadow: '2px 2px 6px rgba(253, 254, 254)' }}
                    variants={fedeIn("up", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.7 }}
                >
                    {title}
                </motion.h1>

                {/* ✅ Button only appears when `service` has content */}
                {service && (
                    <div className="flex justify-center mt-5">
                        <a href="/service" className='hover:text-fujiaire-text'>
                            <button
                                className="relative flex px-15 py-3 items-center justify-center overflow-hidden bg-transparent border border-fujiaire rounded-full text-white shadow-2xl transition-all cursor-pointer
                                before:absolute before:h-0 before:w-0 before:rounded-full before:bg-fujiaire before:duration-500 before:ease-out
                                hover:before:h-56 hover:before:w-56 hover:shadow-fujiaire
                                focus:before:h-56 focus:before:w-56 focus:shadow-fujiaire
                                active:before:h-56 active:before:w-56 active:shadow-fujiaire hover:transition"
                            >
                                <span className="relative z-10">{service}</span>
                            </button></a>
                    </div>
                )}
            </motion.div>
        </div>

    );
};

export const ChooseUS = () => {
    const [chooseUS, setChooseUS] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref1 = useRef(null);
    const isInView1 = useInView(ref1, { amount: 0.3 });

    const fadeVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
        hidden: {
            opacity: 0,
            y: 60,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const fetchChoose = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/choose-us/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();

            // Make sure we set an array
            const list = Array.isArray(data) ? data : data.data ?? [];
            console.log("Choose US data:", list);
            setChooseUS(list);

        } catch (e) {
            console.error("Error fetching choose-us:", e);
            setChooseUS([]); // fallback
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchChoose();
    }, []);

    return (
        <div ref={ref1} className="px-0 md:px-0 py-12 bg-white">
            <div className="flex justify-between items-center">
                <h1
                    className="text-[20px] md:text-[35px] font-semibold hover:text-fujiaire-text"
                    data-aos="fade-up"
                >
                    Why Choose Us
                </h1>
                <a href="/choose-us-details" className="hover:text-fujiaire-text">
                    View all
                </a>
            </div>

            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <div
                        className="w-[13px] h-[13px] bg-fujiaire-text rounded-full"
                        data-aos="fade-left"
                    ></div>
                    <h4
                        className="text-[15px] md:text-xl text-fujiaire-text"
                        data-aos="fade-left"
                    >
                        Cooler, smarter, better
                    </h4>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10"
                variants={fadeVariants}
                initial="hidden"
                animate={isInView1 ? "visible" : "hidden"}
            >
                {loading ? (
                    <p className="col-span-4 text-center text-gray-500">Loading...</p>
                ) : (
                    chooseUS.slice(0, 4).map((feature) => {
                        // Strip "Icon" suffix if DB stores "RampLeftIcon"
                        const iconName = feature.icon?.replace(/Icon$/, "");
                        const IconComponent = MuiIcons[iconName];

                        return (
                            <div
                                key={feature.id}
                                className="flex flex-col items-center justify-center text-center h-[324px] border rounded-xl p-6 shadow-sm transition-transform transform duration-300 hover:scale-105 hover:shadow-md"
                            >
                                <div className="w-[103px] h-[88px] flex items-center justify-center border mb-4 p-4 rounded-lg">
                                    {IconComponent ? (
                                        <IconComponent
                                            className="text-fujiaire-text"
                                            sx={{ fontSize: 48 }}
                                        />
                                    ) : (
                                        <span className="text-gray-400">No icon</span>
                                    )}
                                </div>
                                <h3 className="text-[20px] font-bold mb-2">
                                    {feature.title ?? "No title"}
                                </h3>
                                <p
                                    className="text-gray-600 text-[16px]"
                                    dangerouslySetInnerHTML={{
                                        __html: feature.descriptions ?? "",
                                    }}
                                />
                            </div>
                        );
                    })
                )}
            </motion.div>
        </div>
    );
};

export const Solutions = () => {
    const [solutions, setSolutions] = useState([]);
    const [solutionCategory, setSolutionCategory] = useState([]);

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const isInView1 = useInView(ref1, { amount: 0.3 });
    const isInView2 = useInView(ref2, { amount: 0.3 });

    const fadeVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        hidden: { opacity: 0, y: 60, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const fetchSolution = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/solutions/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data)
            setSolutions(data);
        } catch (e) {
            console.error("Error fetching banner:", e);
        }
    }

    const fetchSolutionCategory = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/solutions/all/public/1`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data)
            setSolutionCategory(data);
        } catch (e) {
            console.error("Error fetching banner:", e);
        }
    }

    useEffect(() => {
        fetchSolution();
        fetchSolutionCategory();
    }, []);

    return (
        <div className='mt-10' ref={ref1}>
            <div className='flex justify-between items-center'>
                <h1 className='text-[20px] md:text-[35px] font-semibold hover:text-fujiaire-text' data-aos="fade-up" dangerouslySetInnerHTML={{
                    __html: solutionCategory.category && solutionCategory.category.trim() !== ""
                        ? solutionCategory.category
                        : "No details provided"
                }} />
                <a href="/service" className='hover:text-fujiaire-text'>View all</a>
            </div>
            {/* <h1 className='text-[40px] font-semibold hover:text-fujiaire-text duration-100 text-gray-900'>Cooling Solutions Build for You</h1> */}
            <div className='flex items-center gap-2'>
                <div className='w-[13px] h-[13px] bg-fujiaire-text rounded-4xl'></div>
                <h4 className='text-[15px] text-fujiaire-text' dangerouslySetInnerHTML={{
                    __html: solutionCategory.category_sub && solutionCategory.category_sub.trim() !== ""
                        ? solutionCategory.category_sub
                        : "No details provided"
                }} />
            </div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5"
                variants={fadeVariants}
                initial="hidden"
                animate={isInView1 ? 'visible' : 'hidden'}
            >
                {solutions.map((item, index) => (
                    <div key={index} className="w-full">
                        <div className="relative group h-[314px] w-full m-auto rounded-xl hover:rounded-4xl overflow-hidden bg-white p-2 transition-all duration-500">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${item.path}`}
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover z-0 opacity-95"
                            />
                            <div className="absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-fujiaire group-hover:scale-[25] group-hover:rounded-none transition-all duration-500 ease-in-out z-10 opacity-80"></div>
                            <h1 className="absolute top-2 left-2 z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 transition-all duration-500 text-white">
                                {item.title}
                            </h1>
                        </div>
                    </div>
                ))}
            </motion.div>

        </div>
    )
}

export const WarrantySection = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [warranty, setWarranty] = useState([]);
    const isInView1 = useInView(ref1, { amount: 0.3 });
    const isInView2 = useInView(ref2, { amount: 0.3 });

    const fadeVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        hidden: { opacity: 0, y: 60, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const fetchWarranty = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/warranties/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setWarranty(data);
        } catch (e) {
            console.error("Error fetching banner:", e);
        }
    }

    useEffect(() => {
        fetchWarranty();
    }, []);


    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full py-10" ref={ref1}>
            {/* Left Panel with Background Image */}
            {warranty.map((warranty, index) => (
                <motion.div
                    className="flex-1 relative bg-white rounded-2xl shadow-md overflow-hidden"
                    style={{
                        backgroundImage: `url(${import.meta.env.VITE_API_URL}/uploads/${warranty.path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    variants={fadeVariants}
                    initial="hidden"
                    animate={isInView1 ? 'visible' : 'hidden'}
                    key={index}
                >
                    <div className="bg-white/80 w-full h-full p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-4 leading-snug">
                            {warranty.title}
                        </h2>
                        <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{
                            __html: warranty.descriptions && warranty.descriptions.trim() !== ""
                                ? warranty.descriptions
                                : "No details provided"
                        }} />
                    </div>
                </motion.div>
            ))}


            {/* Right Panel - Form */}
            <motion.div className="w-full lg:w-[500px] bg-white rounded-2xl shadow-md p-8"
                variants={fadeVariants}
                initial="hidden"
                animate={isInView1 ? 'visible' : 'hidden'}
            >
                <h2 className="text-center text-2xl font-semibold mb-8 leading-snug">
                    Book a free visit of our professional engineer
                </h2>
                <form className="space-y-6">
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full border-b border-gray-400 outline-none py-2"
                    />
                    <input
                        type="text"
                        placeholder="Phone number"
                        className="w-full border-b border-gray-400 outline-none py-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border-b border-gray-400 outline-none py-2"
                    />
                    <div className="flex justify-center">
                        <button
                            className="relative flex px-15 py-3 items-center justify-center overflow-hidden bg-transparent border border-fujiaire rounded-full text-fujiaire shadow-2xl transition-all cursor-pointer
                                            before:absolute before:h-0 before:w-0 before:rounded-full before:bg-fujiaire before:duration-500 before:ease-out
                                            hover:before:h-56 hover:before:w-56 hover:shadow-fujiaire
                                            focus:before:h-56 focus:before:w-56 focus:shadow-fujiaire
                                            active:before:h-56 active:before:w-56 active:shadow-fujiaire hover:transition hover:text-white"
                        >
                            <span className="relative z-10 transition-colors duration-300 hover:text-white">
                                Send request
                            </span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div >
    );
};

import defaultImage from '../../public/image.png';

export const ProductCard = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const fetchSolutionCategory = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data)
            setProducts(data);
        } catch (e) {
            console.error("Error fetching banner:", e);
        }
    }

    useEffect(() => {
        fetchSolutionCategory();
    }, []);

    const handleClick = (product) => {
        // Navigate to product detail page using product ID or slug
        navigate(`/category/${product.id}`, { state: { product } });
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-[20px] md:text-[35px] font-semibold hover:text-fujiaire-text' data-aos="fade-up">
                    Instant Chill, Maximum Fresh Air
                </h1>
                <a href="/products" className='hover:text-fujiaire-text'>View all</a>
            </div>
            {/* <h1 className='text-[20px] md:text-[35px] font-semibold' data-aos="fade-up">Instant Chill, Maximum Fresh Air</h1> */}
            <div className='flex items-center gap-2'>
                <div className='w-[13px] h-[13px] bg-fujiaire-text rounded-4xl' data-aos="fade-left"></div>
                <h4 className='text-[15px] text-fujiaire-text' data-aos="fade-left">Products</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {products.slice(0, 10).map((product, index) => (
                    <div
                        key={product.id}
                        className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
                        onClick={() => handleClick(product)}
                    >
                        <img
                            src={
                                product.primary_path
                                    ? `${import.meta.env.VITE_API_URL}/uploads/${product.primary_path}`
                                    : defaultImage
                            }
                            alt={product.name}
                            onError={(e) => (e.currentTarget.src = defaultImage)} // ✅ fallback if broken
                            className="w-full h-[343px] object-cover transition-all duration-500 group-hover:opacity-75"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="mb-6 px-4 py-2 text-center bg-opacity-70 rounded-full text-black text-xl font-medium">
                                {product.name?.length > 20
                                    ? product.name.slice(0, 20) + "..."
                                    : product.name}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export const ProcessSection = () => {
    const [process, setProcess] = useState([]);
    useEffect(() => {
        AOS.init({
            duration: 600,
            once: false, // <-- key change
            mirror: true, // animate on scroll up too
        });
    }, []);

    const fetchProcess = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/choose-us/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();

            // Make sure we set an array
            const list = Array.isArray(data) ? data : data.data ?? [];
            console.log("fetchProcess", list);
            setProcess(list);

        } catch (e) {
            console.error("Error fetching choose-us:", e);
            setProcess([]); // fallback
        }
    };


    useEffect(() => {
        fetchProcess();
    }, []);

    return (
        <div className='mt-5'>
            <div className='mt-10'>
                <div className='flex justify-between items-center gap-5'>
                    <h1 className='text-[20px] md:text-[35px] font-semibold hover:text-fujiaire-text cursor-pointer' data-aos="fade-up">
                        Smooth From First Call to Cool Air
                    </h1>
                    <a href="/choose-us-details" className='hover:text-fujiaire-text inline-block'>View all</a>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-[13px] h-[13px] bg-fujiaire-text rounded-4xl' data-aos="fade-left"></div>
                    <h4 className='text-[15px] text-fujiaire-text' data-aos="fade-left">Our Process</h4>
                </div>
            </div >

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-10'>
                <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                    <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200" data-aos="fade-up"
                        data-aos-delay="0"
                        data-aos-easing="ease-in-out">

                        {process.slice(0, 4).map((process, index) => {
                            const iconName = process.icon?.replace(/Icon$/, "");
                            const IconComponent = MuiIcons[iconName];
                            return (
                                <div className="grid grid-cols-[auto_1fr] gap-4">
                                    <div className="p-4 bg-gray-100 rounded-md">
                                        {IconComponent ? (
                                            <IconComponent
                                                className="text-fujiaire-text"
                                            // sx={{ fontSize: 48 }}
                                            />
                                        ) : (
                                            <span className="text-gray-400"></span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">{process.title ?? "No title"}</h3>
                                        <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{
                                            __html: process.descriptions ?? "",
                                        }} />
                                    </div>
                                </div>
                            )
                        }, [])}
                    </div>
                </div>
                <div className="flex justify-center items-center w-full md:mt-20 md:mb-20 mt-20"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-aos-easing="ease-in-out"
                >
                    <div className="max-w-xl w-full text-center">
                        <h2 className="text-4xl font-semibold text-sky-500 mb-4">
                            Smooth From First Call to Cool Air
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Our process: Consultation, custom design, installation, testing,
                            maintenance, and ongoing support.
                        </p>
                        <div className="flex justify-center">
                            <button
                                className="relative flex px-15 py-3 items-center justify-center overflow-hidden bg-transparent border border-fujiaire rounded-full text-fujiaire shadow-2xl transition-all cursor-pointer
                                            before:absolute before:h-0 before:w-0 before:rounded-full before:bg-fujiaire before:duration-500 before:ease-out
                                            hover:before:h-56 hover:before:w-56 hover:shadow-fujiaire
                                            focus:before:h-56 focus:before:w-56 focus:shadow-fujiaire
                                            active:before:h-56 active:before:w-56 active:shadow-fujiaire hover:transition hover:text-white"
                            >
                                <span className="relative z-10 transition-colors duration-300 hover:text-white">
                                    Get Touch
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export const News = () => {
    return (
        <div className='mt-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[20px] md:text-[35px] font-semibold hover:text-fujiaire-text' data-aos="fade-up">
                    The Coolest News-Strainght from the Source
                </h1>
                <a href="/new" className='hover:text-fujiaire-text'>View all</a>
            </div>
            <div className='flex items-center gap-2'>
                <div className='w-[13px] h-[13px] bg-fujiaire-text rounded-4xl' data-aos="fade-left"></div>
                <h4 className='text-[15px] text-fujiaire-text' data-aos="fade-left">New</h4>
            </div>
        </div >
    )
}


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1536 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 1536, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 640 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

export const VRFMultiCarousel = () => {
    const [solutionCategory, setSolutionCategory] = useState([]);

    const fetchSolutionCategory = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/new/all/public`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Solution categories:", data);
            setSolutionCategory(data);
        } catch (e) {
            console.error("Error fetching solution categories:", e);
        }
    };

    useEffect(() => {
        fetchSolutionCategory();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1536 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1536, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="w-full px-0 py-10">
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                arrows={false}
                showDots={false}
                className="pb-4"
            >
                {solutionCategory.map((item, index) => (
                    <div key={index} className="relative mx-2  h-[300px] gap-5 cursor-pointer rounded-lg">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`}
                            alt={item.name || `VRF System ${index + 1}`}
                            className="rounded-lg object-cover w-full"
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <button className="text-black hover:text-blue-500 text-base font-medium px-6 py-2 transition-all duration-300">
                                VRF SYSTEM
                            </button>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

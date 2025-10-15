import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import BannerService from "../assets/banner-service.jpg";
import { Footer } from "../components/Footer";
import { StickyNavbar } from "../components/Navbar";
import { Banners } from "./HomePage";



// ==============================
// Main Service Page
// ==============================
export const SerivcePage = () => {
    const [generalServiceSection, setGeneralServiceSection] = useState([]);

    const fetchGeneralServiceSection = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            console.log("products:", data);
            setGeneralServiceSection(data);
        } catch (e) {
            console.error("Error fetching services:", e);
        }
    };

    useEffect(() => {
        fetchGeneralServiceSection();
    }, []);

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

            <div className="px-8 py-5 md:px-35">
                {generalServiceSection.slice(0, 6).map((item, index) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10"
                    >
                        {/* Image alternates left/right */}
                        {index % 2 === 0 ? (
                            <>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`}
                                    alt={item.name || "Service"}
                                    className="rounded-2xl md:w-[579px] md:h-[400px] lg:w-[100%] object-cover"
                                />
                                <GeneralService
                                    name={item.name}
                                    spicifications={item.spicifications}
                                    detail={item.detail}
                                />
                            </>
                        ) : (
                            <>
                                <GeneralService
                                    name={item.name}
                                    spicifications={item.spicifications}
                                    detail={item.detail}
                                />

                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`}
                                    alt={item.name || "Service"}
                                    className="rounded-2xl md:w-[100px] md:h-[400px] lg:w-[100%] object-cover"
                                />

                            </>
                        )}
                    </div>
                ))}
            </div>

            <Testimonials />
            <Footer />
        </div>
    );
};

// ==============================
// General Service (Accordion for each spec)
// ==============================
export const GeneralService = ({ name, spicifications, detail }) => {
    return (
        <div>
            {spicifications && spicifications.length > 0 ? (
                spicifications.map((spec, index) => (
                    <Accordion
                        key={spec.id || index}
                        disableGutters
                        elevation={0}
                        square
                        sx={{
                            borderBottom: "1px solid #ddd",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary expandIcon={<AddIcon />}>
                            <Typography component="span">
                                {spec.title || `Specification #${spec.id}`}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                dangerouslySetInnerHTML={{
                                    __html: spec.description && spec.description.trim() !== ""
                                        ? spec.description
                                        : "No details provided"
                                }}
                            />

                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography>No specifications available</Typography>
            )}
        </div>
    );
};

// ==============================
// Simple Accordion (Reusable)
// ==============================


// ==============================
// Testimonials Section
// ==============================
export const Testimonials = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 bg-bg-fujiare px-8 py-5 md:px-15">
            <div>
                <div className="flex items-center gap-1 text-fujiaire-text">
                    <div className="w-[13px] h-[13px] bg-fujiaire-text rounded-full"></div>
                    <span>Testimonials</span>
                </div>
                <h1
                    className="text-3xl md:text-4xl lg:text-5xl"
                    data-aos="zoom-in"
                >
                    Built on Trust, Backed by Reviews
                </h1>
                <p
                    className="mt-2 text-md md:text-xl lg:text-2xl"
                    data-aos="fade-up"
                >
                    Reliable, efficient cooling service that exceeded expectations – highly
                    recommend for comfort!
                </p>
                <button
                    className="before:ease relative h-12 w-40 overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 mt-5"
                    data-aos="zoom-out-down"
                >
                    <span className="relative z-10">Get in Touch</span>
                </button>
            </div>
            <SectionCarousel />
        </div>
    );
};

// ==============================
// Carousel Section
// ==============================
export const SectionCarousel = () => {
    const [testimonial, setTestimonial] = useState([]);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            console.log("carousel products:", data);
            setTestimonial(data);
        } catch (e) {
            console.error("Error fetching carousel products:", e);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // ✅ Responsive config for carousel
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 2 },
        desktop: { breakpoint: { max: 1536, min: 1024 }, items: 2 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
    };

    return (
        <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            arrows
            showDots={false}
            className="pb-4"
        >
            {testimonial.map((item, index) => (
                <div
                    className="w-[100%] h-[331px] lg:w-[230px] lg:h-[331px] xl:w-[275px] xl:h-[331px] 2xl:w-[341px] 2xl:h-[331px] bg-white rounded-2xl"
                    key={index}
                >
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`}
                        alt={item.name || "Product"}
                        className="rounded-t-2xl w-full h-[250px] object-cover"
                    />
                    <h1 className="text-md px-5 py-5">
                        {item?.name
                            ? item.name.length > 80
                                ? item.name.slice(0, 80) + "..."
                                : item.name
                            : ""}
                    </h1>
                </div>
            ))}
        </Carousel>
    );
};

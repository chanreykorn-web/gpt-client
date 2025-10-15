import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { StickyNavbar } from '../components/Navbar';
import ChooseUsComponents, { ChooseUsCard, ChooseUsSection } from '../components/ChooseUsComponents';
import AirIcon from '@mui/icons-material/Air';
import CastIcon from '@mui/icons-material/Cast';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import { RelatedProducts } from './ProductPage';
import { Footer } from '../components/Footer';
import { CoolComfortSection } from './CoolComfortSection';
import { Loading } from '../components/Loading';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { ChooseUS } from './HomePage';

export const ProductsDetail = () => {
    const features = [
        {
            icon: <CastIcon style={{ fontSize: 40 }} className="text-fujiaire-text" />,
            title: 'Energy Efficiency',
            description: 'Save more on bills with our low-power, high-performance cooling technology.',
        },
        {
            icon: <AirIcon style={{ fontSize: 40 }} className="text-fujiaire-text" />,
            title: 'Eco-Friendly Design',
            description: 'Sustainable materials and water-based cooling reduce your carbon footprint every day.',
        },
        {
            icon: <InvertColorsIcon style={{ fontSize: 40 }} className="text-fujiaire-text" />,
            title: 'Powerful Cooling',
            description: 'Advanced airflow system delivers rapid, consistent cooling even in peak summer heat.',
        },
        {
            icon: <AcUnitSharpIcon style={{ fontSize: 40 }} className="text-fujiaire-text" />,
            title: 'Quiet Operation',
            description: 'Enjoy peaceful environments thanks to our ultra-quiet, whisper-soft fan technology.',
        },
    ];
    return (
        <div className='overflow-y-hidden'>
            <StickyNavbar />
            <div className='px-8 md:px-15'>
                <ProductsDetailSection />
                {/* <ChooseUsSection
                    title="Featured Products"
                    description="Cooler, somarter, better"
                /> */}
                {/* <ChooseUsCard features={features} /> */}
                <ChooseUS />
                <GeneralServiceSection />
                <CoolComfortSection />
                <RelatedProducts products={"Related Products"} />
            </div>
            <Footer />
        </div>
    )
}




export const ProductsDetailSection = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/products/all/public/${id}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!product) return <p className="text-center text-red-500">Product not found</p>;

    // Prepare gallery items
    const galleryItems = [
        // Include primary_path as first image if exists
        ...(product.primary_path
            ? [
                {
                    original: `${import.meta.env.VITE_API_URL}/uploads/${product.primary_path}`,
                    thumbnail: `${import.meta.env.VITE_API_URL}/uploads/${product.primary_path}`,
                },
            ]
            : []),
        // Add all other images
        ...(product.images?.map((img) => ({
            original: `${import.meta.env.VITE_API_URL}/uploads/${img.path}`,
            thumbnail: `${import.meta.env.VITE_API_URL}/uploads/${img.path}`,
        })) || []),
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {/* LEFT: Image Gallery */}
            <div className="flex flex-col  w-full h-full">
                <ReactImageGallery
                    items={galleryItems}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    slideDuration={400}
                    thumbnailPosition="bottom"
                    additionalClass="custom-gallery"
                />
            </div>

            {/* RIGHT: Product Details */}
            <div className="flex flex-col">
                <h1 className="text-4xl text-fujiaire-text font-bold">
                    {product.name}
                </h1>
                <p className="text-fujiaire-text text-2xl mb-2">
                    {product.detail ? (
                        <span dangerouslySetInnerHTML={{ __html: product.detail }} />
                    ) : (
                        "No additional details available."
                    )}
                </p>

                {/* {product.spicifications?.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
                            <ul className="space-y-4">
                                {product.spicifications.map((spec) => (
                                    <li key={spec.id} className="border-b pb-2">
                                        <h3 className="font-bold">{spec.title}</h3>
                                        <div
                                            className="text-gray-700"
                                            dangerouslySetInnerHTML={{ __html: spec.description }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}
            </div>
        </div>
    );
};

export const GeneralServiceSection = () => {
    const { id } = useParams();
    const [generalServiceSection, setGeneralServiceSection] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setError(null);

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/products/all/public/${id}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Product:", data);
                setGeneralServiceSection(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product");
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!generalServiceSection) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className='mt-5'>
            {generalServiceSection.spicifications?.length > 0 ? (
                generalServiceSection.spicifications.map((spec) => (
                    <Accordion
                        key={spec.id}
                        disableGutters
                        elevation={0}
                        square
                        sx={{
                            borderBottom: "1px solid #ddd",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary expandIcon={<AddIcon />}>
                            <Typography component="span" className="font-bold">
                                {spec.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                dangerouslySetInnerHTML={{ __html: spec.description }}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <p className="text-center text-gray-500"></p>
            )}
        </div>
    );
};


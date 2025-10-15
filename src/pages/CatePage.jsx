import React, { use, useState, useEffect } from 'react';
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
import axios from 'axios';
import { Loading } from '../components/Loading';
import { mokup } from '../data/mokup.js';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { ChooseUS } from './HomePage.jsx';



export const CatePage = () => {
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
        <div>
            <StickyNavbar />
            <div className='px-8 py-5 md:px-15'>
                <ProductsDetailSection />
                {/* <ChooseUsSection
                    title="Featured Products"
                    description="Cooler, somarter, better"
                /> */}
                {/* <ChooseUsCard features={features} /> */}
                <ChooseUS />
                {/* <ChooseUsSection
                    title="Spaicication"
                    description="Let's clear the air"
                /> */}

                <CoolComfortSection />

                {/* <GeneralService /> */}
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

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch product from API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/products/all/public/${id}`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();

                setProduct(data); // assume API returns single product object
            } catch (err) {
                console.error("Error fetching product:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;
    if (!product) return <p className="text-center text-red-500">Product not found.</p>;

    // Build gallery items: primary image first, then other images
    const galleryItems = [
        ...(product.primary_path
            ? [
                {
                    original: `${import.meta.env.VITE_API_URL}/uploads/${product.primary_path}`,
                    thumbnail: `${import.meta.env.VITE_API_URL}/uploads/${product.primary_path}`,
                },
            ]
            : []),
        ...(product.images?.map((img) => ({
            original: `${import.meta.env.VITE_API_URL}/uploads/${img.path}`,
            thumbnail: `${import.meta.env.VITE_API_URL}/uploads/${img.path}`,
        })) || []),
    ];

    return (
        <div className="px-4 md:px-0 py-10">
            <h1 className="text-4xl text-fujiaire-text text-center mb-10 font-bold">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5">
                <div className="flex flex-col">
                    <ReactImageGallery
                        items={galleryItems}
                        showPlayButton={false}
                        showFullscreenButton={true}
                        slideDuration={400}
                        thumbnailPosition="bottom"
                        additionalClass="custom-gallery"
                    />
                </div>

                <div>
                    {product.detail && (
                        <div
                            className="text-gray-700 text-lg"
                            dangerouslySetInnerHTML={{ __html: product.detail }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
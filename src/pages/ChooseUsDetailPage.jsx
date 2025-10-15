import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../components/Navbar';
import { Banners, ChooseUS, ProcessSection } from './HomePage';
import { ChooseUsCard, ChooseUsSection } from '../components/ChooseUsComponents';
import AirIcon from '@mui/icons-material/Air';
import CastIcon from '@mui/icons-material/Cast';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import { Footer } from '../components/Footer';
import { sync } from 'framer-motion';


export const ChooseUsDetailPage = () => {
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

    const [chooseUs, setChooseUs] = useState([]);

    const fetchChoose = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/choose-us/all/public/1`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            console.log(" choose us:", data);
            setChooseUs(data);
        } catch (e) {
            console.error("Error fetching choose us:", e);
        }
    }

    useEffect(() => {
        fetchChoose();
    }, []);

    return (
        <div>
            <StickyNavbar />
            <Banners />
            <div className='px-8 py-5 md:px-15'>
                {/* <ChooseUsSection
                    title={chooseUs.category}
                    description={chooseUs.category_sub}
                /> */}
                <ChooseUS />
                <ProcessSection />
            </div>
            <Footer />
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Banners, VRFMultiCarousel } from './HomePage';
import banner1 from '../assets/images/banner/1734663252864-Goal Plus Trading.jpg'
import { StickyNavbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Carousel from 'react-multi-carousel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AOS from 'aos';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

AOS.init();

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1536 },
        items: 2,
    },
    desktop: {
        breakpoint: { max: 1536, min: 1024 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1024, min: 640 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};



export const AboutPage = () => {
    const [banner, setBanner] = useState([]);
    const fetchBanner = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/banners/all/public/2`);
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
                <AboutMain />
            </div>
            <Testimonials />
            <div className='px-8 py-5 md:px-15'>
                <HistoryOFDevelopment />
                <TimelineDevelopment />
            </div>
            <Footer />
        </div>
    );
}


export const AboutMain = () => {
    const [value, setValue] = useState(0);
    const [sections, setSections] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchSections = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/missions/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            console.log("missions:", data);
            setSections(data); // expected: [{id, title, content, path}, ...]
        } catch (err) {
            console.error("Error fetching about sections:", err);
        }
    };

    useEffect(() => {
        fetchSections();
        AOS.init({
            duration: 600,
            once: false,
            mirror: true,
        });
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {sections.map((item, index) => {
                return (
                    <>
                        <img src={`${import.meta.env.VITE_API_URL}/uploads/${item.path}`} alt="" key={index} data-aos="fade-up"
                            className='w-full h-[400px] object-cover'
                        />
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab label="History" />
                                <Tab label="Mission" />
                                <Tab label="Core Value" />
                            </Tabs>

                            <Box sx={{ mt: 3 }}>
                                {value === 0 && <SectionHistory history={item.history} />}
                                {value === 1 && <SectionMission mission={item.mission} />}
                                {value === 2 && <SectionValue history={item.history} />}
                            </Box>

                        </Box>
                    </>
                )
            })}
        </div>
    );
};

export const SectionHistory = ({ history }) => {
    return (
        <div className='flex h-auto' data-aos="fade-up">
            <p className='text-xl' dangerouslySetInnerHTML={{ __html: history }} />
        </div>
    )
}


export const SectionMission = ({ mission }) => {
    return (
        <div className='flex items-center h-auto' data-aos="fade-up">
            <p className='text-xl' dangerouslySetInnerHTML={{ __html: mission }} />
        </div>
    )
}

export const SectionValue = ({ history }) => {
    return (
        <div className='flex items-center h-auto' data-aos="fade-up">
            <p className='text-xl' dangerouslySetInnerHTML={{ __html: history }} />
        </div>
    )
}

export const Testimonials = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 bg-bg-fujiare px-8 py-5 md:px-15'>
            <div className=''>
                <div className='flex items-center gap-1 text-fujiaire-text'>
                    <div className='w-[13px] h-[13px] bg-fujiaire-text rounded-full'></div>
                    <span>Testimonials</span>
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-4xl xl:text-5xl' data-aos="zoom-in">Built on Trust, Backed by Reviews</h1>
                <p className='mt-2 text-md md:text-xl' data-aos="fade-up">Reliable, efficient cooling service that exceeded expectations-highly recommend for comfort! </p>
                <button className="before:ease relative h-12 w-40 overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 mt-5" data-aos="zoom-out-down">
                    <span className="relative z-10">Get in Touch </span>
                </button>
            </div>
            <SectionCarousel />
        </div>
    )
}

export const SectionCarousel = () => {
    const [ceo, setCeo] = useState([]);
    const fetchCeo = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ceo/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setCeo(data);
        } catch (e) {
            console.error("Error fetching ceo:", e);
        }
    };

    useEffect(() => {
        fetchCeo();
    }, []);

    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            arrows={false}
            showDots={false}
            className="pb-4"
        >
            {ceo.map((item, index) => {
                return (
                    <div className='w-full py-5'>
                        <h1 className="text-md px-5 py-5">
                            {item?.detail
                                ? (() => {
                                    // remove HTML tags and trim to 300 chars
                                    const plainText = item.detail.replace(/<[^>]+>/g, "");
                                    return plainText.length > 300
                                        ? plainText.slice(0, 300) + "..."
                                        : plainText;
                                })()
                                : ""}
                        </h1>
                        <div className='flex items-center px-5 py-5'>
                            <Stack direction="row" spacing={2}>
                                <div className='flex items-center gap-3'>
                                    <Avatar alt="Remy Sharp" src={`${import.meta.env.VITE_API_URL}/uploads/${item.path}`} />
                                    <span>CEO Vinea</span>
                                </div>
                            </Stack>
                        </div>
                    </div>
                )
            })}
        </Carousel >
    )
}

export const HistoryOFDevelopment = () => {
    return (
        <div className=''>
            <h1 className='text-3xl md:text-5xl font-semibold'>History of development</h1>
            <p className='w-[100%] text-md mt-2'>Creation and Development (1985-2024)
                Rise in self-reliance, grow in self-improvement </p>

            <TimelineDevelopment />
        </div>
    )
}


export const TimelineDevelopment = () => {
    const [timelineDevelopment, setTimelineDevelopment] = useState([]);

    const fetchTimelineDevelopment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/industry/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setTimelineDevelopment(data);
            console.log("Dev", data)
        } catch (e) {
            console.error("Error fetching industry:", e);
        }
    };

    useEffect(() => {
        fetchTimelineDevelopment();
    }, []);

    return (
        <div className="px-4 md:px-12 lg:px-24 py-8">
            <Timeline position="alternate">

                {timelineDevelopment.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent
                            sx={{
                                m: 'auto 0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${item.path}`}
                                alt="timeline"
                                className="w-40 md:w-60 lg:w-80 lg:h-40 rounded shadow-md object-cover"
                            />
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <h3 className="text-lg font-semibold text-sky-600 mb-1">
                                In {item.year}
                            </h3>
                            <p className=" text-sm md:text-base text-gray-700">{item.title}</p>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};
import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../components/Navbar';
import { Banners } from './HomePage';
import CallIcon from '@mui/icons-material/Call';
import { Footer } from '../components/Footer';
import MailIcon from '@mui/icons-material/Mail';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

export const ContactPage = () => {
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
                <ContactIcon />
            </div>
            <MapSection />
            <ContactForm />
            <Footer />
        </div>
    );
}


export const ContactIcon = () => {
    const items = [
        {
            icon: <CallIcon style={{ fontSize: "70px" }} />,
            title: "Phone",
            lines: ["0(855) 890-90-609", "0(855) 890-90-620"],
        },
        {
            icon: <MailIcon style={{ fontSize: "70px" }} />,
            title: "Email",
            lines: ["sale@email.com", "tech@email.com"],
        },
        {
            icon: <TelegramIcon style={{ fontSize: "70px" }} />,
            title: "Telegram",
            lines: ["0(855) 890-90-609", "0(855) 890-90-620"],
        },
        {
            icon: <FacebookOutlinedIcon style={{ fontSize: "70px" }} />,
            title: "Facebook",
            lines: ["sale", "tech"],
        },
        {
            icon: <AlternateEmailOutlinedIcon style={{ fontSize: "70px" }} />,
            title: "Address",
            lines: ["Phnom Penh"],
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-10 md:gap-10 lg:gap-0 xl:gap-0 py-10 bg-white max-w-7xl mx-auto text-black">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`relative flex flex-col items-center text-center
                ${index !== items.length - 1 ? "lg:after:absolute lg:after:right-0 lg:after:top-6 lg:after:bottom-6 lg:after:border-r lg:after:border-gray-300" : ""}`}
                >
                    <span className="material-icons text-cyan-500 mb-2">
                        {item.icon}
                    </span>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    {item.lines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export const MapSection = () => {
    return (
        <div className="w-full">
            <div className="relative w-full h-0 pb-[50%] md:pb-[60%] xl:pb-[30%]"> {/* 16:9 ratio */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15634.225802842375!2d104.9032177079345!3d11.58362156434926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517dada03789%3A0xc3fa919366e47658!2z4Z6i4Z6E4Z-L4Z6P4Z-C4Z6E4Z6R4Z684Z6b4Z6C4Z-E4Z6A!5e0!3m2!1sen!2skh!4v1750818695713!5m2!1sen!2skh"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
            </div>
        </div>
    );
};



export const ContactForm = () => {
    return (
        <div className="max-w-6xl mx-auto md:p-10 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">GET IN TOUCH WITH US</h2>
            <p className="text-center text-gray-700 mb-8">
                If you have any question, Please don't hesitate to send us a message
            </p>

            <form className="space-y-6">
                {/* Top 3 Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input
                        type="text"
                        placeholder="your-name"
                        className="w-full border rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <input
                        type="email"
                        placeholder="your-email"
                        className="w-full border rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <input
                        type="text"
                        placeholder="your-subject"
                        className="w-full border rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>

                {/* Message Box */}
                <textarea
                    rows="6"
                    placeholder="your message"
                    className="w-full border rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-10 py-3 rounded-full border border-black hover:bg-black hover:text-white transition duration-300"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

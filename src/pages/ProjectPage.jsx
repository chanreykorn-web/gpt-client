import React, { useState, useEffect } from "react";
import { StickyNavbar } from "../components/Navbar";
import { Banners } from "./HomePage";
import { Footer } from "../components/Footer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// ✅ Project Page
export const ProjectPage = () => {
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
            <div className="px-8 py-5 md:px-15">
                <LabTabs />
            </div>
            <Footer />
        </div>
    );
};

// ✅ Tabs list from DB (categories)
function LabTabs() {
    const [value, setValue] = useState("all"); // default tab = All
    const [tabs, setTabs] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Fetch categories from DB
    const fetchTabs = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/all/public`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();

            const mapped = data.map((cat) => ({
                label: cat.name,     // category name
                value: String(cat.id) // use category_id as value
            }));

            // Add "All" manually
            setTabs([{ label: "All", value: "all" }, ...mapped]);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    useEffect(() => {
        fetchTabs();
    }, []);

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                {/* Tabs Header */}
                <Box className="flex justify-center" sx={{ borderBottom: "none" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="product category tabs"
                        centered
                        sx={{ ".MuiTabs-indicator": { display: "none" } }}
                    >
                        {tabs.map((tab) => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                    </TabList>
                </Box>

                {/* Tabs Content */}
                {tabs.map((tab) => (
                    <TabPanel key={tab.value} value={tab.value}>
                        <RelatedProducts categoryId={tab.value} />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}

// ✅ Products list by category from DB
function RelatedProducts({ categoryId }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            let url =
                categoryId === "all"
                    ? `${import.meta.env.VITE_API_URL}/products/all/public`
                    : `${import.meta.env.VITE_API_URL}/products/category/${categoryId}/all/public`;

            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((item, index) => (
                <div
                    key={index}
                    className="relative w-full h-64 shadow-2xl bg-gray-100 rounded-2xl overflow-hidden group"
                >
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${item.primary_path}`}
                        // src={item.primary_path || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                        <div className="mb-6 px-4 py-2 bg-opacity-80 rounded-full text-black text-xl">
                            {item.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

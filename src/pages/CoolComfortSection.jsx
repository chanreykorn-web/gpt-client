import React from 'react';
import bg from '../assets/images/item/1.jpg';

export const CoolComfortSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  md:p-12">
            <p className="text-lg md:text-xl  text-gray-800">
                Cool comfort starts here. We deliver efficient air conditioning systems and expert service,
                keeping your home or business perfectly climate-controlled, clean, and comfortable all year long
            </p>

            {/* Right side: Image */}
            <div className="flex justify-center w-full">
                <img
                    src={bg}
                    alt="Air conditioning system in a modern room"
                    className="rounded-lg shadow-md object-cover"
                />
            </div>
        </div>
    );
};

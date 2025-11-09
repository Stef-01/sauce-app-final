import React from 'react';

export const Footer: React.FC = () => {
    return (
       <footer className="relative self-stretch box-border caret-transparent shrink-0 z-[3] mt-auto pt-6 md:pt-10 w-full">
            <div className="box-border caret-transparent border-t-white/10 border-b-white/10 border-x-white border-t"></div>
            <div className="items-center box-border caret-transparent gap-x-4 flex flex-col gap-y-4 px-4 py-10 md:backdrop-blur-[45px] md:flex-row md:px-10">
                <img
                    alt="Sauce logo"
                    src="https://c.animaapp.com/mhqpk9sal3ySkH/assets/8.png"
                    className="text-transparent aspect-[auto_32_/_32] box-border h-8 max-w-full object-contain w-8"
                />
                <span className="text-white/80 text-lg font-semibold block leading-[25.2px]">
                    <a href="#" className="text-white items-stretch">
                        Create an Internship for free 🎉
                    </a>
                </span>
                <div className="items-center box-border caret-transparent gap-x-4 flex flex-row-reverse gap-y-4 ml-0 md:gap-x-6 md:flex-row md:gap-y-6 md:ml-auto">
                    <span className="text-white/80 text-lg font-semibold block leading-[25.2px]">
                        <a href="#" className="text-white items-stretch">
                            Help Center
                        </a>
                    </span>
                    <span className="text-white/40 text-sm block leading-[19.6px] hidden md:block">|</span>
                    <span className="text-white/80 text-lg font-semibold block leading-[25.2px]">
                        <a href="#" className="text-white items-stretch">
                            Blog
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};
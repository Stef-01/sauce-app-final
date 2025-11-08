import React from 'react';

export const ContextMenu: React.FC = () => {
    return (
        <span
            role="popover"
            className="absolute bg-black box-border caret-transparent hidden z-[3] left-0 top-0"
        >
            <ul
                role="menu"
                className="box-border caret-transparent flex flex-col list-none pl-0"
            >
                <li
                    role="menuitem"
                    className="text-white/80 items-center box-border caret-transparent flex p-4"
                >
                    <span className="self-center box-border caret-transparent block align-middle mr-4">
                        <img
                            src="https://c.animaapp.com/mhqpk9sal3ySkH/assets/icon-10.svg"
                            alt="Icon"
                            className="relative box-border caret-transparent h-5 w-5"
                        />
                    </span>
                    Copy link
                </li>
                <a
                    href="#"
                    className="box-border caret-transparent block"
                >
                    <li
                        role="menuitem"
                        className="text-red-500 items-center box-border caret-transparent flex p-4"
                    >
                        <span className="self-center box-border caret-transparent block align-middle mr-4">
                            <img
                                src="https://c.animaapp.com/mhqpk9sal3ySkH/assets/icon-11.svg"
                                alt="Icon"
                                className="relative box-border caret-transparent h-5 w-5"
                            />
                        </span>
                        Report
                    </li>
                </a>
            </ul>
        </span>
    );
};
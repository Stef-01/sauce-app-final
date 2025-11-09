import React from 'react';
import { EventInfo } from './EventInfo';

export const EventHeader: React.FC = () => {
    return (
        <div className="box-border caret-transparent">
            <div className="items-center box-border caret-transparent flex justify-between mb-4">
                <div className="flex items-center">
                    <span className="text-sm font-semibold items-center backdrop-blur-2xl bg-white/10 box-border caret-transparent flex justify-center leading-[19.6px] max-h-8 min-h-8 text-nowrap px-3 py-0 rounded-[800px] border border-solid border-white/40">
                        Community
                    </span>
                </div>
                <div className="flex items-center">
                    <button className="items-center backdrop-blur-2xl bg-white/10 box-border caret-transparent flex justify-center h-10 w-10 text-nowrap border p-0 rounded-full border-solid border-white/40">
                         <img src="https://c.animaapp.com/mhqpk9sal3ySkH/assets/icon-1.svg" alt="More options" />
                    </button>
                </div>
            </div>
            <EventInfo />
        </div>
    );
};

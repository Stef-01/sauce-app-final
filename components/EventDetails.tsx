import React from 'react';
import { EventHeader } from './EventHeader';
import { GuestList } from './GuestList';
import { EventDescription } from './EventDescription';

export const EventDetails: React.FC = () => {
    return (
        <div className="flex flex-col box-border caret-transparent w-full md:w-1/2 mt-8 md:mt-0">
            <EventHeader />
            <EventDescription />
            <div className="mt-8">
                <GuestList />
            </div>
        </div>
    );
};

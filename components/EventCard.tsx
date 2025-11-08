import React from 'react';
import { Event } from '../types';

interface EventCardProps {
    event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors duration-200">
             {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover" />}
            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-sm text-gray-400 mb-1">{event.date} @ {event.time}</p>
                <p className="text-sm text-gray-300 mb-3">{event.location}</p>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{event.organizer}</span>
                    <button className="px-3 py-1 text-sm rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">RSVP</button>
                </div>
            </div>
        </div>
    );
};

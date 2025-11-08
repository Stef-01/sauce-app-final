import React, { useState } from 'react';
import { Event } from '../types';
import { EventCard } from '../components/EventCard';

interface EventsPageProps {
    events: Event[];
}

export const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in my-8">
            <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search events by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

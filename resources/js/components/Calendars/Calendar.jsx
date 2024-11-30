import React, {useEffect, useRef} from 'react';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import { scheduler } from 'dhtmlx-scheduler';

const CalendarComponent = () => {
    let container = useRef();
    useEffect(() => {
        // Define lightbox sections
        scheduler.config.lightbox.sections = [
            { name: "title", height: 30, type: "textarea",  map_to: "text", focus: true },
            { name: "description", height: 50, map_to: "description", type: "textarea"},
            { name: "time", height: 72, type: "time", map_to: "auto" }
        ];

        // Initialize the scheduler
        scheduler.config.header = ["day", "week", "month", "date", "prev", "today", "next"];
        scheduler.init(container.current, new Date(), 'month');

        // Event handler for saving data
        scheduler.attachEvent("onEventSave", function(id, ev, is_new) {
            // check if the id is set
            if (id) {
                ev.id = parseInt(id);
            }
            return saveEvent(ev);
        });

        // Event handler for after changing data
        scheduler.attachEvent("onEventChanged", function(id, ev) {
            return true;
        });

        // Event handler for deleting data
        scheduler.attachEvent("onEventDeleted", function(id, ev) {
            return deleteEvent(ev);
        });


        // Save event data
        const saveEvent = async (event) => {
            return await  axios.post('/calendar/save', {
                id: event.id,
                title: event.text,
                description: event.description,
                start_date: event.start_date,
                end_date: event.end_date
            })
                .then(response => {
                    return true;
                })
                .catch(error => {
                    console.error('Error saving event:', error);
                    return false;
                });
        };

        // Delete event data
        const deleteEvent = async (event) => {
            console.log('Deleting event:', event);
            return await axios.post('/calendar/delete', {
                id: event.id
            })
                .then(response => {
                    return true;
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    return false;
                });
        };

        // get events from the server
        axios.get('/calendar/events')
            .then(response => {
                scheduler.parse(response.data, 'json');
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });

    }, []);

    return (
        <>
            <div ref={container} style={{ width: '100%', height: '600px' }}></div>
        </>
    );
}

export default CalendarComponent;

import Layout from "../../Layouts/Layout";

import React from 'react';
import CalendarComponent from "@/components/Calendars/Calendar.jsx";
import AuthenticatedLayout  from "@/Layouts/AuthenticatedLayout.jsx";

function Calendar() {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            {/*  */}
            <CalendarComponent />
        </div>
    );
}

Calendar.layout = page => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
export default Calendar;

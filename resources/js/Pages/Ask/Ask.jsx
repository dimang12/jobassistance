import React from 'react';
import CalendarComponent from "@/components/Calendars/Calendar.jsx";
import AuthenticatedLayout  from "@/Layouts/AuthenticatedLayout.jsx";
import GPTComponent from "@/components/AI/GPT/GPTComponent.jsx";

function Ask() {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            {/*  */}
            <GPTComponent />
        </div>
    );
}

Ask.layout = page => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
export default Ask;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {  usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import CourseVideoHeader from "@/Pages/Courses/CourseVideoHeader.jsx";
import CourseContent from "@/Pages/Courses/CourseContent.jsx";
import utils from "@/Libraries/utils.jsx";

export default function CourseVideo() {
    const courses = usePage().props.courses;
    const course = usePage().props.course;
    let courseContents = utils.buildTree(usePage().props.courseContents);

    const [navLinks, setNavLinks] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        setNavLinks(generateNavLinks(courses));
        setVideo({
            title: "React State Management",
            path: "React-State.mp4",
            full_description: "This is a video on how to manage state in React."
        });
    }, [courses]);

    const generateNavLinks = (items) => {
        if (!items) return [];
        return items.map((item) => {
            return {
                name: item.title,
                href: `/courses/${item.id}`,
                current: item.id === course.id,
            };
        });
    };

    const handlePrev = () => {
        console.log('Previous');
    };

    const handleNext = () => {
        console.log('Next');
    };

    const generateBreadcrumbs = (course) => {
        return [
            {
                label: 'Courses',
                href: '/courses',
            },
            {
                label: course.title,
                href: `/courses/${course.id}`,
            }
        ];
    };

    return (
        <AuthenticatedLayout
            header="Course Video"
            navLinks={navLinks}
        >
            <CourseVideoHeader
                breadcrumbs={generateBreadcrumbs(course)}
                onPrev={handlePrev}
                onNext={handleNext}
            />
            {/*{video && <CourseVideoPlay video={video} className={'mt-4'} />}*/}
            { <CourseContent course={course} contents={courseContents}></CourseContent> }
        </AuthenticatedLayout>
    );
}

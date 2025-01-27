import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';
import {Star, StarBorder, AccessTime, Edit, Delete, Search, Add} from '@mui/icons-material';
import { IconButton, TextField, Box } from '@mui/material';
import {Input, Button} from '@mui/joy';
import { useState } from 'react';
import {PlusIcon} from "@heroicons/react/16/solid/index.js";

export default function Course() {
    const courses = usePage().props.courses;
    const [search, setSearch] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courses);

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        setFilteredCourses(courses.filter(course =>
            course.title.toLowerCase().includes(value) ||
            course.category_name.toLowerCase().includes(value)
        ));
    };

    const handleAddCourse = () => {
        router.visit('/courses/create');
    };

    const columns = [
        { field: 'course', headerName: '', width: 150 },
        { field: 'title', headerName: 'Name', width: 150 },
        { field: 'category_name', headerName: 'Categories', width: 150 },
        { field: 'description', headerName: 'Desc', minWidth: 300 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'rating',
            headerName: 'Rate',
            width: 150,
            renderCell: (params) => (
                <div>
                    {[...Array(5)].map((_, index) => (
                        index < params.value ? <Star key={index} /> : <StarBorder key={index} />
                    ))}
                </div>
            ),
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 150,
            renderCell: (params) => (
                <div>
                    <AccessTime style={{ marginRight: 4 }} />
                    {params.value}
                </div>
            ),
        },
        { field: 'instructor', headerName: 'Instructor', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleEdit(params.row.id)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleEdit = (id) => {
        console.log(`Edit course with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete course with id: ${id}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Course
                </h2>
            }
        >
            <Head title="Course Page" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex mt-1 mb-2">
                                <div className={'flex-grow'}>

                                </div>
                                <div className="flex gap-x-2">
                                    <Input
                                        startDecorator={<Search />}
                                        placeholder="Search course"
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                    <Button
                                        className={'rounded-pill'}
                                        startDecorator={<Add />}
                                        variant="soft"
                                        color="primary"
                                        size="sm"
                                        onClick={handleAddCourse}>
                                        Add New Course
                                    </Button>
                                </div>
                            </div>
                            <DataGrid rows={filteredCourses} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

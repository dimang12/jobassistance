import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';

import { IconButton, Tooltip } from '@mui/material';
import {Input, Button} from '@mui/joy';
import {Star, StarBorder, AccessTime, Edit, Delete, Search, Add} from '@mui/icons-material';

import Drawer from "@/components/Drawer.jsx";
import CourseNewForm from "@/Pages/Courses/CourseNewForm.jsx";
import Modal from "@/components/Modal.jsx";
import CourseEditForm from "@/Pages/Courses/CourseEditForm.jsx";

export default function Course() {
    const courses = usePage().props.courses;
    const categories = usePage().props.categories;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [courseToEdit, setCourseToEdit] = useState(null);

    const [search, setSearch] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
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
        setOpenAdd(true);
    };

    const handleRatingUpdate = (id, rating) => {
        // get data based on the id
        const data = filteredCourses.find(course => course.id === id);
        // update the rating
        data.rating = rating;
        axios.put(`/courses/${id}`, data)
            .then(response => {
                setFilteredCourses(filteredCourses.map(course =>
                    course.id === id ? { ...course, rating } : course
                ));
                console.log(`Course with id: ${id} rating updated to ${rating}`);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
    };

    const columns = [
        {
            field: 'image', headerName: '', width: 100,
            renderCell: (params) => (
                <Tooltip  title={params.row.title}>
                    <div className={'flex items-center justify-center p-1 w-12 h-12 overflow-y-hidden'}>
                        <img
                            className="rounded-full"
                            src={`/images/courses/${params.value || 'default.jpeg'}`}
                            alt={params.row.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </Tooltip>
            ),
        },
        { field: 'title', headerName: 'Name', width: 150 },
        { field: 'category_name', headerName: 'Categories', width: 150 },
        { field: 'status', headerName: 'Status', width: 100 },
        {
            field: 'rating',
            headerName: 'Rate',
            width: 120,
            renderCell: (params) => (
                <div>
                    {[...Array(5)].map((_, index) => (
                        index < params.value ?
                            <Star className={ (parseInt(params.value) === 5) ? 'text-amber-400' : ''} fontSize={'small'} key={index} onClick={() => handleRatingUpdate(params.row.id, index + 1)} /> :
                            <StarBorder fontSize={'small'} key={index} onClick={() => handleRatingUpdate(params.row.id, index + 1)} />
                    ))}
                </div>
            ),
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 70,
            renderCell: (params) => (
                <div>
                    <AccessTime className={'text-gray-200'} fontSize={'small'} style={{ marginRight: 4 }} />
                    {params.value}
                </div>
            ),
        },
        { field: 'name', headerName: 'Instructor', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton si onClick={() => handleEdit(params.row.id)}>
                        <Edit className={'text-indigo-400'} fontSize={'small'} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete className={'text-red-300'} fontSize={'small'} />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleEdit = (id) => {
        const course = filteredCourses.find(course => course.id === id);
        setCourseToEdit(course);
        setOpenEdit(true);
    };

    const handleUpdate = (data) => {
        const dataForm = new FormData();
        for (const key in data) {
            if (key === 'images') {
                for (let i = 0; i < data.images.length; i++) {
                    dataForm.append('images[]', data.images[i]);
                }
            } else {
                dataForm.append(key, data[key]);
            }
        }
        axios.post(`/courses/${data.id}`, dataForm,{
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            .then(response => {
                const updatedCourse = response.data.course;
                setFilteredCourses(filteredCourses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
    };

    const handleDelete = (id) => {
        setCourseToDelete(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`/courses/${courseToDelete}`)
            .then(response => {
                setFilteredCourses(filteredCourses.filter(course => course.id !== courseToDelete));
                console.log(`Course with id: ${courseToDelete} deleted successfully`);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            })
            .finally(() => {
                setShowConfirmModal(false);
                setCourseToDelete(null);
            });
    };


    // create on submit new course
    const handleCreate = (data) => {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'images') {
                for (let i = 0; i < data.images.length; i++) {
                    formData.append('images[]', data.images[i]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        axios.post('/courses', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.data.course) {
                    setFilteredCourses([...filteredCourses, response.data.course]);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
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
                            <Drawer show={openAdd} title={'Create A New Course'} size={'2xl'} onClose={() => setOpenAdd(false)}>
                                <CourseNewForm
                                  categories={categories}
                                  onCancel={() => {
                                    setOpenAdd(false);
                                  }}
                                  onSubmit={(data) => {
                                    handleCreate(data);
                                    setOpenAdd(false);
                                  }} />
                            </Drawer>
                            <Drawer show={openEdit} title={'Edit Course'} size={'2xl'} onClose={() => setOpenEdit(false)}>
                                <CourseEditForm
                                    course={courseToEdit}
                                    categories={categories}
                                    onCancel={() => {
                                        setOpenEdit(false);
                                    }}
                                    onSubmit={(data) => {
                                        handleUpdate(data);
                                        setOpenEdit(false);
                                    }} />
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Confirm Deletion
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this course? This action cannot be undone.
                    </p>
                    <div className="mt-4 flex justify-end">
                        <Button variant="soft" color="secondary" onClick={() => setShowConfirmModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="soft" color="danger" className="ml-2" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

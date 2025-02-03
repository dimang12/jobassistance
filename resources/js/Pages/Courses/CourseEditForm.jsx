import { useState, useEffect } from 'react';
import { Button, Input, Select, Option, Textarea } from '@mui/joy';

export default function CourseEditForm({ course, categories, onCancel, onSubmit }) {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        category_id: '',
        description: '',
        status: '',
        duration: '',
        start_date: '',
        end_date: '',
        image: null,
    });

    useEffect(() => {
        if (course) {
            setFormData({
                id: course.id,
                title: course.title,
                category_id: course.category_id,
                description: course.description,
                status: course.status,
                duration: course.duration,
                start_date: (course?.start_date !== '') ? course.start_date.split('T')[0] : '',
                end_date: (course?.end_date !== '') ? course.end_date.split('T')[0] : '',
                image: course.image ? course.image : null,
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, image: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // reset form data
        setFormData({
            id: '',
            title: '',
            category_id: '',
            description: '',
            status: '',
            duration: '',
            start_date: '',
            end_date: '',
            image: null,
        });
    };

    return (
        <form className={'flex-grow flex flex-col'} onSubmit={handleSubmit}>
            <div className={'flex-grow p-4 sm:p-6'}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Course Name
                    </label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                        Category
                    </label>
                    <Select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={(e, newValue) => setFormData({ ...formData, category_id: newValue })}
                        defaultValue={''}
                    >
                        <Option value={''}>--No Category--</Option>
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="mb-4 flex gap-4">
                    <div className="flex-grow">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <Input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'flex-grow'}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                            Duration
                        </label>
                        <Input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className={'flex gap-4 mb-4'}>
                    <div className={'flex-grow'}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_date">
                            Start Date
                        </label>
                        <Input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={'flex-grow'}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_date">
                            End Date
                        </label>
                        <Input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        minRows={5}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <div className={'mb-2 flex justify-between items-center gap-2'}>
                        {(formData.image) && (
                            <div className={'flex items-center gap-2 bg-indigo-50 border border-indigo-100 p-2 rounded-lg'}>
                                <img
                                    src={'/images/courses/' + formData.image}
                                    alt="Course Image"
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <Button variant="soft" color="danger" onClick={handleRemoveImage}>
                                    Remove
                                </Button>
                            </div>
                        )}
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>

                </div>
            </div>
            <div className={'p-4 sm:p-6 bg-gray-50 border-t'}>
                <div className="flex justify-end">
                    <Button variant="soft" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="soft" color="primary" className="ml-2">
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
}

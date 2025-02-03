import { useState } from 'react';
import {Button, Input, Select, Option, Textarea} from '@mui/joy';
import 'react-quill/dist/quill.snow.css';

export default function CourseNewForm({ onSubmit, onCancel, categories }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('test');
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState(0);
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImage] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ title, category_id: category, status, duration, description, start_date: startDate, end_date: endDate, image });
    };

    return (
        <form className={'flex-grow flex flex-col'} onSubmit={handleSubmit}>
            <div className={'flex-grow p-4 sm:p-6'}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Course Name
                    </label>
                    <Input
                        id={'title'}
                        placeholder="Course Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={'mb-4'}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <Select
                        value={category}
                        onChange={(e, newValue) => setCategory(newValue)}
                        placeholder={'Select Category'}
                    >
                        <Option value={''}>--No Category--</Option>
                        {categories.map((cat) => (
                            <Option key={cat.id} value={cat.id}>
                                {cat.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={'flex mb-4'}>
                    <div className="flex-grow mr-2">
                        <Input
                            type="text"
                            placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-grow ml-2">
                        <Input
                            type="number"
                            placeholder="Duration"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-4  mb-4">
                    <Input
                        className={'flex-grow'}
                        type="date"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <Input
                        className={'flex-grow'}
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <Textarea
                        placeholder={'Description'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minRows={5}
                    />
                </div>
                <div className={'mb-4'}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <Input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="flex justify-end p-4 sm:p-6 bg-gray-50 border-t">
                <Button
                    variant="soft"
                    color="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button type="submit" variant="soft" color="primary">
                    Save Course
                </Button>
            </div>
        </form>
    );
}

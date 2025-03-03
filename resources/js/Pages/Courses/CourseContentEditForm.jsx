import { useState, useEffect } from 'react';
import { Button, Input, Select, Option, Textarea } from '@mui/joy';

export default function CourseContentEditForm({courseContent, onCancel, onSubmit }) {
    const [contentData, setContentData] = useState({
        id: '',
        content_title: '',
        content_description: '',
        content_type: '',
        image: null,
        video: null,
    });

    // A set of content types
    const contentTypes = [
        { id: 0 , name: 'Group of Contents' },
        { id: 1, name: 'Video Content' },
        { id: 2, name: 'Document/Paper' },
        { id: 3, name: 'Quiz' },
    ];

    /**
     * Update form data when course content prop changes or mounts
     */
    useEffect(() => {
        if (courseContent) {
            setContentData({
                id: courseContent.id,
                content_title: courseContent.content_title,
                content_description: courseContent.content_description,
                content_type: courseContent.content_type,
                image: courseContent.image ? courseContent.image : null,
                video: courseContent.video ? courseContent.video : null,
            });
        }
    }, [courseContent]);

    /**
     * Handle form input change
     * @param e Event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContentData({ ...contentData, [name]: value });
    };

    /**
     * Handle image change
     * @param e Event
     */
    const handleImageChange = (e) => {
        setContentData({ ...contentData, image: e.target.files[0] });
    };

    /**
     * Handle video change
     * @param e Event
     */
    const handleVideoChange = (e) => {
        setContentData({ ...contentData, video: e.target.files[0] });
    }

    /**
     * Remove image from form data
     */
    const handleRemoveImage = () => {
        setContentData({ ...contentData, image: null });
    };

    /**
     * Handle form submit
     * @param e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contentData);
        // reset form data
        setContentData({
            id: '',
            content_title: '',
            content_description: '',
            content_type: '',
            image: null,
        });
    };

    return (
        <form className={'flex-grow flex flex-col'} onSubmit={handleSubmit}>
            <div className={'flex-grow p-4 sm:p-6'}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Content Title:
                    </label>
                    <Input
                        type="text"
                        id="content_title"
                        name="content_title"
                        value={contentData?.content_title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                        Content Type:
                    </label>
                    <Select
                        id="content_type"
                        name="content_type"
                        value={contentData?.content_type}
                        onChange={(e, newValue) => setContentData({ ...contentData, content_type: newValue })}
                        defaultValue={''}
                    >
                        <Option value={''}>--No Content Type--</Option>
                        {contentTypes.map((type) => (
                            <Option key={type.id} value={type.id}>
                                {type.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <Textarea
                        id="content_description"
                        name="content_description"
                        value={contentData.content_description}
                        onChange={handleChange}
                        minRows={5}
                    />
                </div>
                <div className="mb-4 hidden">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <div className={'mb-2 flex justify-between items-center gap-2'}>
                        {(contentData.image) && (
                            <div className={'flex items-center gap-2 bg-indigo-50 border border-indigo-100 p-2 rounded-lg'}>
                                <img
                                    src={'/images/courses/' + contentData.image}
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">
                        Video
                    </label>
                    <Input
                        type="file"
                        id="video"
                        name="video"
                        onChange={handleVideoChange}
                    />
                </div>
            </div>
            <div className={'p-4 sm:p-6 bg-gray-50 border-t'}>
                <div className="flex justify-end">
                    <Button variant="soft" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="soft" color="primary" className="ml-2">
                        Update
                    </Button>
                </div>
            </div>
        </form>
    );
}

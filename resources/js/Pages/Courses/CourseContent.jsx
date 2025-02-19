import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import utils from "@/Libraries/utils.jsx";


export default function CourseContent({ course, contents, className }) {
    const [open, setOpen] = React.useState(true);
    const [hoveredItem, setHoveredItem] = React.useState(null);
    const [editItem, setEditItem] = React.useState(null);
    const [editTitle, setEditTitle] = React.useState('');
    const [editDescription, setEditDescription] = React.useState('');
    const [contentsState, setContents] = React.useState(contents);

    const handleMouseEnter = (id) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const handleEditClick = (item) => {
        setEditItem(item.id);
        setEditTitle(item.content_title);
        setEditDescription(item.content_description);
    };

    const handleDeleteClick = (item) => {
        axios.delete(`/course/content/${item.id}`).then(() => {
            const updatedContents = deleteContent(item.id);
            setContents(updatedContents);
        })
    }

    const handleAddClick = (item) => {
        createNewContent(item);
    }

    const handleSaveClick = () => {
        // Save the updated title and description
        console.log('Save clicked', editTitle, editDescription);
        axios.put(`/course/content/${editItem}`, {
            content_title: editTitle,
            content_description: editDescription
        }).then(() => {
            const updatedContents = updateContentsState(contentsState, editItem, editTitle, editDescription);
            setContents(updatedContents);
        });
        setEditItem(null);
    };

    /**
     * update contents or its children
     * @returns {React.JSX.Element|null}
     */
    function updateContentsState(contents, id, newTitle, newDescription) {
        return contents.map(content => {
            if (content.id === id) {
                return {
                    ...content,
                    content_title: newTitle,
                    content_description: newDescription
                };
            } else if (content.children && content.children.length > 0) {
                return {
                    ...content,
                    children: updateContentsState(content.children, id, newTitle, newDescription)
                };
            }
            return content;
        });
    }

    /**
     * Delete a course content item in the contentsState
     * @param id - the id of the content to delete
     * @returns {React.JSX.Element[]|*[]}
     */
    const deleteContent = (id) => {
        // loop through the contents state or children and remove the item
        return contentsState.map(content => {
            if (content.id === id) {
                return null;
            } else if (content.children && content.children.length > 0) {
                return {
                    ...content,
                    children: content.children.filter((child) => child.id !== id)
                };
            }
            return content;
        }).filter((content) => content !== null);
    }


    /**
     * Create a new course content item right after the current item
     * @param curContent
     * @returns {React.JSX.Element|null}
     */
    const createNewContent = (curContent) => {
        axios.post(`/course/content`, {
            course_id: course.id,
            content_title: 'New Content',
            content_description: 'New Content Description',
            parent_id: curContent?.parent_id,
            ordering: curContent?.ordering + 1,
        }).then((response) => {
            if (response.data) {
                const newContent = utils.buildTree(response.data);
                setContents(newContent);
            }
        });
    }

    const getIcon = (contentType) => {
        switch (contentType) {
            case 0:
                return <FastfoodIcon />;
            case 1:
                return <LaptopMacIcon />;
            case 2:
                return <HotelIcon />;
            case 3:
                return <RepeatIcon />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return '';
            case 1:
                return 'success';
            case 2:
                return 'primary';
            default:
                return 'warning';
        }
    };

    return (
        <div className={'flex gap-8 p-4 border rounded border-gray-200 mt-4 bg-white drop-shadow-sm ' + className}>
            <div className={'w-4/6'}>
                <h1 className="text-2xl font-bold">{course?.title}</h1>
                <List
                    sx={{ width: '100%'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {contentsState && contentsState.map((c) => (
                        <div key={c.id}>
                            <ListItemButton onClick={handleClick}>
                                <ListItemText primary={c.content_title} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            {c.children && c.children.length > 0 && (
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Timeline>
                                        {c.children.map((child) => (
                                            <TimelineItem
                                                key={child.id}
                                                sx={{ pl: 4 }}
                                                onMouseEnter={() => handleMouseEnter(child.id)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <TimelineOppositeContent
                                                    sx={{ m: 'auto 0', flex: 0 }}
                                                    align="left"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    <span className={'w-12 flex'}>0:33 m</span>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineConnector />
                                                    <TimelineDot color={getStatusColor(child.is_completed)} variant={(child.is_completed === 1) ? 'filled' : 'outlined'}>
                                                        {getIcon(child.content_type)}
                                                    </TimelineDot>
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent sx={{ py: '12px', px: 2, position: 'relative' }}>
                                                    {editItem === child.id ? (
                                                        <>
                                                            <TextField
                                                                value={editTitle}
                                                                onChange={(e) => setEditTitle(e.target.value)}
                                                                label="Title"
                                                                variant="outlined"
                                                                size="small"
                                                                fullWidth
                                                            />
                                                            <TextField
                                                                value={editDescription}
                                                                onChange={(e) => setEditDescription(e.target.value)}
                                                                label="Description"
                                                                variant="outlined"
                                                                size="small"
                                                                fullWidth
                                                                multiline
                                                                rows={2}
                                                                sx={{ mt: 1 }}
                                                            />
                                                            <button onClick={handleSaveClick} className="mt-2 py-1 px-3 rounded-full bg-indigo-50 text-blue-500">Save</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography variant="h6" component="span">
                                                                {child.content_title}
                                                            </Typography>
                                                            <Typography color={'textSecondary'} sx={{ fontSize: 12 }}>{child.content_description}</Typography>
                                                            {hoveredItem === child.id && (
                                                                <>
                                                                    <AddIcon
                                                                        fontSize={'x-small'}
                                                                        onClick={() => handleAddClick(child)}
                                                                        className="absolute cursor-pointer right-12 top-1/2 transform -translate-y-1/2"
                                                                    />
                                                                    <EditIcon
                                                                        fontSize={'x-small'}
                                                                        onClick={() => handleEditClick(child)}
                                                                        className="absolute cursor-pointer right-6 top-1/2 transform -translate-y-1/2"
                                                                    />
                                                                    <DeleteIcon
                                                                        fontSize={'x-small'}
                                                                        onClick={() => handleDeleteClick(child)}
                                                                        className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2"
                                                                    />

                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </TimelineContent>
                                            </TimelineItem>
                                        ))}
                                    </Timeline>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </List>
            </div>
            <div className={'w-2/6'}>
                <div className="flex p-px lg:col-span-2">
                    <div className="overflow-hidden rounded-lg bg-gray-50 ring-1 ring-white/15 lg:rounded-bl-[2rem]">
                        <img
                            alt=""
                            src={'/images/courses/1738542071.jpg'}
                            className="h-80 object-cover"
                        />
                        <div className="p-10">
                            <p className="mt-2 text-lg font-medium tracking-tight">Advanced access control</p>
                            <h3 className="text-sm/4 font-semibold text-gray-400">{course?.category_name}</h3>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                                {course?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

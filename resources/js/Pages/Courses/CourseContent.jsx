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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import IconMenu from "@/components/Menus/IconMenu.jsx";
import EditableListItemText from "@/Pages/Courses/EditableListItemText.jsx";
import utils from "@/Libraries/utils.jsx";
import Drawer from "@/components/Drawer.jsx";
import CourseContentEditForm from "@/Pages/Courses/CourseContentEditForm.jsx";
import {IconButton} from "@mui/material";


export default function CourseContent({ course, contents, className }) {
    const [open, setOpen] = React.useState(true);
    const [openItems, setOpenItems] = React.useState({});
    const [editContentOpen, setEditContentOpen] = React.useState(false);
    const [hoveredItem, setHoveredItem] = React.useState(null);
    const [curEditContent, setCurEditContent] = React.useState(null);
    const [editItemId, setEditItemId] = React.useState(null);
    const [editTitle, setEditTitle] = React.useState('');
    const [editDescription, setEditDescription] = React.useState('');
    const [contentsState, setContents] = React.useState(contents);

    const handleMouseEnter = (id) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleClick = (id) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [id]: !prevOpenItems[id],
        }));
    };

    /**
     * Edit a course content item
     * @param item
     */
    const handleEditClick = (item) => {
        setEditItemId(item.id);
        setEditTitle(item.content_title);
        setEditDescription(item.content_description);
    };

    /**
     * Open the edit content form
     * @param item - the current item
     * @return void
     */
    const handleEditContentClick = (item) => {
        setCurEditContent(item);
        setEditContentOpen(true);
    }


    /**
     * Delete a course content item
     * @param item - the current item
     */
    const handleDeleteClick = (item) => {
        axios.delete(`/course/content/${item.id}`).then(() => {
            const updatedContents = deleteContent(item.id);
            setContents(updatedContents);
        })
    }

    /**
     * Add a new course content item
     * @param item - the current item
     * @param isRoot - whether the item is a root item or a sub item
     */
    const handleAddClick = (item, isRoot = false) => {
        const parentId = isRoot ? null : item.parent_id;
        createNewContent(item, parentId);
    }

    /**
     * Add a new root course content item
     * @param item - the current item
     * @param isRoot - whether the item is a root item or a sub item
     */
    const handleAddRootClick = (item, isRoot = false) => {
        const parentId = isRoot ? null : item.id;
        createNewContent(item, parentId);
    }

    /**
     * Save the updated title and description
     * @returns {React.JSX.Element|null}
     */
    const handleSaveClick = () => {
        // Save the updated title and description
        axios.put(`/course/content/${editItemId}`, {
            content_title: editTitle,
            content_description: editDescription
        }).then(() => {
            const updatedContents = updateContentsState(contentsState, editItemId, editTitle, editDescription);
            setContents(updatedContents);
        });
        setEditItemId(null);
    };

    const handleUpdateContent = (contentId, newContentTitle, newContentDescription, contentType, contentVideo) => {
        const formData = new FormData();
        formData.append('content_title', newContentTitle);
        formData.append('content_description', newContentDescription);
        formData.append('content_type', contentType ? contentType : 1);
        // add course_id to the form data
        formData.append('course_id', course.id);
        if (contentVideo) {
            formData.append('video', contentVideo);
        }

        axios.post(`/course/content/${contentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            const updatedContents = updateContentsState(contentsState, contentId, newContentTitle, newContentDescription);
            setContents(updatedContents);
        });
    };

    /**
     * update contents or its children
     * @param contents - the contents state
     * @param id - the id of the content to update
     * @param newTitle - the new title
     * @param newDescription - the new description
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
     * @param curContent - the current content item
     * @param parentId - the parent id of the current content item
     * @returns {React.JSX.Element|null}
     */
    const createNewContent = (curContent, parentId) => {
        const ordering = (curContent?.ordering) ? (curContent.ordering + 1) : 1;
        axios.post(`/course/content`, {
            course_id: course.id,
            content_title: 'New Content',
            content_description: 'New Content Description',
            parent_id: parentId,
            ordering: ordering,
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

    /**
     * on useEffect, set the contents state
     */
    React.useEffect(() => {
        // open the first item
        if (contentsState && contentsState.length > 0) {
            setOpenItems({
                [contentsState[0].id]: true
            });
        }
    }, [contentsState]);

    return (
        <div className={'flex gap-8 p-4 border rounded border-gray-200 mt-4 bg-white drop-shadow-sm ' + className}>
            <div className={'w-4/6'}>
                <h1 className="flex justify-between text-2xl font-bold">
                    <span>{course?.title}</span>
                    {contentsState && contentsState.length === 0 && (
                        <IconButton onClick={() => handleAddRootClick(null, true)}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    )}
                </h1>
                <List
                    sx={{ width: '100%'}}
                    aria-labelledby="nested-list-subheader"
                >
                    {contentsState && contentsState.map((c) => (
                        <div key={c.id}>
                            <ListItemButton  onClick={(e) => {e.preventDefault();}}>
                                <EditableListItemText
                                    contentTitle={c.content_title}
                                    contentDescription={c.content_description}
                                    contentId={c.id}
                                    onSave={(contentId, newContentTitle, newContentDescription ) => {
                                        handleUpdateContent(contentId, newContentTitle, newContentDescription);
                                    }}
                                />
                                {open ? <ExpandLess /> : <ExpandMore />}
                                <IconMenu
                                    iconButton={<MoreVertIcon />}
                                    menuItems={[{
                                        icon: <AddIcon />,
                                        label: 'Add Root Content',
                                        onClick: () => handleAddRootClick(c, true)
                                    },
                                    {
                                        icon: <PlaylistAddIcon />,
                                        label: 'Add Sub Content',
                                        onClick: () => handleAddRootClick(c, false)
                                    },
                                    {
                                        icon: <DeleteIcon />,
                                        label: 'Delete Content',
                                        onClick: () => handleDeleteClick(c)
                                    }
                                    ]}
                                />
                            </ListItemButton>
                            {c.children && c.children.length > 0 && (
                                <Collapse in={openItems[c.id]} timeout="auto" unmountOnExit>
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
                                                    <TimelineDot color={getStatusColor(child.is_completed)} variant={(child?.is_completed === 1) ? 'filled' : 'outlined'}>
                                                        {getIcon(child.content_type)}
                                                    </TimelineDot>
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent sx={{ py: '12px', px: 2, position: 'relative' }}>
                                                    {editItemId === child.id ? (
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
                                                            <div className={'flex gap-2'}>
                                                                <button onClick={handleSaveClick} className="flex items-center gap-2 mt-2 py-1 px-3 rounded-full bg-indigo-50 text-blue-500">
                                                                    <SaveIcon fontSize="small"></SaveIcon> <span>Save</span>
                                                                </button>
                                                                <button onClick={() => setEditItemId(null)} className="flex items-center gap-2 ml-2 mt-2 py-1 px-3 rounded-full bg-red-50 text-red-500">
                                                                    <ClearIcon fontSize="small"></ClearIcon> Cancel
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography variant="h6" component="span" onDoubleClick={() => handleEditClick(child)}>
                                                                {child.content_title}
                                                            </Typography>
                                                            <Typography onDoubleClick={()=> handleEditClick(child)} color={'textSecondary'} sx={{ fontSize: 12 }}>{child.content_description}</Typography>
                                                            {hoveredItem === child.id && (
                                                                <>
                                                                    <AddIcon
                                                                        fontSize="x-small"
                                                                        onClick={() => handleAddClick(child)}
                                                                        className="absolute cursor-pointer right-12 top-1/2 transform -translate-y-1/2"
                                                                    />
                                                                    <EditIcon
                                                                        fontSize="x-small"
                                                                        onClick={() => handleEditContentClick(child)}
                                                                        className="absolute cursor-pointer right-6 top-1/2 transform -translate-y-1/2"
                                                                    />
                                                                    <DeleteIcon
                                                                        fontSize="x-small"
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
            <Drawer show={editContentOpen} size={'lg'} onClose={() => setEditContentOpen(false)} title={'Edit Content'}>
                <CourseContentEditForm
                    courseContent={curEditContent}
                    onSubmit={(data) => {
                        handleUpdateContent(data.id, data.content_title, data.content_description, data.content_type, data.video);
                        setEditContentOpen(false);
                    }}
                    onCancel={() => setEditContentOpen(false)}
                />
            </Drawer>
        </div>
    );
}

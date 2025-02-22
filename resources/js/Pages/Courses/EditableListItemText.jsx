import React, { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

export default function EditableListItemText({ contentId ,contentTitle, contentDescription, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(contentTitle);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave(contentId, text, contentDescription);
    };

    return (
        isEditing ? (
            <TextField
                label={"Title"}
                value={text}
                variant="outlined"
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                size="small"
                autoFocus
                fullWidth={true}
            />
        ) : (
            <ListItemText primary={text.toString()} onDoubleClick={handleDoubleClick} />
        )
    );
}

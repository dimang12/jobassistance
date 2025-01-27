import React, { useEffect } from 'react';
import UIClasses from "@/components/Global/UIClasses.jsx";

const GPTComponent = () => {
    // Request a prompt
    const prompt = "What is the meaning of life?";

    useEffect(() => {
        // askGPT(prompt);
    });
    // ask GPT for a response
    const askGPT = async (prompt) => await axios.post(' api/chatgpt/ask', {
        prompt: prompt
    })
        .then(response => {
            console.log('GPT response:', response.data);
        })
        .catch(error => {
            console.error('Error fetching GPT response:', error);
    });
    return (
        <div className={''}>
            <h1>GPT</h1>
            <textarea
                id="comment"
                name="comment"
                rows={4}
                className={UIClasses.defaultTextAreaCls}
                defaultValue={''}
            />
            <button
                onClick={() => askGPT(prompt)}
                type="button"
                className={UIClasses.defaultButtonCls}
            >
                Ask GPT
            </button>
        </div>
    );
}

export default GPTComponent;

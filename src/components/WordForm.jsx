import React, { useEffect, useRef, useState } from "react";
import "./WordForm.css";
import Alert from "./Alert";

export default function WordForm() {

    const [englishWord, setEnglishWord] = useState("");
    const [spanishWord, setSpanishWord] = useState("");
    const [wordsList, setWordsList] = useState(() => {
        const savedWords = localStorage.getItem("wordsList");
        return savedWords ? JSON.parse(savedWords) : [];
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        localStorage.setItem("wordsList", JSON.stringify(wordsList));
    }, [wordsList]);

    const inputFocused = useRef(null);

    const handleSubmit = (e) => {
        
        
        e.preventDefault();
        if (wordsList.some(word=> word.english === englishWord)) {
            setAlert({ type: "error", message: "This word already exists!" });
        } else {
            setWordsList([...wordsList, { english: englishWord, spanish: spanishWord }]);
            setAlert({ type: "success", message: "Word added successfully!" });
        }
        
        setEnglishWord("");
        setSpanishWord("");
        inputFocused.current.focus();

        setTimeout(() => {
            setAlert(null);
        }, 5000);
    }



    return (

        <>
        <form action="" onSubmit={(e) => handleSubmit(e)} className="wordForm">
            <h2>Add New Word</h2>
            <div className={`formContent `}>
                <label htmlFor="englishWord">English Word:</label>
                <input type="text" id="englishWord" name="englishWord" required placeholder="e.g., matter " onChange={(e) => {
                    setEnglishWord(e.target.value)
                    setAlert(null);
                }
                } value={englishWord} ref={inputFocused} />
                <label htmlFor="spanishWord">Spanish Word:</label>
                <input type="text" id="spanishWord" name="spanishWord" required placeholder="e.g., materia, asunto " onChange={(e) => setSpanishWord(e.target.value)} value={spanishWord} />
                <button type="submit">Add Word</button>
            </div>
        </form>
        {alert && <Alert type={alert.type} message={alert.message} />}
        </>
    )


}

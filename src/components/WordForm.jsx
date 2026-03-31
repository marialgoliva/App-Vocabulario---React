import React, { useEffect, useState } from "react";
import "./WordForm.css";

export default function WordForm() {

    const [englishWord, setEnglishWord] = useState("");
    const [spanishWord, setSpanishWord] = useState("");
    const [wordsList, setWordsList] = useState(() => {
        const savedWords = localStorage.getItem("wordsList");
        return savedWords ? JSON.parse(savedWords) : [];
    });

    useEffect(() => {
        localStorage.setItem("wordsList", JSON.stringify(wordsList));
        console.log('wordsList :>> ', wordsList);
    }, [wordsList]);


    

    return (
        
        <form action="" onSubmit={(e)=>{
            e.preventDefault();
            setWordsList([...wordsList, {english: englishWord, spanish: spanishWord}]);
            setEnglishWord("");
            setSpanishWord("");
            
        }}>
            <h2>Add New Word</h2>
            <div className="formContent">
                <label htmlFor="englishWord">English Word:</label>
                <input type="text" id="englishWord" name="englishWord" required placeholder="e.g., matter " onChange={(e) => setEnglishWord(e.target.value)} />
                <label htmlFor="spanishWord">Spanish Word:</label>
                <input type="text" id="spanishWord" name="spanishWord" required placeholder="e.g., materia, asunto " onChange={(e) => setSpanishWord(e.target.value)} />
                <button type="submit">Add Word</button>
            </div>
        </form>
    )

    
}

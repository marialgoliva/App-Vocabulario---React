import React from "react";
import "./WordForm.css";

export default function WordForm() {
    return (
        <form action="">
            <h2>Add New Word</h2>
            <div className="formContent">
                <label htmlFor="englishWord">English Word:</label>
                <input type="text" id="englishWord" name="englishWord" required  placeholder="e.g., matter "/>
                <label htmlFor="spanishWord">Spanish Word:</label>
                <input type="text" id="spanishWord" name="spanishWord" required placeholder="e.g., materia, asunto " />
                <button type="submit">Add Word</button>
            </div>
        </form>
    )
}

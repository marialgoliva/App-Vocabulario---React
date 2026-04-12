import React from "react";
import './ListCard.css'

export default function ListCard({ title, wordsList }) {
    return (
        <section className="listCard">
            <h3>{title}</h3>
            
                <ul className="list">
                    {wordsList.length === 0 ? 
                    <p>No words yet</p> : 
                    wordsList.map((word, index) => 
                    (
                        <li key={index}>
                            {word.english}
                        </li>
                    ))}
                </ul>       
        </section>
    )
}
import React, { useEffect } from "react";
import "./QuizCard.css";

const getRandomWord = (wordsList, setQuizWord, quizWord) => {

    console.log('wordsList DENTRO :>> ', wordsList);
        
        if (wordsList.length === 0) return;

        if (wordsList.length === 1) {
        setQuizWord(wordsList[0]);
        return;
        }
        let randomIndex;

        
        
        do {
            randomIndex = Math.floor(Math.random() * wordsList.length);
            
        } while (quizWord && wordsList[randomIndex].english === quizWord.english);

        

        setQuizWord(wordsList[randomIndex]);
    };

export default function QuizCard() {

    const [quizWord, setQuizWord] = React.useState(null);
    const [wordsList, ] = React.useState(() => {
        const savedWords = localStorage.getItem("wordsList");
        return savedWords ? JSON.parse(savedWords) : [];
    });

    console.log('wordsList :>> ', wordsList);


    

    useEffect(() => {
            if (wordsList.length > 0 && !quizWord) {
            getRandomWord(wordsList, setQuizWord, quizWord);
        }
        
    },[wordsList, quizWord]);

    useEffect(() => {
        localStorage.setItem("wordsList", JSON.stringify(wordsList));
    }, []);

    return (
        <div className="quizForm">
            <h2 className="quizTitle">What is the translation?</h2>
            <div className="changeLanguage">
                {/* Componente botones */}
                <div>
                    <button>Inglés - Español</button>
                    <button>Español - Inglés</button>
                </div>
                <p>What is the meaning of ...?</p>
            </div>
            <div className="quizWord">
                {quizWord && <h3>{quizWord.english}</h3>}
            </div>
            <input className="answer" type="text" placeholder="Enter translation..." />
            <div className="contador">
                {/* Componente contador */}
                <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg> Correctas: <span>0</span></p>
                <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>Incorrectas: <span>0</span></p>
            </div>
            <div className="quizSubmit">
                <button>Check</button>
                <button onClick={() => getRandomWord(wordsList, setQuizWord, quizWord)}>Next Word</button>
            </div>

        </div>
    );
}
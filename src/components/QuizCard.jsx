import React, { useEffect, useState } from "react";
import "./QuizCard.css";
import Counter from "./Counter";

const getRandomWord = (wordsList, setQuizWord, quizWord, setUserAnswer, setFeedback) => {
    let newWord;
    if (!wordsList || wordsList.length === 0) newWord = null;

    if (wordsList.length === 1) {
        newWord = wordsList[0];
    } else {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * wordsList.length);

        } while (quizWord && wordsList[randomIndex].english === quizWord.english);
        newWord = wordsList[randomIndex]
    }




    setQuizWord(newWord);
    setUserAnswer("");
    setFeedback("");
};

export default function QuizCard({ wordsList, learned, setLearned }) {

    const [quizWord, setQuizWord] = React.useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [correctHits, setCorrectHits] = useState([]);
    const toLearnWords = wordsList.filter(word => !learned.includes(word.english));
    console.log('toLearnWords :>> ', toLearnWords);

    const checkAnswer = () => {
        if (!quizWord) return;
        if (userAnswer.trim().toLowerCase() === quizWord.spanish.toLowerCase()) {
            setFeedback("isCorrect");
            const currentNumber = correctHits[quizWord.english] || 0;
            const newNumber = currentNumber + 1;
            setCorrectHits(prev => {
                return { ...prev, [quizWord.english]: newNumber };
            });
            if (newNumber === 3) {
                setLearned(prev => [...prev, quizWord.english]);
                localStorage.setItem("learned", JSON.stringify([...learned, quizWord.english]));
            }
            if (toLearnWords.length === 1) {
                setQuizWord(null);
                setUserAnswer("");
                setFeedback("");
                return;
            }

            setTimeout(() => {
                
                if (toLearnWords && toLearnWords.length > 0) {
                    getRandomWord(toLearnWords, setQuizWord, quizWord, setUserAnswer, setFeedback);
                } else {
                    setQuizWord(null);
                    setUserAnswer("");
                    setFeedback("");
                }

            }, 1000);

        } else {
            setFeedback("isIncorrect");
        }
    };





    useEffect(() => {
        if (wordsList.length > 0 && !quizWord) {
            if (toLearnWords.length > 0) {
                getRandomWord(toLearnWords, setQuizWord, quizWord, setUserAnswer, setFeedback);
            }
        }

    }, [wordsList, quizWord, toLearnWords]);

    useEffect(() => {
        localStorage.setItem("wordsList", JSON.stringify(wordsList));
    }, [wordsList]);

    return (
        <section className="quizForm">
            <h2 className="quizTitle">What is the translation?</h2>
            <div className="changeLanguage">
                {/* Componente botones */}
                <div>
                    <button>Inglés - Español</button>
                    <button>Español - Inglés</button>
                </div>
                <p>What is the meaning of ...?</p>
            </div>
            <div className={`quizWord ${feedback}`}>
                {quizWord ? <h3>{quizWord.english}</h3> : <h3>No words to learn!</h3>}
            </div>
            <input className="answer" type="text" placeholder="Enter translation..."
                value={userAnswer} onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if (feedback === "isIncorrect") {
                        setFeedback("");
                        setUserAnswer("");
                    };
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        checkAnswer();
                    }
                }} />
            <Counter learned={learned} toLearn={wordsList.length - learned.length}></Counter>
            <div className="quizSubmit">
                <button onClick={checkAnswer}>Check</button>
                <button onClick={() => getRandomWord(toLearnWords, setQuizWord, quizWord, setUserAnswer, setFeedback)}>Next Word</button>
            </div>

        </section>
    );
}
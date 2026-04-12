import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import WordForm from './components/WordForm';
import QuizCard from './components/QuizCard';
import ListCard from './components/ListCard';


function App() {

  const [wordsList, setWordsList] = React.useState(() => {
    const savedWords = localStorage.getItem("wordsList");
    return savedWords ? JSON.parse(savedWords) : [];
  });

  const [learned, setLearned] = React.useState(() => {
    const savedLearned = localStorage.getItem("learned");
    return savedLearned ? JSON.parse(savedLearned) : [];
  });





  return (
    <>
      <main className="mainContainer">
        <Navbar></Navbar>
        <div>
          <WordForm wordsList={wordsList} setWordsList={setWordsList}></WordForm>
          <QuizCard wordsList={wordsList} learned={learned} setLearned={setLearned}></QuizCard>
          <section className='listsContainer'>
            <ListCard title="To Learn" wordsList={wordsList.filter(word => !learned.includes(word.english))}></ListCard>
            {learned.length > 0 && <ListCard title="Learned" wordsList={wordsList.filter(word => learned.includes(word.english))}></ListCard>}
          </section> 
        </div>
      </main>
    </>
  )
}

export default App

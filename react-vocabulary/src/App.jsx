import './App.css'
import Navbar from './components/Navbar';
import WordForm from './components/WordForm';
import QuizCard from './components/QuizCard';

function App() {

  return (
    <>
      <main className="mainContainer">
        <Navbar></Navbar>
        <div>
          <section className="wordForm">
            <WordForm></WordForm>
          </section>
            <QuizCard></QuizCard>
        </div>
      </main>
    </>
  )
}

export default App

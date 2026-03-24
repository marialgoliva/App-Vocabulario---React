import './App.css'
import Navbar from './components/Navbar';
import WordForm from './components/WordForm';

function App() {

  return (
    <>
      <main className="mainContainer">
        <Navbar></Navbar>
        <div>
          <section className="wordForm">
            <WordForm></WordForm>
          </section>
          <section className="quizForm">
            <h1>Formulario de Quiz</h1>
          </section>
        </div>
      </main>
    </>
  )
}

export default App

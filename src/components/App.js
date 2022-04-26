import '../styles/App.css';
import getQuotes from '../services/fetchQuotes';
import { useEffect, useState } from 'react';

function App() {
  // STATES
  // Opening sentece list state
  const [quotes, setQuotes] = useState([]);
  // New quote state
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: ''
  });


  // FUNCTIONS
  // Get data fromAPI function
  useEffect(() => {
    getQuotes().then(data => 
      setQuotes(data)
    )
  }, []);


  // Add new quote function
  const handleNewQuote = event => (
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value
    }));


  // Send add new quote function
  const handleClickNewQuote = event => {
    event.preventDefault();
    setQuotes([
      ...quotes,
      newQuote
    ]);
    setNewQuote({
      quote: '',
      character: ''
    });
  }



  // Render quotes function
  const renderQuotes = quotes.map((item, index) => (
    <li className='quotes__item' key={index}>
      <span className='quote'>{item.quote}</span> - <span className='character capitalize'>{item.character}</span>
    </li>
  ));


  return (
    <div>

      <header className='header'>
        <h1 className='header__title capitalize'>Frases de friends</h1>
      </header>

      <main className='main'>
        <ul className='quotes'>{renderQuotes}</ul>

        <form className='newQuote__form'>

          <label htmlFor="quote" className='newQuote__label'>Frase</label>
          <input type="text" name="quote" id="quote"  className='newQuote__input' value={newQuote.quote} onChange={handleNewQuote} />
          
          <label htmlFor="character" className='newQuote__label'>Personaje</label>
          <input type="text" name="character" id="character" className='newQuote__input' value={newQuote.character} onChange={handleNewQuote} />

          <input type="submit" className='newQuote__button' valur="Añadir" onClick={handleClickNewQuote} />

        </form>
      </main>

    </div>
  );
}

export default App;

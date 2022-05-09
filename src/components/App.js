import '../styles/App.scss';
import { useEffect, useState } from 'react';
import getQuotes from '../services/fetchQuotes';
import LocalStorage from '../services/localStorage';


function App() {
  // STATES
  // Quotes list state
  const [quotes, setQuotes] = useState(LocalStorage.get("quotes",[]));
  // New quote state
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: ''
  });
  // Filter state - filter by name
  const [filterName, setFilterName] = useState('');
  // Filter by character state - filter by character
  const [filterCharacter, setFilterCharacter] = useState('all');


  // FUNCTIONS
  // Get data fromAPI function
  useEffect(() => {
    if (quotes.length === 0) {
      getQuotes().then(data => {
        LocalStorage.set("quotes", data);
        setQuotes(data);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Filter by name function
  function handleFilterName(event) {
    setFilterName(event.target.value);
  }

  // Filter by character function
  const handleFilterCharacter = (event) => {
    setFilterCharacter(event.target.value);
  };


  // Add new quote function
  const handleNewQuote = event => (
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value
    })
  );

  // Validation for add a new quote
  const validationAddNewQuote = () => {
    if(newQuote.quote === '' || newQuote.character === '') {
      return false;
    } else {
      return true;
    }
  }

  // Send add new quote function
  const handleClickNewQuote = event => {
    event.preventDefault();
    validationAddNewQuote();
    const newQuotes = [
      ...quotes,
      newQuote
    ];
    LocalStorage.set("quotes", newQuotes);
    setQuotes(newQuotes);
    setNewQuote({
      quote: '',
      character: ''
    });
  };



  // Render quotes function
  const renderQuotes = quotes
  .filter(item => {

    if(filterCharacter === 'all') {
      return true;
    } else if (filterCharacter === item.character) {
      return true;
    } else {
      return false;
    }

  })
  .filter(item =>
    item.quote.toLowerCase().includes(filterName.toLowerCase())
    )
  .map((item, index) => (
    <li className='quotes__item' key={index}>
      <span className='quote'>{item.quote}</span> - <span className='character capitalize'>{item.character}</span>
    </li>
  ));


  return (
    <div>

      <header className='header'>
        <h1 className='header__title'>Frases de 
          <p className='header__title--special uppercase'>
            f
            <span className="dotRed">•</span>
            r
            <span className="dotYellow">•</span>
            i
            <span className="dotBlue">•</span>
            e
            <span className="dotRed">•</span>
            n
            <span className="dotYellow">•</span>
            d
            <span className="dotBlue">•</span>
            s
          </p>
        </h1>
      </header>

      <main className='main'>
        <form className='formFilter'>

          <label htmlFor="search" className='search__label'>Busca la frase de tu protagonista favorito</label>
          <input type="text" name="search" id="search"  className='search__input' value={filterName} onChange={handleFilterName} />

          <select className='select' name="filterCharacter" id="filterCharacter" value={filterCharacter} onChange={handleFilterCharacter}>
            <option value="all">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>

        </form>

        <ul className='quotes'>{renderQuotes.length === 0 ? <li className='quote__item--error'>No hay ninguna frase que coincida con tus términos de búsqueda 😥</li> : renderQuotes}</ul>

        <form className='formNewQuote'>

          <label className="formNewQuote__title">Añade una nueva frase</label>

          <label htmlFor="quote" className='newQuote__label'>Frase</label>
          <input type="text" name="quote" id="quote"  className='newQuote__input' value={newQuote.quote} onChange={handleNewQuote} />
          
          <label htmlFor="character" className='newQuote__label'>Personaje</label>
          <input type="text" name="character" id="character" className='newQuote__input' value={newQuote.character} onChange={handleNewQuote} />

          <button className='newQuote__button' onClick={handleClickNewQuote} disabled={validationAddNewQuote() === false}>Añadir nueva frase</button>

        </form>

      </main>

      <div className="containerBackground"></div>

    </div>
  );
}

export default App;

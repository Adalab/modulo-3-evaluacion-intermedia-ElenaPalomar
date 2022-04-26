const getQuotes = () => {
  return fetch("https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json")
  .then(response => response.json())
  .then(data => {
    // He limpiado los datos para aplicar las issues de las evaluaciones anteriores, pero considero que, en este caso, no sería necesario porque sólo hay dos datos que nos da la API y que nos interesan
    const cleanData = data.map(item => {
      return {
        quote: item.quote,
        character: item.character
      }
    });
    return cleanData;
  })
}

export default getQuotes;
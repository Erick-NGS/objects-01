const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const userInputs = document.querySelectorAll('input');

const movies = [];

const clearInputs = () => {
  for (const input of userInputs) {
    input.value = '';
  }
};

const renderMovies = (filterItem = '') => {
  const list = document.getElementById('movie-list');

  if (!movies.length) {
    list.classList.remove('visible');
  } else {
    list.classList.add('visible');
  }

  list.innerHTML = '';

  const movieSearchRes = !filterItem
    ? movies
    : movies.filter(movie => movie.info.title.includes(filterItem));

  movieSearchRes.forEach(movie => {
    const movieEl = document.createElement('li');
    let text = `${movie.info.title} - `;
    for (const key in movie.info) {
      if (key !== 'title') {
        text += `${key}: ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;
    list.append(movieEl);
  });
};

// HANDLERS
const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  )
    return;

  const newMovie = {
    info: { title, [extraName]: extraValue },
    id: Math.random(),
  };

  movies.push(newMovie);
  renderMovies();
  alert(`${newMovie.info.title} added`);
  clearInputs();
};

const searchMovieHandler = () => {
  const filterItem = document.getElementById('filter-title').value;
  renderMovies(filterItem);
};
// HANDLERS

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

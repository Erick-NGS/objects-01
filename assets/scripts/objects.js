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
    /*
    in order to check if a property exists or not in an object, its an option to use the 'in' keyword:
    if('info' in movies){...}
    or, use a more default validation
    if(movie.info !== undefined){...}
    */
    const { info, ...otherInfo } = movie;
    // reminder for the 'this' keyword: it always refer to whats calling the function, for example movie.formatTitle, movie is whats calling the function, hence is the 'this' keyword on the function
    // let text = `${movie.formatTitle()} - `;

    // Using bind, we can connect the 'this' in the function with the right object, when using destructuring in this case, so that it does not refer to the window object
    let { formatTitle } = movie;
    formatTitle = formatTitle.bind(movie);
    let text = `${formatTitle()} - `;
    for (const key in info) {
      if (key !== 'title') {
        text += `${key}: ${info[key]}`;
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
    formatTitle() {
      return this.info.title.toUpperCase();
    },
    id: Math.random().toString(),
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

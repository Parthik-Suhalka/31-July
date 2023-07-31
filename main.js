// Replace 'YOUR_API_KEY' with your actual TMDb API key
const API_KEY = '637526fb495fa4159cc28bf14a864c87';

// Function to fetch trending movies from TMDb API
function fetchTrendingMovies() {
  const endpoint = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      // Populate carousel indicators
      const indicators = document.querySelector(".carousel-indicators");

      data = data.results.slice(0, 3)
      data.forEach((movie, index) => {
        const indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-slide-to", index);
        if (index === 0) {
          indicator.classList.add("active");
        }
        indicators.appendChild(indicator);

        // Populate carousel items
        const carouselInner = document.querySelector(".carousel-inner");
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
          carouselItem.classList.add("active");
        }
        const img = document.createElement("img");
        img.classList.add("d-block", "w-100");
        img.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        img.alt = movie.title;
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the function to fetch and populate the carousel
fetchTrendingMovies();





const moviesContainer = document.getElementById('movies-container');

// Fetch trending movie data from TMDB API
fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    displayMovies(movies);
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to create movie cards and display them
function displayMovies(movies) {
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release Date: ${movie.release_date}`;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
    poster.alt = `${movie.title} Poster`;

    card.appendChild(title);
    card.appendChild(releaseDate);
    card.appendChild(overview);
    card.appendChild(poster);

    moviesContainer.appendChild(card);
  });
}





// Function to fetch popular movies data from TMDB API
function fetchPopularMovies() {
  const searchQuery = document.getElementById('search-input').value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&sort_by=popularity.desc`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to display movies on the webpage
function displayMovies(movies) {
  const moviesListContainer = document.getElementById('movies-list');
  moviesListContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieTitle = movie.title;
    const moviePoster = movie.poster_path;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const posterImage = document.createElement('img');
    posterImage.src = `https://image.tmdb.org/t/p/w500/${moviePoster}`;
    posterImage.alt = `${movieTitle} Poster`;

    const titleElement = document.createElement('h2');
    titleElement.textContent = movieTitle;

    movieElement.appendChild(posterImage);
    movieElement.appendChild(titleElement);
    moviesListContainer.appendChild(movieElement);
  });
}

// Add event listener to the form submission
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Fetch movies data from TMDB API
  fetchPopularMovies();
});


const POP_API = `https://api.themoviedb.org/3/movie/popular?api_key=718d8ac9d9959991ccef62c45b02163d&language=en-US&page=`;  
const TOP_API = `https://api.themoviedb.org/3/discover/movie?api_key=718d8ac9d9959991ccef62c45b02163d&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&page=`;
const RATED_MOVIES_API = `https://api.themoviedb.org/3/account/21203275/rated/movies?api_key=718d8ac9d9959991ccef62c45b02163d&language=en-US&sort_by=created_at.asc&page=1`
const ON_AIR = `https://api.themoviedb.org/3/tv/on_the_air?api_key=718d8ac9d9959991ccef62c45b02163d&language=en-US&page=`
const TV_API = `https://api.themoviedb.org/3/discover/tv?api_key=718d8ac9d9959991ccef62c45b02163d&include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&page=`
console.log(TV_API)
const movieContainer=document.getElementById("movies")
const form = document.getElementById("search-movies")
const input = document.querySelector("input")
const navigator = document.getElementById("navigation")

const nextButton = document.createElement("button")
nextButton.className = "next";
// const button1 = document.getElementsByClassName("next")
nextButton.innerText = "Next"

const previousButton = document.createElement("button")
previousButton.className = "previous";
// const button2 = document.getElementsByClassName("previous")
previousButton.innerText = "Previous"

let pageNumber = 1;
async function getMovies(api,pageNumber) {
    
    
    const completeUrl = api + pageNumber
    const response = await fetch(completeUrl);
    const data = await response.json()
    console.log(data)

  
    data.results.forEach((movie) => {
        const movieDiv = document.createElement("span")
        movieDiv.className = "movie"
        movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
        <div id="movie_info"><h3>${movie.title}</h3><p>${movie.vote_average}</p>
        </div>`
        movieContainer.appendChild(movieDiv)
    }
    );


    if(pageNumber === 1){
        navigator.appendChild(nextButton)
        navigator.style.justifyContent = "center"

      }else if(pageNumber === data.total_pages){
        navigator.appendChild(previousButton)
        navigator.style.justifyContent = "center"
    } else {
        navigator.appendChild(previousButton),
        navigator.appendChild(nextButton)
        navigator.style.justifyContent = "space-between"
      }

    
}
getMovies(POP_API, pageNumber);

function searchBar() {
    let searchMovie = input.value;
    return searchMovie;
}



form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    movieContainer.innerHTML = "";
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=718d8ac9d9959991ccef62c45b02163d&query=${searchBar()}&include_adult=false&language=en-US&page=1`
    getMovies(SEARCH_API)
});


nextButton.addEventListener("click", (Event) => {
    Event.preventDefault()
    pageNumber++
    movieContainer.innerHTML = ""
    getMovies(POP_API, pageNumber)
});

previousButton.addEventListener("click", (Event) => {
    Event.preventDefault()
    pageNumber--
    movieContainer.innerHTML = ""
    getMovies(POP_API, pageNumber)
})



const arrow = document.getElementById("downArrow");
const dropDown = document.getElementById("content");
// dropDown.style.display = "none";
// document.getElementById("content").style.display = "none";
console.log(arrow)

arrow.addEventListener('click', () => {
    dropDown.classList.toggle('content-display')
})

const topRated = document.getElementById("toprated")
topRated.addEventListener('click', (e) => {
    e.preventDefault()
    movieContainer.innerHTML = "";
    getMovies(TOP_API, pageNumber)
    
})


const trending = document.getElementById("trending")
trending.addEventListener('click', (e) => {
    e.preventDefault()
    movieContainer.innerHTML = "";
    getMovies(ON_AIR, pageNumber)
    
})

const rated_movies = document.getElementById("upcoming")
rated_movies.addEventListener('click', (e) => {
    e.preventDefault()
    movieContainer.innerHTML = "";
    getMovies(RATED_MOVIES_API, pageNumber)
    
})

const tv = document.getElementById("tv")
tv.addEventListener('click', (e) => {
    e.preventDefault()
    movieContainer.innerHTML = "";
    getMovies(TV_API, pageNumber)
    
})

// const animation = document.getElementById("animation")
// topRated.addEventListener('click', (e) => {
//     e.preventDefault()
//     movieContainer.innerHTML = "";
//     getMovies(TOP_API, pageNumber)
    
// })

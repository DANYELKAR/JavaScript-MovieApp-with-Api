const Api_Url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const Img_Path ='https://image.tmdb.org/t/p/w1280/';
const Search_Api ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(Api_Url); //initally get movies

async function getMovies(url){

    const response = await fetch(url);
    const responseData = await response.json();

    showMovies(responseData.results);
}


function showMovies(movies){

    main.innerHTML = ''; // clear main

    movies.forEach(movie => {
        const {poster_path,title,vote_average, overview} = movie;

        const movieEl =document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML=`  
        <img 
            src="${Img_Path+poster_path}" 
            alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getVoteByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview:</h3>
        ${overview}</div>
        `;
        main.appendChild(movieEl);
    });
}

function getVoteByRate(vote){
    if(vote >=8){
        return 'green';
    }else if (vote >=7){
        return 'orange'
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    

    if(searchTerm){
        getMovies(Search_Api + searchTerm);
        search.value="";
    }
});

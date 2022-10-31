const main = document.querySelector('#content');
const url ='https://yts.mx/api/v2/list_movies.json?quality=3D';

const movieApp2 = async ()=>{
    var response = await fetch(url);
    var dataCollected = await response.json();
    return dataCollected;
}

async function movieDetails(){
    try{
        // var html = '';
        const response = await fetch(url);
        const responseData = await response.json();
        const result = await responseData.data.movies;
        console.log(result);

        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        const movieId = parameters.get("id");
        console.log(movieId);

        let movie = result.find((item) => {
            return item.id == movieId;
        });
        console.log(movie);

        if (movieId) {
            const movieDetailsContainer = document.createElement('div');
            movieDetailsContainer.classList.add('movie_details_img');
            const img = document.createElement('img');
            img.src = movie.large_cover_image;

            main.appendChild(movieDetailsContainer);
            movieDetailsContainer.appendChild(img);
    }

    } catch (error) {
        console.log(error);
    }
}

movieDetails();
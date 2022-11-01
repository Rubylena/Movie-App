const main = document.querySelector('#content');
const url ='https://yts.mx/api/v2/list_movies.json?quality=3D';

const movieApp2 = async ()=>{
    var response = await fetch(url);
    var dataCollected = await response.json();
    return dataCollected;
}

async function movieDetails(){
    try{
        const response = await fetch(url);
        const responseData = await response.json();
        const result = await responseData.data.movies;

        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        const movieId = parameters.get("id");

        let movie = result.find((item) => {
            return item.id == movieId;
        });
        console.log(movie);

        if (movieId) {
            const movieDetailsImage = document.createElement('div');
            movieDetailsImage.classList.add('movie_details_img');
            movieDetailsImage.style.flex = '30%';
            const img = document.createElement('img');
            img.src = movie.large_cover_image;
            const content = document.createElement('div');
            content.style.flex = '70%';
            content.style.display = 'flex';
            content.style.flexDirection = 'column';
            content.style.gap = '1em';
            content.style.padding = '0.5em';
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
            h1.style.fontSize = '2em';
            const h2 = document.createElement('h2');
            h2.textContent = movie.year;
            const h3 = document.createElement('h3');
            h3.textContent = movie.genres.join(' / ');
            const p = document.createElement('p');
            p.textContent = movie.summary;
            const download = document.createElement('a');
            download.href = movie.url;
            download.textContent = 'Click Here to download'
            download.classList.add('download');
            const trailer = document.createElement('a');
            trailer.textContent = 'Watch trailer'
            trailer.href = `https://www.youtube.com/embed/${movie.yt_trailer_code}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`;
            trailer.style.textDecoration = 'none';


            main.appendChild(movieDetailsImage);
            movieDetailsImage.appendChild(img);
            main.appendChild(content);
            content.appendChild(h1);
            content.appendChild(h2);
            content.appendChild(h3);
            content.appendChild(p);
            content.appendChild(trailer);
            content.appendChild(download);
    }

    } catch (error) {
        console.log(error);
    }
}

movieDetails();
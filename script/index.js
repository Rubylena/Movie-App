const main = document.querySelector('main');
const url ='https://yts.mx/api/v2/list_movies.json?quality=3D';

async function movieList(){
    try{
        const response = await fetch(url);
        const responseData = await response.json();
        const movie = await responseData.data.movies;

        movie.forEach(movie => {
            const a = document.createElement('a');
            const movieContainer = document.createElement('div');
            const imgContainer = document.createElement('div');
            const img = document.createElement('img');
            const textContainer = document.createElement('div');
            const h2 = document.createElement('h2');
            const h3 = document.createElement('h3');
            
            a.href = `detailsPage.html?id=${movie.id}`;
            movieContainer.classList.add('movie_container');
            imgContainer.classList.add('movie_img_container');
            img.src = movie.medium_cover_image;
            textContainer.style.padding = '0 0.8em';
            h2.textContent = movie.title;
            h2.style.fontSize = '1em';
            h3.textContent = movie.year;
            h3.style.fontSize = '1em';
            h3.style.color = 'rgba(255,255,255, 0.2)';

            main.appendChild(a);
            a.appendChild(movieContainer);
            movieContainer.appendChild(imgContainer);
            imgContainer.appendChild(img);
            movieContainer.appendChild(textContainer);
            textContainer.appendChild(h2);
            textContainer.appendChild(h3);
        });
    } catch (error) {
        console.log(error);
    }
}

movieList();
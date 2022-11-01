const mainContent = document.querySelector('#content');

async function movieDetails(){
    try{
        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        const movieId = parameters.get("movie_id");

        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
        const responseData = await response.json();
        const movie = await responseData.data.movie;

        if (movieId) {
            const movieDetailsImage = document.createElement('div');
            movieDetailsImage.classList.add('movie_details_img');
            movieDetailsImage.style.flex = '30%';
            const img = document.createElement('img');
            img.src = movie.medium_cover_image;
            const content = document.createElement('div');
            content.style.flex = '70%';
            content.style.display = 'flex';
            content.style.flexDirection = 'column';
            content.style.gap = '0.5em';
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
            h1.style.fontSize = '2em';
            const h2 = document.createElement('h2');
            h2.textContent = movie.year;
            const h3 = document.createElement('h3');
            h3.textContent = movie.genres.join(' / ');
            const p = document.createElement('p');
            p.textContent = movie.description_full.split(' ', 20).join(' ') + ' ... ';
            
            const span = document.createElement('span');
            span.classList.add('show_more');
            span.textContent = 'Show more';
            span.addEventListener('click',()=>{
                if(p.textContent.includes('...')){
                    p.textContent = movie.description_full;
                    span.textContent = 'Show less';
                } else {
                    p.textContent = movie.description_full.split(' ', 20).join(' ') + ' ... ';
                    span.textContent = 'Show more';
                }
            } );

            const download = document.createElement('a');
            download.href = movie.url;
            download.textContent = 'Click Here to download'
            download.classList.add('download');
            const trailer = document.createElement('a');
            trailer.textContent = 'Watch trailer'
            trailer.href = `https://www.youtube.com/embed/${movie.yt_trailer_code}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`;
        trailer.classList.add('trailer');


            mainContent.appendChild(movieDetailsImage);
            movieDetailsImage.appendChild(img);
            mainContent.appendChild(content);
            content.appendChild(h1);
            content.appendChild(h2);
            content.appendChild(h3);
            content.appendChild(p);
            content.appendChild(span);
            content.appendChild(trailer);
            content.appendChild(download);
    }

    } catch (error) {
        console.log(error);
    }
};

movieDetails();

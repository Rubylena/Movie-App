const main = document.querySelector('main');
const search = document.querySelector('.search_input');
const searchIcon = document.querySelector('.search_icon');

const searchIt = async (movie) =>{
    try {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json${movie}`);
        const data = await response.json();
        const result = await data.data;

        if(result.movie_count !== 0){
            const movie = await result.movies;
            movie.forEach(movie => {
                const a = document.createElement('a');
                const movieContainer = document.createElement('div');
                const imgContainer = document.createElement('div');
                const img = document.createElement('img');
                const textContainer = document.createElement('div');
                const h2 = document.createElement('h2');
                const h3 = document.createElement('h3');
                
                a.href = `detailsPage.html?movie_id=${movie.id}`;
                movieContainer.classList.add('movie_container');
                imgContainer.classList.add('movie_img_container');
                img.src = movie.medium_cover_image;
                textContainer.style.padding = '0 0.5em';
                h2.innerHTML = movie.title;
                h3.innerHTML = movie.year;
                h3.style.color = 'rgba(255,255,255, 0.2)';
                
                main.appendChild(a);
                a.appendChild(movieContainer);
                movieContainer.appendChild(imgContainer);
                imgContainer.appendChild(img);
                movieContainer.appendChild(textContainer);
                textContainer.appendChild(h2);
                textContainer.appendChild(h3);
            });
        } else {
            main.innerHTML = 'No such movie available, mbok fiak nam!!!';
        }
    } catch(err){
        console.log(err);
    }
}
searchIt();

searchIcon.addEventListener('click', ()=>{
    const searchWords = search.value;
    if(searchWords !== ''){
        main.innerHTML = '';
        searchIt(`?query_term=${searchWords}&limit=50`);
    } 
});

search.addEventListener('keyup', (e) => {
    const searchWords = search.value;
    if(e.keyCode === 13){ 
        if (searchWords !== "") {
            main.innerHTML = '';
            searchIt(`?query_term=${searchWords}&limit=50`);
        }
    }
});
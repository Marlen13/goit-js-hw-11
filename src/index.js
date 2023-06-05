import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(axios);

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// // const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '37030497-adb1b30a9790add5f50421470';

// let pageToFetch = 1;
// let queryToFetch = '';

// async function fetchEvents(q, page) {
//   try {
//     const { data } = await axios('', {
//       param: {
//         key: API_KEY,
//         q,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: pageToFetch,
//         per_page,
//       },
//     });
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
// }
// }


// form.addEventListener("submit", handleSubmit);
// function handleSubmit(event) {
//     event.preventDefault();
//     gallery.innerHTML = "";
//     const inputValue = event.target.elements.earchQuery.value;
//     fetchEvents(inputValue, page);
//     queryToFetch = inputValue;
//     getEvents(queryToFetch, pageToFetch);
// }

// async function getEvents(q, page) {
//     const data = await fetchEvents(q, page)
//     .then(data => {
//         console.log(data);
//         if (!data || data === []) {
//                 // allert('Sorry, there are no images matching your search query. Please try again.')
//                 }
//     }
        
    // function renderEvents(events) {
    //             const markup = events
    //                 .map(
    //                     ({
    //                         webformatURL,
    //                         largeImageURL,
    //                         tags,
    //                         likes,
    //                         views,
    //                         comments,
    //                         downloads,
    //                     }) => {
    //                         return `<a class="gallery-link" href="${largeImageURL}">
                // <img class="gallery-img" src="${webformatURL}" alt="${tags}"></a> 
                // <div class="img-container">
                // <p class="img-info">${likes}</p>
                // <p class="img-info">${views}</p>
                // <p class="img-info">${comments}</p>
                // <p class="img-info">${downloads}</p>
                // </div>`;
                //         }
                //     )
//                     .join('');
//         gallery.insertAdjacentHTML('beforeend', markup);
//         loadMoreBtn.classList.remove("unvisible")
// }

        
// loadMoreBtn.addEventListener("click", handleLoadMore);
                
// function handleLoadMore() {
// loadMoreBtn.classList.add("unvisible");
// pageToFetch += 1;
// getEvents(queryToFetch, pageToFetch);
// }
                    
                     
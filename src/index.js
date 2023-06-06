import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './api';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let pageToFetch = 1;
let queryToFetch = '';
let lightbox = new SimpleLightbox('.gallery a', {
});


form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    pageToFetch = 1;
  gallery.innerHTML = '';
  queryToFetch = event.target.elements.searchQuery.value;
  fetchImages(queryToFetch, pageToFetch).then(data => createMarkup(data)) ;
}

function createMarkup(photo) {

    if (photo === undefined) {
        loadMoreBtn.classList.add("unvisible");
        return;
    }
            const markup = photo?.hits
                .map(
                    ({
                        webformatURL,
                        largeImageURL,
                        tags,
                        likes,
                        views,
                        comments,
                        downloads,
                    }) => {
                        return `<div class="gallery-item"><a class="gallery-link" href="${largeImageURL}">
<img class="gallery-img" src="${webformatURL}" alt="${tags}" width=370px></a>
<div class="img-container">
<p class="img-info"><b>Likes</b>${likes}</p>
<p class="img-info"><b>Views</b>${views}</p>
<p class="img-info"><b>Comments</b>${comments}</p>
<p class="img-info"><b>Downloads</b>${downloads}</p>
</div></div>`;
        }
    )
    .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    if (photo?.hits.length !== 0) {
        
        Notiflix.Notify.success(`Hooray! We found ${photo?.totalHits} images.`)    
        
        loadMoreBtn.classList.remove("unvisible")
    }
}

loadMoreBtn.addEventListener("click", handleLoadMore);

function handleLoadMore() {
pageToFetch += 1;
    fetchImages(queryToFetch, pageToFetch).then(data => createMarkup(data));
}

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
                        return `<div class="gallery-item"><div class="img-thumb"><a class="gallery-link" href="${largeImageURL}">
<img class="gallery-img" src="${webformatURL}" alt="${tags}" width="600" height="400"></a></div>
<div class="img-container">
<div class="img-info">
<p class="img-info"><b>Likes</b></p>
<p class="img-value">${likes}</p>
</div>
<div class="img-info">
<p class="img-info"><b>Views</b></p>
<p class="img-value">${views}</p>
</div>
<div class="img-info">
<p class="img-info"><b>Comments</b></p>
<p class="img-value">${comments}</p>
</div>
<div class="img-info">
<p class="img-info"><b>Downloads</b></p>
<p class="img-value">${downloads}</p>
</div>
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

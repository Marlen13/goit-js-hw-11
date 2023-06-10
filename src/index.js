import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './api';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const imgToFetch = 200;
let pageToFetch = 1;
let queryToFetch = '';
let lightbox = new SimpleLightbox('.gallery a', {});

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  pageToFetch = 1;
    gallery.innerHTML = '';
    // loadMoreBtn.classList.add('unvisible');
  queryToFetch = event.target.elements.searchQuery.value.trim();
  if (queryToFetch === '') {
      return;
  } 
    const data = await fetchImages(queryToFetch, pageToFetch);
    createMarkup(data);
    if (pageToFetch === 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        
    }
}

function createMarkup(photo) {
//   if (photo === undefined) {
//     loadMoreBtn.classList.add('unvisible');
//     return;
//   }
    loadMoreBtn.classList.add('unvisible');
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
    loadMoreBtn.classList.remove('unvisible');
    // console.log(photo?.hits)
    // console.log(photo)
    // console.log(photo?.hits.length)
//       if (photo.totalHits === photo.hits.length) {
//           loadMoreBtn.classList.remove("unvisible");
//           Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    
//   }

//   if (photo?.hits.length !== 0) {

//     //   Notiflix.Notify.success(`Hooray! We found ${photo?.totalHits} images.`)

    //   loadMoreBtn.classList.remove("unvisible")
//   }
}

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore() {
  pageToFetch += 1;
    const data = await fetchImages(queryToFetch, pageToFetch);
    loadMoreBtn.classList.add('unvisible');
    createMarkup(data);
    const shownImages = data.hits.length * pageToFetch;
    if (shownImages <= data.totalHits || data.hits.length < imgToFetch) {
        loadMoreBtn.classList.add('unvisible'); 
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    } 
}

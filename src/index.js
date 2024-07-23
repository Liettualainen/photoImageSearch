import Notiflix from 'notiflix';
import { fetchSearchPhotos, StartingPage, perPage } from './js/pixabay'
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')
const searchImage = form.elements.searchQuery;
const submitbutton = form.querySelector('[type="submit"]');
const loadMoreButton = document.querySelector('.load-more')

let searchResult = "";
let totalImageAmount = "";
let Page = StartingPage;

loadMoreButton.addEventListener("click", (e) => {
  e.preventDefault();
  Page += 1;
  let balance = Page * perPage;
  if (balance < totalImageAmount) {
    fetchImages(searchResult, Page)
  }
  else {
    Notiflix.Notify.failure
    (`We're sorry, but you've reached the end of search results.`, {
    timeout: 3000, useIcon: true, width: '250px',},)
    loadMoreButton.style = "display: none";
  }
})

searchImage.addEventListener("input", (e) => {
  searchResult = e.target.value;
  gallery.innerHTML = "";
   loadMoreButton.style = "display: none";
    return searchResult;
});
submitbutton.addEventListener("click", (e) => { 
  e.preventDefault();
  if (searchResult !== "") {
      // console.log("button", searchResult);
    fetchImages(searchResult);
    searchResult = "";
  }
  else if (searchResult === "") {
    gallery.innerHTML = "";
      loadMoreButton.style = "display: none";
  }



});

async function fetchImages(searchResult, StartingPage)
{
  try {
    const imageList = await fetchSearchPhotos(searchResult, StartingPage);
    totalImageAmount = imageList.totalHits;
    if (imageList.totalHits > 0) {
          Notiflix.Notify.success(
          ` Hooray! We found ${imageList.totalHits} images.`,
         {
            timeout: 3000, useIcon: true, width: '250px',
         },)
      renderImages(imageList);
      searchResult = "";
    }
        else if  (imageList.totalHits === 0) {
          Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`,
         {
            timeout: 3000, useIcon: true, width: '250px',
         },)
     }
   
   } catch (error) {
    Notiflix.Notify.failure(`❌ Oops! Something went wrong!</p>Try reloading the page!`, {
      timeout: 2000, useIcon: false, width: '250px', position: 'left-top', distance: '10px',
    }, )
     console.log(error);
    }
    form.reset();
};

function renderImages(imageList) {
    console.log("totalhits",imageList)
  const imageRender = imageList.hits.map(({ largeImageURL, previewURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
        <a class="gallery__link"  href=${largeImageURL}>
            <img
            class="photo-img"
            src=${previewURL}
            alt=${tags}
            loading="lazy"
             />
        </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <b class="info-rearch">${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <b  class="info-rearch">${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:</b>
       <b  class="info-rearch"> ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: </b>
       <b  class="info-rearch">${downloads}</b>
    </p>
    </div>
</div>`;
  })
  loadMoreButton.style = "display: yes";
  gallery.innerHTML = imageRender.join(""); 

    const lightbox = new SimpleLightbox(`.gallery a`,
    {
      overlayOpacity: 0.9,heightRatio: 0.9, widthRatio: 0.9,
      captionType: "attr,",captionsData: "alt", captionPosition: 'bottom', captionDelay: 250,
     captionHTML:	true,
      scaleImageToRatio: true, scrollZoom: true, showCounter: false       
    });

}






  










//   fetchPostsInput.innerHTML = catList;
//     if (slimSelect.innerHTML !== "") {
//   const select= new SlimSelect({
//     select: document.querySelector('#slimSelect'),
//     settings: {
//     placeholderText: 'Search your cat`s feed',
//     showSearch: true,
//     searchText: 'Sorry nothing to see here',
//     searchPlaceholder: 'Search your cat`s feed',
//     searchHighlight: false,
//     closeOnSelect: true,
//     showOptionTooltips: false,
//   }})
//   }
// ✅
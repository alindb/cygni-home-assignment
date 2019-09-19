import '../css/main.scss';
import { createLoadingSkeleton, fetchWithTimeOut, clearChildren, setError, getPageHeight } from './helpers';
const urls = require('./urls');

function render() {
  createLoadingSkeleton();
  document.getElementById('searchForm').onsubmit = search;
  localStorage.clear();
  localStorage.perPage = 40;
  localStorage.currentPage = 1;
  localStorage.searchTerm = 'pga';
  if (!localStorage.getItem(localStorage.searchTerm)) {
    getImages();
  }
  else {
    setImages();
  }
}

window.onscroll = () => {
  const pageHeight = getPageHeight();
  if ((pageHeight - window.scrollY - window.innerHeight) < 350)
    getNextPage();
};

function search() {
  const input = document.getElementById('searchInput');
  clearChildren('feed');
  createLoadingSkeleton();
  localStorage.currentPage = 1;
  localStorage.searchTerm = input.value;
  if (!localStorage.getItem(input.value)) {
    getImages(input.value);
  }
  else {
    setImages(input.value);
  }
  input.value = "";
  return false;
}

function getImages(searchTerm = localStorage.searchTerm) {
  fetchWithTimeOut(urls.flickrSearchUrl(searchTerm))
  .then(resp => { if (resp !== "Error") return resp.text(); })
  .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
  .then(text => [...text.querySelectorAll('photo')])
  .then(html => html.map(photo => urls.photoUrl(photo)))
  .then(photos => {
    if (photos.length === 0) 
      setError();
    else
      addPhotos(photos);
  })
  .catch(error => console.log(error));
}

function addPhotos(photos) {
  const containers = document.querySelectorAll('.loading');
  for (let i = 0; i < containers.length; ++i) {
    const img = new Image();
    if (photos[i]){
      img.src = photos[i];
      containers[i].appendChild(img);
      containers[i].classList.remove('loading');
    }
    else {
      containers[i].remove();
    }
  }
  if (localStorage.getItem(localStorage.searchTerm)) {
    const oldCache = JSON.parse(localStorage.getItem(localStorage.searchTerm)).photos;
    const newCache = oldCache.concat(photos);
    localStorage.setItem(localStorage.searchTerm, JSON.stringify({photos: newCache, pages: localStorage.currentPage}));
  }
  else {
    localStorage.setItem(localStorage.searchTerm, JSON.stringify({photos, pages: localStorage.currentPage}));
  }
}

function setImages(searchTerm) {
  const containers = document.querySelectorAll('.container');
  const photos = JSON.parse(localStorage.getItem(searchTerm)).photos;
  const firstIndex = parseInt(localStorage.perPage)*(parseInt(localStorage.currentPage) - 1);
  const lastIndex = parseInt(localStorage.perPage)*parseInt(localStorage.currentPage);
  for (let i = firstIndex; i < lastIndex; ++i) {
    const img = new Image();
    if (photo[i]){
      img.src = photos[i];
      containers[i].appendChild(img);
      containers[i].classList.remove('loading');
    }
    else {
      containers[i].remove();
    }
  }
}

function getNextPage() {
  createLoadingSkeleton();
  let currentPage = parseInt(localStorage.currentPage);
  localStorage.currentPage = ++currentPage;
  const searchTerm = localStorage.searchTerm;
  if (localStorage.getItem(searchTerm) && 
      JSON.parse(localStorage.getItem(searchTerm)).pages >= parseInt(localStorage.currentPage)) {
    setImages(searchTerm);
  }
  else {
    getImages();
  }
}

render();

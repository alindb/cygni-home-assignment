const photoUrl = (photo) => {
  const {farm, server, id, secret} = photo.attributes;
  return `https://farm${farm.value}.staticflickr.com/` +
         `${server.value}/${id.value}_${secret.value}.jpg`;
}

const flickrSearchUrl = (searchTerm, perPage = localStorage.perPage, currentPage = localStorage.currentPage) => {
  return `https://www.flickr.com/services/rest/` +
         `?method=flickr.photos.search&api_key=2e7f71c9bd19e8cbc1cce65d346fa987` +
         `&text=${searchTerm}&per_page=${perPage}` +
         `&page=${currentPage}`;
}

module.exports = {photoUrl: photoUrl, flickrSearchUrl: flickrSearchUrl};

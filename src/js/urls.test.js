const urls = require('./urls');

test('Test photoUrl with empty strings as input.', () => {
  const res = urls.photoUrl({attributes: {farm: {value: ""}, server: {value: ""}, id: {value: ""}, secret: {value: ""}}});
  expect(res).toBe("https://farm.staticflickr.com//_.jpg");
});

test('Test photoUrl with valid input.', () => {
  const res = urls.photoUrl({attributes: {farm: {value: "12"}, server: {value: "1234"}, id: {value: "9"}, secret: {value: "abc123"}}});
  expect(res).toBe("https://farm12.staticflickr.com/1234/9_abc123.jpg");
});

test('Test flickrSearchUrl with empty strings as input.', () => {
  const res = urls.flickrSearchUrl("", "", "");
  expect(res).toBe("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2e7f71c9bd19e8cbc1cce65d346fa987&text=&per_page=&page=");
});

test('Test flickrSearchUrl with valid input.', () => {
  const res = urls.flickrSearchUrl("cool_pic", "40", "1");
  expect(res).toBe("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2e7f71c9bd19e8cbc1cce65d346fa987&text=cool_pic&per_page=40&page=1");
});

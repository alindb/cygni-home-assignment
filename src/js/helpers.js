export function createLoadingSkeleton(items = parseInt(localStorage.perPage)) {
  const feed = document.getElementById('feed');
  for (let i = 0; i < items; ++i) {
    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('loading');
    feed.appendChild(container);
  }
}

export function fetchWithTimeOut(url) {
  const FETCH_TIMEOUT = 5000;
  let didTimeOut = false;

  const response = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      didTimeOut = true;
      reject(new Error('Request timed out'));
    }, FETCH_TIMEOUT);
    
    fetch(url)
    .then(response => {
      clearTimeout(timeout);
      if(!didTimeOut) {
        resolve(response);
      }
    })
    .catch(function(err) {
      if (didTimeOut) return;
      reject(err);
    });
  })
  .catch(function(err) {
    console.log(err);
    return "Error";
  });
  return response;
}

export function setError() {
  clearChildren('feed');
  const feed = document.getElementById('feed');
  const error1 = document.createElement('h2');
  const error2 = document.createElement('h2');
  error1.classList.add('error');
  error2.classList.add('error');
  error1.innerHTML = "No images found.";
  error2.innerHTML = "Try another search term.";
  feed.appendChild(error1);
  feed.appendChild(error2);
}

export function clearChildren(parent_id) {
  const parent = document.getElementById(parent_id);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const getPageHeight = () => {
  const {body, documentElement} = document;
  return Math.max(body.scrollHeight, 
                  body.offsetHeight, 
                  documentElement.clientHeight, 
                  documentElement.scrollHeight, 
                  documentElement.offsetHeight);
}

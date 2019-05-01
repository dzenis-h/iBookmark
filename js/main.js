// Save Bookmark
const saveBookmark = e => {
  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null) {
    // Init array
    let bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
let bookmarks;

// Delete bookmark
const deleteBookmark = url => {
  // Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  bookmarks.map((bookmark, i) => {
    if(bookmark.url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  })
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
}


// Fetch bookmarks
const fetchBookmarks = () => {
  // Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  let bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
    // for (let i in bookmarks.length){
      // 0; i < bookmarks.length; i++){
      
      let sites = bookmarks.map((el, i) => {
        let name = el.name;
        let url =  el.url;
        
      return (
      `<div class="marketing well">
        <h3 class="float-left">${name}</h3>
        <a class="btn btn-success float-right px-2 mx-2" target="_blank" href=${url}>Visit</a>
        <a onclick="deleteBookmark(\'${url}\')" class="btn btn-danger float-right" href="#">Delete</a>
      </div>`
      )
    });

    document.getElementById('bookmarksResults').innerHTML = sites;
}

// Validate Form
const validateForm = (siteName, siteUrl) => {
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  const exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(exp);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
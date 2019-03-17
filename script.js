'use strict';

const searchURL = 'https://api.github.com/users/'


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i < responseJson.length; i++){
  $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}


function getRepos(searchTerm) {
  const url = searchURL + searchTerm + '/repos';
  console.log(url);
  const options = {
    headers: new Headers({
      "Accept": 'application/vnd.github.v3+json'})
  };
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-user-search').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
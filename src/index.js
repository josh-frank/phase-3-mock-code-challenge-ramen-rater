const ramenUrl = 'http://localhost:3000/ramens';
const ramenMenu = document.getElementById( "ramen-menu" );
const ramenDetail = document.getElementById( "ramen-detail" );
const ratingForm = document.getElementById( "ramen-rating" );
const deleteForm = document.getElementById( "delete-ramen" );
const newForm = document.getElementById( "new-ramen" );

function fetchRamens() {
    fetch( ramenUrl )
      .then( response => response.json() )
      .then( ramenData => {
        ramenData.forEach( ramen=> renderRamen( ramen ) );
        showRamen( ramenData[ 0 ].id );
      } );
}

function renderRamen( ramen ) {
  const thisImage = document.createElement( 'img' );
  thisImage.dataset.id = ramen.id;
  thisImage.dataset.name = ramen.name;
  thisImage.dataset.restaurant = ramen.restaurant;
  thisImage.dataset.rating = ramen.rating;
  thisImage.dataset.comment = ramen.comment;
  thisImage.src = ramen.image;
  thisImage.alt = ramen.name;
  ramenMenu.append( thisImage );
}

function showRamen( ramenId ) {
  const ramenToShow = document.querySelector( `img[data-id="${ ramenId }"]` );
  ramenDetail.querySelector( 'img' ).src = ramenToShow.src;
  ramenDetail.querySelector( 'h2' ).innerText = ramenToShow.dataset.name;
  ramenDetail.querySelector( 'h3' ).innerText = ramenToShow.dataset.restaurant;
  ramenDetail.dataset.id = ramenToShow.dataset.id;
  ratingForm.elements.rating.value = ramenToShow.dataset.rating;
  ratingForm.elements.comment.value = ramenToShow.dataset.comment;
  deleteForm.dataset.id = ramenToShow.dataset.id;
}

function updateRamen( formSubmission ) {
  formSubmission.preventDefault();
  const ramenToUpdateId = parseInt( ramenDetail.dataset.id );
  const ramenUpdate = {
    id: ramenToUpdateId,
    comment: formSubmission.target.elements.comment.value,
    rating:formSubmission.target.elements.rating.value
  };
  if ( ramenDetail.dataset.id ) {
    fetch( `${ramenUrl}/${ramenToUpdateId}`, { method: "PATCH", headers: { 'Content-Type':'application/json' }, body: JSON.stringify( ramenUpdate ) } )
      .then( response => response.json() )
      .then( updatedRamenData => {
        document.querySelector( `img[data-id="${ramenToUpdateId}"]` ).dataset.rating = updatedRamenData.rating;
        document.querySelector( `img[data-id="${ramenToUpdateId}"]` ).dataset.comment = updatedRamenData.comment;
      } );
  }
}

function createRamen( formSubmission ) {
  formSubmission.preventDefault();
  const newRamen = {
    name: formSubmission.target.elements[ 0 ].value,
    restaurant: formSubmission.target.elements[ 1 ].value,
    image: formSubmission.target.elements[ 2 ].value,
    rating: formSubmission.target.elements[ 3 ].value,
    comment: formSubmission.target.elements[ 4 ].value
  };
  fetch( ramenUrl, { method: "POST", headers: { 'Content-Type':'application/json' }, body: JSON.stringify( newRamen ) } )
  .then( response => response.json() )
  .then( newRamenData => {
    renderRamen( newRamenData );
    showRamen( newRamenData.id );
  } );
}

function deleteRamen( formSubmission ) {
  formSubmission.preventDefault();
  const ramenToDeleteId = formSubmission.target.dataset.id;
  fetch( `${ramenUrl}/${ramenToDeleteId}`, { method: "DELETE" } )
  .then( response => response.json() )
  .then( () => {
    document.querySelector( `img[data-id="${ ramenToDeleteId }"]` ).remove();
    ramenDetail.innerHTML = `<div id="ramen-detail"><img class="detail-image" src="./assets/image-placeholder.jpg" alt="Insert Name Here" /><h2 class="name">Insert Name Here</h2><h3 class="restaurant">Insert Restaurant Here</h3></div>`
  } );
}

document.addEventListener( 'DOMContentLoaded',function() {
  fetchRamens();
  ramenMenu.addEventListener( 'click', ramenClick => { if ( ramenClick.target.tagName === "IMG" ) { showRamen( ramenClick.target.dataset.id ) } } );
  ratingForm.addEventListener( 'submit', updateRamen );
  deleteForm.addEventListener( 'submit', deleteRamen );
  newForm.addEventListener( 'submit', createRamen );
} )

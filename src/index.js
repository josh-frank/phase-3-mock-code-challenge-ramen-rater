
const ramenUrl = 'http://localhost:3000/ramens'
const ramenMenu = document.getElementById("ramen-menu")
const ramenDetail = document.getElementById("ramen-detail")
const ramenRating = document.getElementById("ramen-rating")

function fetchRamens(){
    fetch(ramenUrl)
    .then(response => response.json())
    .then(data => data.forEach(ramen=> renderRamen(ramen)))
}

function renderRamen(ramen){

  const thisImage = document.createElement('img')
  thisImage.dataset.id = ramen.id
  thisImage.dataset.name = ramen.name
  thisImage.dataset.restaurant = ramen.restaurant
  thisImage.dataset.rating = ramen.rating
  thisImage.dataset.comment = ramen.comment
  thisImage.src = ramen.image
  thisImage.alt = ramen.name
  ramenMenu.append(thisImage)
  
}

function showRamen(ramenClick){
  
  if(ramenClick.target.tagName === "IMG"){

    ramenDetail.querySelector('img').src = ramenClick.target.src
    ramenDetail.querySelector('h2').innerText = ramenClick.target.dataset.name
    ramenDetail.querySelector('h3').innerText = ramenClick.target.dataset.restaurant
    ramenDetail.dataset.id = ramenClick.target.dataset.id
    ramenRating.elements.rating.value = ramenClick.target.dataset.rating
    ramenRating.elements.comment.value = ramenClick.target.dataset.comment
  }

}

function updateRamen(formSubmition){
 formSubmition.preventDefault()

 const ramenToUpdateId = parseInt(ramenDetail.dataset.id)
 const ramenUpdate = {id: ramenToUpdateId, comment: formSubmition.target.elements.comment.value, rating:formSubmition.target.elements.rating.value}
 
 if(ramenDetail.dataset.id){
   fetch(`${ramenUrl}/${ramenToUpdateId}`,{
    method:"PATCH",
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(ramenUpdate)
   })
   .then(response => response.json())
   .then(data => function(data){
    // document.querySelector(`img[data-id="${ramenToUpdateId}"]`).dataset.rating = data.rating
    // document.querySelector(`img[data-id="${ramenToUpdateId}"]`).dataset.comment = data.comment
    console.log(data)
   })
 }

}



document.addEventListener('DOMContentLoaded',function(){
  
    fetchRamens()
    ramenMenu.addEventListener('click',showRamen)
    ramenRating.addEventListener('submit', updateRamen)
})



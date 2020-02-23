let dogs = []
let selectedDogId = null;

function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(response => {
        renderDogs(response)
        dogs = response
    })
}



function renderDogs(dogs){
    let dogsTable = document.getElementById("table-body")
    console.log(dogs)
    let dogHtmlArr = dogs.map( dog => {
         return `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id = ${dog.id}>Edit</button></td></tr>`
    })
    dogsTable.innerHTML = dogHtmlArr.join("")
}



document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()

  document.addEventListener("click", function(event){
    if(event.target.innerText === "Edit" ){
        const foundDog = dogs.find(dog => dog.id === parseInt(event.target.id))
        selectedDogId = foundDog.id
        console.log(foundDog.name)
        const dogForm = document.getElementById("dog-form")
        dogForm.elements[0].value = foundDog.name 
        dogForm.elements[1].value = foundDog.breed 
        dogForm.elements[2].value = foundDog.sex 
    }
  })

  const dogForm = document.getElementById("dog-form")

  dogForm.addEventListener("submit", function(event){ 
    if( selectedDogId != null){
        const foundDog = dogs.find(dog => dog.id === parseInt(selectedDogId))
        console.log(foundDog)
        const updatedDog = {
            name: dogForm.elements[0].value, 
            breed: dogForm.elements[1].value,
            sex: dogForm.elements[2].value
        }
        fetch(`http://localhost:3000/dogs/${foundDog.id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedDog),
            headers: {
                'Content-Type' : "application/json"
            }
        })
    }
  })
})
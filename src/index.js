let dogsArr = []
let selectedId = null 

document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = 'http://localhost:3000/dogs'

    fetch(BASE_URL)
    .then (resp => resp.json())
    .then (dogs => {
        dogsArr = dogs
        addDog(dogs)
    })

    function addDog(dogs){
      const table  = document.getElementById('table-body')
      tableHTMLArr =  dogsArr.map(dog => {
        return ` <tr><td>${dog.name} </td><td>${dog.breed}</td> <td>${dog.sex}</td><td><button id= ${dog.id} data-purpose = 'edit'>Edit</button> </td></tr>`
      } )
      table.innerHTML = tableHTMLArr.join("")

    }

    
    document.addEventListener("click", function(event){
      const foundDog = dogsArr.find(dog => dog.id === parseInt(event.target.id))
      if(event.target.dataset.purpose === "edit"){
        const form = document.getElementById('dog-form')
        form.name.value = foundDog.name
        form.breed.value = foundDog.breed
        form.sex.value = foundDog.sex
      }
      
      let  form = document.getElementById('dog-form')
      
      form.addEventListener("submit", function(event){
        
        
        name = event.target.name.value
        breed = event.target.breed.value
        sex = event.target.sex.value
        updatedDog = {name: name, breed: breed, sex: sex}
        //console.log(updatedDog.name)
        console.log("found dog", foundDog)
        

            fetch(`http://localhost:3000/dogs/${foundDog.id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              accept: "application/json"
            },
            body: JSON.stringify(updatedDog)
          })
      
      })

    })  


})
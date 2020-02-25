document.addEventListener('DOMContentLoaded', () => {
 
fetch("http://localhost:3000/dogs")
.then(response => response.json())
.then(dogs => renderDogs(dogs))

document.addEventListener('click',function(event){
   if(event.target.className === "edit-button"){
    let dogId = event.target.parentNode.parentNode.dataset.id

   let form = document.getElementById("dog-form")
   form.setAttribute("data-id",dogId)
   let td = event.target.parentNode.parentNode.children
   form.name.value = td[0].innerText
   form.breed.value = td[1].innerText
   form.sex.value = td[2].innerText
   }

}) // closes edit event listener

document.addEventListener("submit", function(e){
    e.preventDefault()
    let form = document.getElementById("dog-form")
    fetch(`http://localhost:3000/dogs/${parseInt(form.dataset.id,10)}`, {
    method: "PATCH",
    headers: {"content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
    }) // closes body
}) // closes fetch

let dogId = parseInt(form.dataset.id,10)
let tr= document.querySelectorAll("tr")[dogId]
tr.innerHTML = `
<td>${form.name.value}</td> 
<td>${form.breed.value}</td> 
<td>${form.sex.value}</td> 
<td><button class = "edit-button" >Edit</button></td>
`
})// closes submit listener

}) // closes DOM

function renderDogs(dogs){
    dogs.forEach(dog => {
        let body = document.getElementById("table-body")
        body.innerHTML += `
        <tr data-id = ${dog.id}>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class = "edit-button" >Edit</button></td>
        </tr>`
    }) // for each loop
} // closes render dog
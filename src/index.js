fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(ele => populator(ele))

document.addEventListener('DOMContentLoaded', (e) => {
    let dogForm = document.getElementById('dog-form')
    document.querySelector("#dogTable").addEventListener("click", (e) => {
        if(e.target.className === "button"){
            fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
                .then(resp => resp.json())
                .then(ele => {console.log(ele)
                    dogForm.name.value = ele.name,
                    dogForm.sex.value = ele.sex,
                    dogForm.breed.value = ele.breed,
                    dogForm.dataset.id = ele.id
                })
        }
    })
    
    document.getElementById("submitButton").addEventListener("click", (e) =>{
        e.preventDefault()
        let id = e.target.parentNode.dataset.id
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {
                "accepts" : "application/json",
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                name: e.target.parentElement.name.value,
                sex: e.target.parentElement.sex.value,
                breed: e.target.parentElement.breed.value
            })
        })
        .then(res => res.json())
        .then(ele => {
            let foundDog = document.querySelector(`tr[dataset="${id}"]`)
            //console.log(foundDog.children)
            foundDog.children[0].innerText = e.target.parentElement.name.value
            foundDog.children[1].innerText = e.target.parentElement.breed.value
            foundDog.children[2].innerText = e.target.parentElement.sex.value
        })

        //console.log(k)
    })
    //document.querySelector("#dog-form")
    //document.querySelector("#").addEventListener()
})


function populator(ele){
    let table = document.querySelector("#dogTable")
    ele.forEach(i =>{
        let newRow = document.createElement("tr")
        newRow.setAttribute("dataset",i.id)
        newRow.innerHTML = `
        <td>${i.name}</td> 
        <td>${i.breed}</td> 
        <td>${i.sex}</td> 
        <td><button data-id=${i.id} class="button">Edit</button></td>
        `
        table.appendChild(newRow)
    })
}
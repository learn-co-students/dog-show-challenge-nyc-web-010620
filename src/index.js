let dogsArr = []

document.addEventListener('DOMContentLoaded', () => {
    
    fetch('http://localhost:3000/dogs').then(resp => resp.json())
            .then(dogs => {
                dogsArr = dogs;
                renderDogs(dogs)
            })
    })

    function renderDogs(dogs){
        dogs.forEach(dog => {
            let tBody = document.getElementById('table-body')
            let tr = document.createElement('tr')
            tr.id = dog.id
            tr.innerHTML = `<td> ${dog.name} </td> <td> ${dog.breed} </td> <td>${dog.sex}</td> <td><button class="edit" id="${dog.id}">Edit Dog</button>`
            tBody.append(tr)
        })
    }

    document.addEventListener('click', function(e){
        if (e.target.className === 'edit') {
            let editForm = document.getElementById('dog-form')
            editForm.dataset.id = e.target.id
            editForm.elements[0].value = e.target.parentNode.parentNode.children[0].innerText
            editForm.elements[1].value = e.target.parentNode.parentNode.children[1].innerText
            editForm.elements[2].value = e.target.parentNode.parentNode.children[2].innerText
        }
    }) 

    document.addEventListener('submit', function(e){
        let editForm = document.getElementById('dog-form')
        e.preventDefault()
        fetch(`http://localhost:3000/dogs/${parseInt(editForm.dataset.id)}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    "name": editForm.name.value,
                    "breed": editForm.breed.value,
                    "sex": editForm.sex.value
                }) 
            }).then(resp => resp.json()).then(updatedDog => {
                let oldDog = document.getElementById(`${editForm.dataset.id}`)
                oldDog.innerHTML = `<td> ${updatedDog.name} </td> <td> ${updatedDog.breed} </td> <td>${updatedDog.sex}</td> <td><button class="edit" id="${updatedDog.id}">Edit Dog</button>`
            })
        }) 
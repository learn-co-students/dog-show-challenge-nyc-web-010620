document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000/dogs'
    const tableBody = document.querySelector('#table-body')

    fetch(BASE_URL).then(response => response.json()).then(data => data.forEach(dog => {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td') 
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const editButton = document.createElement('button')

        td1.innerText = dog.name
        td2.innerText = dog.breed
        td3.innerText = dog.sex
        editButton.dataset.id = dog.id
        editButton.innerText = 'Edit Dog'
        td4.append(editButton)
        
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        tr.append(td4)
  
        tableBody.append(tr)  
    }))

    const inputElements = document.getElementsByTagName('input')
    
    document.addEventListener('click', event => {
        if (event.target.tagName === 'BUTTON') {
            const dogId = event.target.dataset.id
            const dogUrl = `http://localhost:3000/dogs/${dogId}`
            
            fetch(dogUrl).then(response => response.json()).then(data => {
                inputElements[0].value = data.name
                inputElements[1].value = data.breed
                inputElements[2].value = data.sex
                inputElements[0].dataset.id = dogId
            })
        }
    })

    document.addEventListener('submit', event => {
        event.preventDefault()
            
        let name = inputElements[0].value
        let breed = inputElements[1].value
        let sex = inputElements[2].value

        let bodyData = {
            name, 
            breed, 
            sex
        }
        
        const configObj = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(bodyData)
        }
        
        let dogId = document.querySelector('[data-id]')
        const dogUrl = `http://localhost:3000/dogs/${dogId.dataset.id}`
        
        return fetch(dogUrl, configObj)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error.message))
    })
})
let h1 = document.getElementById('h1')
let h2 = document.getElementById('h2')
let h3 = document.getElementById('h3')
var locationString = ''
var locationPhone = ''

h1.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.innerHTML = `
        <i class="la la-check text-success"></i>
    `
    h2.innerHTML = '<p class="text-warning">Select</p>'
    h3.innerHTML = '<p class="text-warning">Select</p>'

    locationString = "House 1"
    locationPhone = '+23490766534'
})

h2.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.innerHTML = `
        <i class="la la-check text-success"></i>
    `
    h1.innerHTML = '<p class="text-warning">Select</p>'
    h3.innerHTML = '<p class="text-warning">Select</p>'

    locationString = "House 2"
    locationPhone = '+23480644352'
})

h3.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.innerHTML = `
        <i class="la la-check text-success"></i>
    `
    h1.innerHTML = '<p class="text-warning">Select</p>'
    h2.innerHTML = '<p class="text-warning">Select</p>'

    locationString = "House 3"
    locationPhone = '+2348033458900'
})

//Prepare data for database
let database = {}
let submitAllBtn = document.getElementById('submitAllBtn')
let userDetailsForm = document.getElementById('userDetailsForm')
let userDetailsSubmitBtn = document.getElementById('userDetailsSubmitBtn')


submitAllBtn.addEventListener('click', (e => {
    e.preventDefault()
    database = {}
    //Get data from user details form
    let userDetailsFormData = new FormData(userDetailsForm)
    for (let key of userDetailsFormData.keys()) {
        database[key] = userDetailsFormData.get(key)
    }
    //Get storage location
    let residentialLocation = `${locationString}, ${locationPhone}`
    database['residentialLocation'] = residentialLocation

    console.log(database)

    // Send data to backend
    fetch('/residence', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(database)
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        let alertMessage = document.getElementById('alert')
        alertMessage.style.display = 'block'
        window.location.href = '#alert'
        setTimeout(() => {
            alertMessage.style.display = 'none'
        }, 5000)
    })
    .catch((err) => {
        console.log(err)
    })
    
}))

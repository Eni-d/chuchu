let list = document.getElementById('list')
let addBtn = document.getElementById('addBtn')
let itemField = document.getElementById('itemField')
let groupBtn = document.querySelector('.groupBtn')
let groupName = document.querySelector('.groupName')
let groupNameField = document.querySelector('.groupNameField')
let groupForm = document.getElementById('groupForm')
let l1 = document.getElementById('l1')
let l2 = document.getElementById('l2')
let l3 = document.getElementById('l3')
var locationString = ''
var locationPhone = ''

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let content = `
        <div id="item" class="p-1 mb-2 d-flex" style="justify-content: space-between;">
            <p class="m-0 p-0">${itemField.value}</p>
            <button class="btn text-danger" id="delBtn">X</button>
        </div>
    `
    list.innerHTML += content
    itemField.value = ''

    let delBtns = document.querySelectorAll('#delBtn')
    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener('click', (e) => {
            e.preventDefault()
            e.target.parentElement.remove()
            if (list.children.length == 0) {
                groupBtn.style.display = 'none'
                groupName.style.display = 'none'
                groupName.innerText = ''
            }
        })
    }

    if (list.children.length !== 0) {
        groupBtn.style.display = 'block'
        groupName.style.display = 'block'
    }
})

groupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    groupName.innerText = `Group Name: ${groupNameField.value}`
    groupNameField.value = ''
    groupName.style.borderBottom = 'solid 1px rgb(240, 160, 13)'
})

l1.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.innerHTML = `
        <i class="la la-check text-success"></i>
    `
    l2.innerHTML = '<p class="text-warning">Select</p>'
    l3.innerHTML = '<p class="text-warning">Select</p>'

    locationString = "St. Patrick's Church, Ugbowo road"
    locationPhone = '+23490766534'
})

l2.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.innerHTML = `
        <i class="la la-check text-success"></i>
    `
    l1.innerHTML = '<p class="text-warning">Select</p>'
    l3.innerHTML = '<p class="text-warning">Select</p>'

    locationString = "Uniben Mosque, Uniben Campus Ugbowo"
    locationPhone = '+23480644352'
})

l3.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.innerHTML = `
        <i class="la la-check text-success"></i>
    `
    l1.innerHTML = '<p class="text-warning">Select</p>'
    l2.innerHTML = '<p class="text-warning">Select</p>'

    locationString = "Dex Warehouse, Ugbowo road"
    locationPhone = '+2348033458900'
})

//Prepare data for database
let database = {
    items: []
}
let submitAllBtn = document.getElementById('submitAllBtn')
let userDetailsForm = document.getElementById('userDetailsForm')
let userDetailsSubmitBtn = document.getElementById('userDetailsSubmitBtn')


submitAllBtn.addEventListener('click', (e => {
    e.preventDefault()
    database = {
        items: []
    }
    
    //Get data from user details form
    let userDetailsFormData = new FormData(userDetailsForm)
    for (let key of userDetailsFormData.keys()) {
        if (userDetailsFormData.get(key) == '') {
            let alertMessage = document.getElementById('alertDanger')
            alertMessage.style.display = 'block'
            setTimeout(() => {
                alertMessage.style.display = 'none'
            }, 7000)
            window.location.href = '/storage'
        }
        database[key] = userDetailsFormData.get(key)
    }

    //Get items
    for (let i = 0; i < list.children.length; i++) {
        database.items.push(list.children[i].firstElementChild.innerText)
    }

    //Get group name
    let actualGroupName = groupName.innerText.split(':')
    if (actualGroupName[1] == '') {
            let alertMessage = document.getElementById('alertDanger')
            alertMessage.style.display = 'block'
            setTimeout(() => {
                alertMessage.style.display = 'none'
            }, 7000)
            window.location.href = '/storage'
    }
    database['groupName'] = actualGroupName[1]

    //Get storage location
    let storageLocation = `${locationString}, ${locationPhone}`
    database['storageLocation'] = storageLocation

    // console.log(database)

    //Send data to backend
    fetch('/storage', {
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
        setTimeout(() => {
            alertMessage.style.display = 'none'
        }, 5000)
    })
    .catch((err) => {
        console.log(err)
    })
    
}))

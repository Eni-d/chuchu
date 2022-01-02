let deleteBtns = document.querySelectorAll('#deleteBtn')

for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', (e) => {
        e.preventDefault()
        let body = {}
        body['surname'] = e.target.children[0].innerText
        body['firstname'] = e.target.children[1].innerText

        fetch(`/${e.target.children[2].innerText}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setTimeout(() => {
                window.location.href = '/residents'
            }, 1000)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    
}
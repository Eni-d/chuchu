$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

let password = document.getElementById('password')
let alertMessage = document.getElementById('alert')
let proceedBtn = document.getElementById('proceedBtn')

proceedBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (password.value == 'admin') {
    window.location.href = '/plans'
  } else {
    alertMessage.style.display = 'block'
    setTimeout(() => {
      alertMessage.style.display = 'none'
    }, 5000)
  }
})


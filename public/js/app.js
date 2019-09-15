const submitBtn = document.getElementById('searchBtn')
const locationInput = document.getElementById('addLocation')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    msg1.textContent = 'Fetching...'
    msg2.innerHTML = `<div class="spinner-border" role="status">
  </div>`
    fetch(`/weather?address=${locationInput.value}`).then((response) => {
        response.json().then((weather) => {
            if (weather.error) {
                msg1.textContent = weather.error
                msg2.textContent = ''
            } else {
                msg1.textContent = weather.location
                msg2.textContent = weather.forecast
            }
        })
    })
})
const submitBtn = document.getElementById('searchBtn')
const locationInput = document.getElementById('addLocation')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')

window.onload = alert('If location is not provided, website provides weather of current location.')

const responseFeeder = (response) => {
    response.json().then((weather) => {
        if (weather.error) {
            msg1.textContent = weather.error
            msg2.textContent = ''
        } else {
            msg1.textContent = weather.location
            msg2.textContent = weather.forecast           
        }
    })
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    msg1.textContent = 'Fetching...'
    msg2.innerHTML = `<div class="spinner-grow" role="status"></div>`
    if (locationInput.value == '') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                fetch(`/weather?longitude=${position.coords.longitude}&lattitude=${position.coords.latitude}`).then(response => responseFeeder(response));
            });
        }
    } else {
        fetch(`/weather?address=${locationInput.value}`).then(response => responseFeeder(response));
    }
})
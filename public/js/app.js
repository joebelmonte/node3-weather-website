const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then( (data) => {
            if (data.error){
                messageOne.textContent = 'There was an error'
                messageTwo.textContent = data.error
                return console.log('There was an error: ', data.error)
            }
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
            messageTwo.textContent = data.wind_speed
        })
    })
    
})
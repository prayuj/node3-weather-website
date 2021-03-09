const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const button = document.querySelector('button')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    button.disabled = true
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const query = search.value
    if (location === '') {
        console.log('Type something')
        button.disabled = false
        messageOne.textContent = ""
        messageTwo.textContent = "Type something"
    }
    else {
        fetch('/weather?address=' + query).then(response => {
            response.json().then(({ error, location, temperature, feelslike } = {}) => {
                if (error) {
                    messageOne.innerHTML = "Searched query: <b>" + query + "</b>"
                    messageTwo.textContent = error
                    console.log(error)
                }
                else {
                    messageOne.innerHTML = "Searched query: <b>" + query + "</b>"
                    messageTwo.innerHTML = `The Temperature for <b>${location}</b> is <b>${temperature} \u2103</b>  but it feels like <b>${feelslike} \u2103</b>.`
                }
                button.disabled = false
            })
        })
    }
})
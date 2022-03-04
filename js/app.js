const searchBtn = () => {
    const input = document.getElementById('input')
    const inputField = input.value.toUpperCase()
    url = `http://hp-api.herokuapp.com/api/characters`
    // const res = await fetch(url)
    // const data = await res.json()
    // console.log(data)

    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))

}
const displayResult = data => {
    console.log(data)
    const main = document.getElementById('main-container')

    for (const wizard of data) {
        console.log(wizard.name)
        console.log(wizard.image)
        const div = document.createElement('div')
        div.classList.add('main-display')
        div.innerHTML = `
        // <img src="${wizard.image}">
        <p>${wizard.name}</p>
        <p>${wizard.name}</p>
        `
        main.appendChild(div)
    }
}
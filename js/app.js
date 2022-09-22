const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');


const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// event listeners
window.addEventListener('DOMContentLoaded', () => init());

// bottom event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});


const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);



// 2761623527476614
const fetchAllSuperHero = async (searchText) => {
    let url = `https://hp-api.herokuapp.com/api/characters/house/${searchText}`
    try {
        const response = await fetch(url)
        allData = await response.json()
        if (allData.response === 'success') {
            // console.log(allData);
            showSearchList(allData.results)
        }
    } catch (error) {
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = ''
    data.forEach(dataItem => {
        const divElem = document.createElement('div')
        divElem.classList.add('search-list-item')
        divElem.innerHTML = `
            <img src="${dataItem.image.url ? dataItem.image.url : ''}" alt="">
            <p data-id='${dataItem.id}'>${dataItem.name}</p>
        `
        searchList.appendChild(divElem)
    })
}

searchForm.search.addEventListener('keyup', () => {
    if (searchForm.search.value.length > 1) {
        fetchAllSuperHero(searchForm.search.value)
    }
    else {
        searchList.innerHTML = ''
    }
})

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id
    console.log(searchId);
})


// const searchBtn = () => {
//     const input = document.getElementById('input')
//     const inputField = input.value.toUpperCase()
//     url = `http://hp-api.herokuapp.com/api/characters`
    // const res = await fetch(url)
    // const data = await res.json()
    // console.log(data)

//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayResult(data))

// }
// const displayResult = data => {
//     console.log(data)
//     const main = document.getElementById('main-container')

//     for (const wizard of data) {
//         console.log(wizard.name)
//         console.log(wizard.image)
//         const div = document.createElement('div')
//         div.classList.add('main-display')
//         div.innerHTML = `
//         // <img src="${wizard.image}">
//         <p>${wizard.name}</p>
//         <p>${wizard.name}</p>
//         `
//         main.appendChild(div)
//     }
// }
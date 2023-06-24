console.log('Hello world');

const URL = 'https://api.thecatapi.com/v1/images/search';

const catImg = document.querySelector('img');
const catButton = document.querySelector('button');
catButton.addEventListener('click', newCat);

async function newCat(){
    const res = await fetch(URL);
    const data = await res.json();

    catImg.src = data[0].url;
}

//con esta parte se muestra una imagen cuando se carga la página
fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });
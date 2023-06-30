const URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35';

const catImg1 = document.querySelector('.img1');
const catImg2 = document.querySelector('.img2');
const catImg3 = document.querySelector('.img3');
const newCatButton = document.querySelector('.newCatButton');
newCatButton.addEventListener('click', newCats);

async function newCats(){
    const res = await fetch(URL);
    const data = await res.json();

    console.log(data);
    catImg1.src = data[0].url;
    catImg2.src = data[1].url;
    catImg3.src = data[2].url;
}

//con esta parte se muestra una imagen cuando se carga la página
newCats();
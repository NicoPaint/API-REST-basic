const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35';
const API_URL_FAVORITE = "https://api.thecatapi.com/v1/favourites?limit=3&api_key=live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35"
const API_KEY = 'live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35';

const spanError = document.querySelector('#error');

const catImg1 = document.querySelector('.img1');
const catImg2 = document.querySelector('.img2');
const catImg3 = document.querySelector('.img3');

const favoriteButtons = document.querySelectorAll('.favorite')
favoriteButtons.forEach(button => button.addEventListener('click', saveFavoriteCats));

const newCatButton = document.querySelector('.newCatButton');
newCatButton.addEventListener('click', newCats);

async function newCats(){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log('Random');
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un erros ${res.status}`;
    }
    else {
        catImg1.src = data[0].url;
        catImg2.src = data[1].url;
        catImg3.src = data[2].url;
    }

}

async function loadFavoritesCats(){
    const res = await fetch(API_URL_FAVORITE);
    const data = await res.json();

    console.log('Favorites');
    console.log(data);

    console.log(res.status);

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
}

async function saveFavoriteCats(){
    const res = await fetch(API_URL_FAVORITE, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: "1hd"
        })
    });
    
    console.log('Save');
    console.log(res);
    
    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
    
    const data = await res.json();

}

//con esta parte se muestra una imagen cuando se carga la página
newCats();
loadFavoritesCats();
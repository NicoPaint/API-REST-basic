const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35';
const API_URL_FAVORITE = "https://api.thecatapi.com/v1/favourites?api_key=live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35";
const API_URL_FAVORITE_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/:${id}?api_key=live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35`;
const API_KEY = 'live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35';

const spanError = document.querySelector('#error');

const catImg1 = document.querySelector('.img1');
const catImg2 = document.querySelector('.img2');
const catImg3 = document.querySelector('.img3');

const favoriteButtons = document.querySelectorAll('.favorite')

const newCatButton = document.querySelector('.newCatButton');
newCatButton.addEventListener('click', newCats);

const favoriteSection = document.querySelector('.favoriteCats-cards-container');

async function newCats(){

    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    
    console.log('Random');
    console.log(data);
    
    
    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
    }
    else {
        catImg1.src = data[0].url;
        catImg2.src = data[1].url;
        catImg3.src = data[2].url;

        favoriteButtons.forEach((button, index) => button.onclick = () => saveFavoriteCats(data[index].id));
    }

}

async function loadFavoritesCats(){
    const res = await fetch(API_URL_FAVORITE);
    const data = await res.json();

    console.log('Favorites');
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
    else{
        favoriteSection.innerHTML = "";

        data.forEach(favoriteCat => {
            const img = document.createElement('img');
            img.alt = 'Foto de Gatito Favorito';
            img.src = favoriteCat.image.url;
    
            const btnText = document.createTextNode('Eliminar de favoritos');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.classList.add('buttonGreen')
    
            const div = document.createElement('div');
            div.classList.add('img-container');
    
            const article = document.createElement('article');
            article.classList.add('favoriteCat-card');
    
            div.appendChild(img);
            btn.appendChild(btnText);
            article.appendChild(div);
            article.appendChild(btn);
            favoriteSection.appendChild(article);
        })
    }
}

async function saveFavoriteCats(id){
    const res = await fetch(API_URL_FAVORITE, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    
    console.log('Save');
    console.log(res);
    
    const data = await res.json();
    console.log('sava data');
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
    else{
        console.log('Gato favorito guardado exitosamente!');
        loadFavoritesCats();
    }
    
}

/* async function deleteFavoriteCats(id){
    const res = await fetch(API_URL_FAVORITE_DELETE(id),
    {
        method: 'DELETE',
    })
    const data = await res.json();

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
    else{
        console.log('Gato eliminado exitosamente!');
    }
} */

//con esta parte se muestra una imagen cuando se carga la página
newCats();
loadFavoritesCats();
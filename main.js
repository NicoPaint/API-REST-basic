//Aqui van registrados todos lo end points que se usan en el proyecto
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVORITE = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVORITE_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const API_KEY = 'live_UhyG4bxBLmACFEMMq1LJPUbiuA2ZnMRTpEdKfLq9frYrWuomfpp6nl8AVBaJ0G35';

//Aca se seleccionan varios elementos del HTML
const spanError = document.querySelector('#error');

const catImg1 = document.querySelector('.img1');
const catImg2 = document.querySelector('.img2');
const catImg3 = document.querySelector('.img3');

const favoriteButtons = document.querySelectorAll('.favorite')

const newCatButton = document.querySelector('.newCatButton');
newCatButton.addEventListener('click', newCats);

const favoriteSection = document.querySelector('.favoriteCats-cards-container');

const formUpload = document.querySelector('#uploadingForm');

//Esta es lla funcion que carga imagenes aleatorias de la API en la sección de gatos aleatorios
async function newCats(){
    
    const res = await fetch(API_URL_RANDOM, {
        headers:{
            'x-api-key': API_KEY, 
        }
    });
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

//Esta es la funcion que renderiza las imagenes que han sido guardadas en favoritos.
async function loadFavoritesCats(){
    const res = await fetch(API_URL_FAVORITE, {
        headers: {
            'x-api-key': API_KEY,
        }
    });
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
            btn.classList.add('buttonGreen');
            btn.onclick = () => deleteFavoriteCats(favoriteCat.id);
            
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

//Esta es la función para guardar gatos de la sección aleatoria a la de favoritos
async function saveFavoriteCats(id){
    const res = await fetch(API_URL_FAVORITE, {
        method: 'POST',
        headers:{
            'x-api-key': API_KEY,
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

//Esta es la funcion para eliminar gatos de la sección de favoritos
async function deleteFavoriteCats(id){
    const res = await fetch(API_URL_FAVORITE_DELETE(id),
    {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY,
        }
    })
    const data = await res.json();
    
    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
    else{
        console.log('Gato eliminado exitosamente!');
        loadFavoritesCats();
    }
} 

//Esta es la funcion para subir las fotos a la API
async function uploadCatPhoto(){
    const formData = new FormData(formUpload);
    
    console.log(formData.get('file'));
    
    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
        },
        body: formData,  //la funcion fetch configura automaticamente el content-type cuando destecta que se va a mandar un form-data.
    })
    
    const data = await res.json();
    console.log(data.url);
    
    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`;
        console.log(res.status);
    }
}

//Lógica para la previsualización de la imagen que se va a subir
//se define la imagen por defecto cuando no se ha subido ninguna foto
const defaultFile = "https://img.freepik.com/vector-gratis/ilustracion-contorno-gato-diseno-plano_23-2149264418.jpg?t=st=1693267675~exp=1693268275~hmac=72b19cb16288f5e406a16ed60a7bd7cc27ac8e7bcb171b8a380a05fa053fa246";

//se traen el input tipo file y la imagen de previsualizacion 
const catFile = document.querySelector('#file');
const uploadingImg = document.querySelector('#uploadingImg');
const uploadingName = document.querySelector('#uploadingName');

//se agrega un event listener al input para que cada vez que cambie se ejecute la funcion preview
catFile.addEventListener('change', event => {previewPhoto(event)});

function previewPhoto(event){
    //aca se valida si el objetivo del evento, en este caso el input tipo file, capturó el archivo
    if(event.target.files[0]){
        console.log(event.target.files[0]);
        const reader = new FileReader();  //se instancia un objeto tipo FileReader para poder extraer la imagen y usarla como src. Esta función es asincrona.

        //El evento load ejecuta la logica escrita en el una vez que el FileReader haya procesado la imagen exitosamente.
        reader.onload = e => {
            uploadingImg.src = e.target.result;   //cambia la src de la imagend de previsualización por el resultado obtenido del objetivo del evento que en este caso es el mismo reader. e.target = reader.

            uploadingName.textContent = event.target.files[0].name; //Con esto se agrega el nombre del archivo que se esta previsualizando.
            
        };
        reader.readAsDataURL(event.target.files[0]);  //acá se le pasa el archivo (imagen) que va a procesar (leer) en formato de DataURL (base 64) que cuando sea procesada correctamente dispará el evento load del reader y ejecutará la lógica escrita en el.
    }
    //si no capturó nada se muestra la imagen por defecto definida anteriormente y no se muestra ningún nombre.
    else{
        uploadingImg.src = defaultFile;
        uploadingName.textContent = '';
    }
}


//con esta parte se muestra una imagen cuando se carga la página
newCats();
loadFavoritesCats()
//Si richiede di creare una logica per cui viene dimamicamente stampata in pagina una serie di foto una volta eseguita la chiamata AJAX all'API di JSON PLACEHOLDER.

// acquisizione endpoint

const endPoint = "https://jsonplaceholder.typicode.com/photos?_limit=6";


// richiamo nello script degli elementi in pagina necessari.

const cardsContainer = document.getElementById('cards-container');
const overlay = document.getElementById("overlay");
const overlayPhoto = document.getElementById("overlay-photo");
const overlayButton = document.getElementById("btn-close");




cardsContainer.innerHTML ='';


// eseguo la chiamata AJAX all'API data in consegna. Ed eseguo un ciclo forEach per cui, ciclando ogni Json ricevuto dalla chiamata tramite la funzione vado a destrutturarlo e utilizzando le sue proprietà stampare la carta in pagina.

axios.get(endPoint)
  .then(response =>{
    response.data.forEach(photo => printPhotoCard(photo))

    //clickablePhotos va definita all'interno del .then altrimenti a causa dell'asincronicità della risposta della chiamata all'API la nodelist del querySelectorAll non risulterà popolata dalle immagini ricevute.

    const clickablePhotos = document.querySelectorAll(".photocard");

    clickablePhotos.forEach(clickablePhoto =>{
      clickablePhoto.addEventListener('click', () =>{
        overlay.classList.remove('d-none');
        const photo = clickablePhoto.querySelector(".photo");
        overlayPhoto.src = photo.src
        
      })
    })

    overlay.addEventListener('click', (event)=>{
      if (event.target === overlay){
        overlay.classList.add("d-none");
      }
    })
  
  })


  .catch(error=>{
    console.log(error)
    cardsContainer.innerHTML = `          
    <div class="image-container"><img src="assets/img/faceslap.jpg" alt="faceslap"></div>
    <p class="fs-2 text-danger bg-black">SI STA VERIFICANDO UN PROBLEMA RISOLVEREMO QUANTO PRIMA</p>`

  })



  overlayButton.addEventListener('click',()=>{
    overlay.classList.add('d-none');
  })

// creo una funzione che permetta di destrutturare un oggetto nelle sue singole proprietà le quali potranno essere utilizzate per compilare il formato della card precedentemente creato in html. Nello specifico andremo ad utilizzare le proprietà definite come title url e thumbnailUrl.

function printPhotoCard(photo){
  const {title, url, id} = photo;
  cardsContainer.innerHTML += `      
  <div class="col d-flex justify-content-center">
        <div class="photocard">
          <div class="pin-image"><img src="assets/img/pin.svg" alt="pin"></div>
          <div class="image-container"><img class="photo" src=${url} alt="Photo ID:${id}"></div>
          <p class="text-container">${title}</p>
        </div>
      </div>`

}




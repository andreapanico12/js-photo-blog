//Si richiede di creare una logica per cui viene dimamicamente stampata in pagina una serie di foto una volta eseguita la chiamata AJAX all'API di JSON PLACEHOLDER.

// acquisizione endpoint

const endPoint = "https://jsonplaceholder.typicode.com/photos?_limit=6";


// richiamo nello script degli elementi in pagina necessari.

const cardsContainer = document.getElementById('cards-container');


cardsContainer.innerHTML ='';


// eseguo la chiamata AJAX all'API data in consegna. Ed eseguo un ciclo forEach per cui, ciclando ogni Json ricevuto dalla chiamata tramite la funzione vado a destrutturarlo e utilizzando le sue proprietà stampare la carta in pagina.

axios.get(endPoint)
  .then(response =>{
    response.data.forEach(photo => printPhotoCard(photo))
  })


  .catch(error=>{
    console.log(error)
    cardsContainer.innerHTML = `          
    <div class="image-container"><img src="assets/img/faceslap.jpg" alt="faceslap"></div>
    <p class="fs-2 text-danger bg-black">SI STA VERIFICANDO UN PROBLEMA RISOLVEREMO QUANTO PRIMA</p>`

  })

// creo una funzione che permetta di destrutturare un oggetto nelle sue singole proprietà le quali potranno essere utilizzate per compilare il formato della card precedentemente creato in html. Nello specifico andremo ad utilizzare le proprietà definite come title ed url.

function printPhotoCard(photo){
  const {title, url} = photo;

  cardsContainer.innerHTML += `      
  <div class="col d-flex justify-content-center">
        <div class="photocard debug">
          <div class="pin-image"><img src="assets/img/pin.svg" alt="pin"></div>
          <div class="image-container debug"><img src=${url} alt="placeholder"></div>
          <p class="text-container">${title}</p>
        </div>
      </div>`

}




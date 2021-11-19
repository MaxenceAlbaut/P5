
// Recupere l'id de la commande depuis l'url
let url = window.location.search
let urlParams = new URLSearchParams(url)
let orderId = urlParams.get('orderId')

let idTag = document.getElementById('orderId')

if (idTag){
    idTag.innerHTML = orderId
}
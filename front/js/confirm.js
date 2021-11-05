
let idTag = document.getElementById('orderId')

if (idTag){
    idTag.innerHTML = document.URL.split('?')[1]
}
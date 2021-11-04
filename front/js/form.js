// Objets qui seront envoyés a l'api
let contact = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
}
let products = []

// Eventlisteners des champs du formulaire - modifie les valeurs de l'objet contact
document.getElementById('firstName').addEventListener('change', function (event){
    contact.firstName = event.target.value
})
document.getElementById('lastName').addEventListener('change', function (event){
    contact.lastName = event.target.value
})
document.getElementById('address').addEventListener('change', function (event){
    contact.address = event.target.value
})
document.getElementById('city').addEventListener('change', function (event){
    contact.city = event.target.value
})
document.getElementById('email').addEventListener('change', function (event){
    contact.email = event.target.value
})

// Eventlistener du bouton d'envoi - vérification des données puis requete l'api
document.getElementById('order').addEventListener('click', function (event){

    // console.log(JSON.stringify({contact, products}))

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify({contact, products}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(function(res){
        console.log(res)
        localStorage.clear() // Suppression des articles dans le panier
        window.location.href = "./confirmation.html?" + res.data.orderId // Redirection vers la page de confirmation
    })
    .catch(function(err){
        console.log(err)
    });
})


function getProductIds (cart){
    let array = []
    for (let i = 0 ; i < cart.length ; i++){
        array.push(cart[i].id)
    }
    return array
}

let cart = JSON.parse(localStorage.getItem('product'))

if (cart){
    products = getProductIds(cart)
}



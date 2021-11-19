// Objets qui seront envoyés a l'api
let contact = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
}
let products = []

// Rempli un tableau avec les ids des produits du panier (envoyé ensuite a l'api)
function getProductIds (cart){
    let array = []
    for (let i = 0 ; i < cart.length ; i++){
        array.push(cart[i].id)
    }
    return array
}

// Vérification des champs du formulaire, affiche un message d'alerte si le champ est incorrecte
function verifyFormFields(contactObject, event){

    let isValid = true
    if(!/^[a-z ,.'-]+$/i.test(contactObject.firstName)){
        document.getElementById('firstNameErrorMsg').innerHTML = "Saisie de votre Prénom incorrecte"
        event.preventDefault()
        event.stopPropagation()
        isValid = false
    } else {
        document.getElementById('firstNameErrorMsg').innerHTML = ""
    }
    if (!/^[a-z ,.'-]+$/i.test(contactObject.lastName)){
        document.getElementById('lastNameErrorMsg').innerHTML = "Saisie de votre Nom incorrecte"
        event.preventDefault()
        event.stopPropagation()
        isValid = false
    } else {
        document.getElementById('lastNameErrorMsg').innerHTML = ""
    }
    if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(contactObject.address)){
        document.getElementById('addressErrorMsg').innerHTML = "Saisie de votre Adresse incorrecte"
        event.preventDefault()
        event.stopPropagation()
        isValid = false
    } else {
        document.getElementById('addressErrorMsg').innerHTML = ""
    }
    if (!/^[a-zA-Z]+$/.test(contactObject.city)){
        document.getElementById('cityErrorMsg').innerHTML = "Saisie de votre Ville incorrecte"
        event.preventDefault()
        event.stopPropagation()
        isValid = false
    } else {
        document.getElementById('cityErrorMsg').innerHTML = ""
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactObject.email)){
        document.getElementById('emailErrorMsg').innerHTML = "Saisie de votre Email incorrecte"
        event.preventDefault()
        event.stopPropagation()
        isValid = false
    } else {
        document.getElementById('emailErrorMsg').innerHTML = ""
    }
    return isValid
}

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

    let cart = JSON.parse(localStorage.getItem('product'))

    // Verification qu'il y a bien des produits a commander
    if (cart.length){
        products = getProductIds(cart)
    } else {
        window.alert("Votre panier est vide, vous ne pouvez passer commande.")
        return 0
    }

    // Si les champs du formulaire sont bon, passer la commande !
    if (verifyFormFields(contact, event)){
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify({contact, products}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(function(res){
                return res.json()
            })
                .then(function (data){
                    //localStorage.clear() // Suppression des articles dans le panier
                    window.location.href = "./confirmation.html?orderId=" + data.orderId // Redirection vers la page de confirmation
                })
                    .catch(function(err){
                        console.log(err)
                    });
    } else {
        return 0
    }
})

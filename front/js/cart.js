// Calcul du prix et de la qte total puis affichage
function totalPrice(cart){

    let total = [0, 0]

    for (let i = 0 ; i < cart.length ; i++){
        total[0] += cart[i].price * cart[i].quantity
        total[1] += parseInt(cart[i].quantity, 10)
    }
    document.getElementById('totalPrice').innerHTML = total[0]
    document.getElementById('totalQuantity').innerHTML = total[1]
}

// Affiche le tableau recapitulatif du panier et total qte/prix
function displayCart(cart){
    
    let cartSection = document.getElementById('cart__items')
    // Crer et insere les elements dans la section
    for (let i = 0 ; i < cart.length ; i++){
        let newItem = document.createElement('article')
        cartSection.appendChild(newItem)
        newItem.classList.add('cart__item')
        newItem.setAttribute("data-id", cart[i].id)
        newItem.innerHTML = `   <div class="cart__item__img">
                                    <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
                                    </div>
                                    <div class="cart__item__content">
                                        <div class="cart__item__content__titlePrice">
                                            <h2>${cart[i].name} (${cart[i].color})</h2>
                                            <p>${cart[i].price} €</p>
                                        </div>
                                    <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : ${cart[i].quantity}</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                    </div>
                                </div>`
    }
    totalPrice(cart) // Calcul et affichage du prix total
}

// Supprime tous les elements du tableau recapitulatif puis les re affiche
function refreshCart(cart){
    
    let cartItems = document.getElementsByTagName('article')
    for (let i = 0 ; i < cart.length ; i++){
        cartItems[0].remove()
    }
    displayCart(cart)
}

// Ecoute le changement de quantité des produits, modifie l'affichage HTML et le locastorage si changement
function listenCartQuantity(cart){

    let itemsQuantity = document.getElementsByClassName('itemQuantity')

    for (let i = 0 ; i < cart.length ; i++){

        //Listens to a change of quantity
        itemsQuantity[i].addEventListener('change', function (event){
            cart[i].quantity = event.target.value
            document.querySelectorAll('.cart__item__content__settings__quantity p')[i].innerHTML = `Qté : ${cart[i].quantity}`
            totalPrice(cart)
            localStorage.setItem("product", JSON.stringify(cart))
        })
    }
}

// Ecoute le click des boutons de suppression d'un produit
function listenCartDelete(cart){

    let itemsDeleteButton = document.getElementsByClassName('deleteItem')

    for (let i = 0 ; i < cart.length ; i++){
        
        itemsDeleteButton[i].addEventListener('click', function(){ // Si supression

            // Suppression de l'element HTML
            itemsDeleteButton[i].closest('article').remove()
            // Suppression de l'element dans le panier
            cart.splice(i, 1)
            
            // Rafraichissement du tableau recapitulatif
            refreshCart(cart)

            // Re assignations des listeners pour la quantité sur le nouveau panier
            listenCartQuantity(cart)

            // Update localstorage
            localStorage.setItem("product", JSON.stringify(cart))
            return listenCartDelete(cart) // Re assignations des listeners pour les boutons de supression sur le nouveau panier
        })
    }
}

// Ordonne un tableau d'objet ayant une propriété 'id' en fonction de cette dernière
function sortCart(array){

    array.sort(function(a, b){
        
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
    });
}

function main(){

    let cart = JSON.parse(localStorage.getItem('product'))

    if (cart){
        sortCart(cart) // Ordonne le panier
        displayCart(cart) // Affiche le recapitulatif du panier a partir du localstorage

        // Ecoute les modifications (changement de qte et suppression)
        listenCartQuantity(cart)
        listenCartDelete(cart)
    }
   
}

main()


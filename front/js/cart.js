function totalPrice(cart){

    let total = [0, 0]

    for (let i = 0 ; i < cart.length ; i++){
        total[0] += cart[i].price * cart[i].quantity
        total[1] += parseInt(cart[i].quantity, 10)
    }
    document.getElementById('totalPrice').innerHTML = total[0]
    document.getElementById('totalQuantity').innerHTML = total[1]
}

function displayCart(cart){
    
    let cartSection = document.getElementById('cart__items')

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
                                            <h2>${cart[i].name}</h2>
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

    totalPrice(cart)
}

function refreshCart(cart){
    
    let cartItems = document.getElementsByTagName('article')
    for (let i = 0 ; i < cart.length ; i++){
        cartItems[0].remove()
    }
    displayCart(cart)
}

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

function listenCartDelete(cart){

    let itemsDeleteButton = document.getElementsByClassName('deleteItem')

    for (let i = 0 ; i < cart.length ; i++){
        
        itemsDeleteButton[i].addEventListener('click', function(){

            itemsDeleteButton[i].closest('article').remove()
            cart.splice(i, 1)
            
            refreshCart(cart)
            listenCartQuantity(cart)
            localStorage.setItem("product", JSON.stringify(cart))
            return listenCartDelete(cart)
        })
    }
}

function main(){

    let cart = JSON.parse(localStorage.getItem('product'))
    displayCart(cart)

    listenCartQuantity(cart)
    listenCartDelete(cart)
}

main()


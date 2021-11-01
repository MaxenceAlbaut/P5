let selectedColor = undefined
let selectedQuantity = undefined

// Cherche le produit en comparant l'id de l'url (pId) aux _id des elements de array[]
function findProduct(array, pId){
    // PARCOURIR le tableau des produits
    // SI la valeur de array[j]._id correspond a pId (productId)
    // ALORS on crer les elements a inserer

    for (let j = 0 ; j < array.length ; j++){
        if (array[j]._id == pId){
            /*
            let pageArt = document.createElement('article')
            let item = document.getElementsByClassName("item")[0]
            item.appendChild(pageArt)
            */
           return array[j]
        }
    }
}

// Crée le code HTML des options de couleurs qui sera inséré par addProduct() avec .innerHTML
function createColorOptions (array){
    let htmlTxt = ""
    for (let k = 0 ; k < array.colors.length ; k++){
        htmlTxt += `<option value="${array.colors[k]}">${array.colors[k]}</option>`
    }
    return htmlTxt
}

// Ajoute les elements du produit (array) dans la page via .innerHTML
function displayProduct(array, colorOptions){
    let item = document.getElementsByClassName("item")[0]
    item.innerHTML = `<article>
                        <div class="item__img">
                            <img src="${array.imageUrl}" alt="${array.altTxt}">
                        </div>

                        <div class="item__content">
                            <div class="item__content__titlePrice">
                                <h1 id="title">${array.name}</h1>
                                <p>Prix : <span id="price">${array.price}</span>€</p>
                            </div>

                            <div class="item__content__description">
                                <p class="item__content__description__title">Description :</p>
                                <p id="description">${array.description}</p>
                            </div>

                            <div class="item__content__settings">
                                <div class="item__content__settings__color">
                                <label for="color-select">Choisir une couleur :</label>
                                <select name="color-select" id="colors">
                                    <option value="">--SVP, choisissez une couleur --</option>
                                    ${colorOptions}
                                </select>
                                </div>

                                <div class="item__content__settings__quantity">
                                <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                                <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                                </div>
                            </div>

                            <div class="item__content__addButton">
                                <button id="addToCart">Ajouter au panier</button>
                            </div>
                        </div>
                    </article>`
}

// Vérifie si le produit est deja présent dans le panier
function isAlreadyStored(storedProducts, product)
{
    for (let l = 0 ; l < storedProducts.length ; l++){
        if (storedProducts[l].id == product.id && storedProducts[l].color == product.color){
            storedProducts[l].quantity = parseInt(storedProducts[l].quantity, 10) + parseInt(product.quantity, 10)
            localStorage.setItem("product", JSON.stringify(storedProducts))
            return 1 // Produit trouvé dans le panier
        }
    }
    return 0 // Produit non présent dans le panier
}

// Ajoute le produit au panier
function add2Cart(product){

    let storedProducts = JSON.parse(localStorage.getItem('product'))

    if (storedProducts){
        
        if (isAlreadyStored(storedProducts, product)){
            // updated quantity
        } else {
            // add product
            storedProducts.push(product) // Insere le nouveau produit dans le tableau
            localStorage.setItem("product", JSON.stringify(storedProducts)) // Re-initialise la valeure de la clé 'product'
        }
        
    } else{
        // AJOUT DU PRODUIT DANS LE PANIER (storedProducts)
        storedProducts = []
        storedProducts.push(product) // Insere le nouveau produit dans le panier
        localStorage.setItem("product", JSON.stringify(storedProducts)) // Re-initialise la valeure de la clé 'product'
    }
    console.log("cart updated : \n" + JSON.stringify(storedProducts))
}

function main(articleArray){

    console.log("main")

    // Recupere l'id du produit depuis l'url
    let productUrl = window.location.search
    let urlParams = new URLSearchParams(productUrl)
    let productId = urlParams.get('id')

    // Affiche le produit trouvé grace a son id
    let pageProduct = findProduct(articleArray, productId)
    let productColors = createColorOptions(pageProduct)
    displayProduct(pageProduct, productColors)

    console.log(pageProduct.imageUrl)


    // ECOUTER 'change' sur le <select> id='colors'
    // ECOUTER 'change' sur le <input> id='quantity'
    // ECOUTER 'click' sur <button> id='addToCart' 

    let colorSelector = document.getElementById('colors')
    colorSelector.addEventListener('change', function(event){
        selectedColor = event.target.value
    })

    let quantitySelector = document.getElementById('quantity')
    quantitySelector.addEventListener('change', function(event){
        selectedQuantity = event.target.value
    })

    let button = document.getElementById('addToCart')
    button.addEventListener('click', function(event){
        let selectedProduct = {
            id : productId,
            color: selectedColor,
            quantity: selectedQuantity,
            price: pageProduct.price,
            imageUrl: pageProduct.imageUrl,
            alt: pageProduct.altTxt,
            name: pageProduct.name
        };
        add2Cart(selectedProduct)
    })
}

// Récupération des données et appelle la fonction main() en lui passant en parametre la le retour de la requete
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(data => main(data))
console.log("afterfetch")

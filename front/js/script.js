/*

fetch('http://localhost:3000/api/products/')
    .then(response => response.json())
    .then(data => console.log(data))

**/ /* CODE EQUIVALENT : */ /*

fetch('http://localhost:3000/api/products/')
    .then(function (response) {
        return response.json()
        }).then(function (data) {
            console.log(data)
        })
        
*/

console.log("hello world")

// Ajoute les articles a la page d'accueil dans la section qui a pour id 'items' ////////////
function addArticles(array, id){
    for (let i = 0 ; i < array.length ; i++){
        
        // Creation et insertion des elements a intégrer dans le HTML

        // Creation de <a>
        let newATag = document.createElement('a')
        let newUrl = "./product.html?id=" + array[i]._id
        newATag.setAttribute('href', newUrl)
        document.getElementById(id).appendChild(newATag)

        // Creation de <article>
        let newArt = document.createElement('article')
        newATag.appendChild(newArt)

        // Creation de <img>
        let newImg = document.createElement('img')
        newImg.setAttribute('src', array[i].imageUrl)
        newImg.setAttribute('alt', array[i].imageUrl)
        newArt.appendChild(newImg)

        // Creation de <h3>
        let newTitle = document.createElement('h3')
        newTitle.classList.add('productName')
        newTitle.innerHTML = array[i].name
        newArt.appendChild(newTitle)

        // Creation de <p>
        let newDesc = document.createElement('p')
        newDesc.classList.add('productDescription')
        newDesc.innerHTML = array[i].description
        newArt.appendChild(newDesc)
    }
}


// Récupération des données et appelle de la fonction addArticles() en lui passant en parametre le retour de la requete
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(data => addArticles(data, 'items'))
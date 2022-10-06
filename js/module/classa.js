/***************
 * Class dessin*
 ***************/

/** 
*Initialisation du canvas
*/
  
let canvas = document.querySelector("#my-canvas");
let context = canvas.getContext("2d");
    
    // Couleur du trait
context.strokeStyle = "black";
colorSelected();

    // Epaisseur du trait
let epaisseur = context.lineWidth = 5;

/**
 * Initialisation des variables
 */

    // Les coordonnees de départ
let depX;
let depY;

    // les coordonnees d'arrivée
let destX;
let destY;

    // Si le dessin est activ ou non (true=actf; false = non  actif)
let sketch = false;

/**
 * Recuperation des mouvements de la souris pour le dessin
 */

    // je recupere les coordonnees de départ quand j'appuie sur la souris et je rends le dessin actif

canvas.addEventListener("mousedown", (e)=>{
    console.log(e);
     depX = e.offsetX;
     depY = e.offsetY;
     sketch = true;
})

// Fonction dessiner, Coordonnees de départ et d'arriver.
//J'ouvre un chemin, donne les coordonées de départ, donne les coordonnees d'arrivee, ferme le chemin, trace le trait

function draw(depX, depY, destX, destY){
    context.beginPath()
    context.moveTo(depX, depY)
    context.lineTo(destX, destY)
    context.closePath()
    context.stroke()


}

    // je dessine quand la souris bouge et si le bouton de la souris est enfoncé, fonction draw()-> Recupere les coordonnées de départ, les coordonnées d'arrivée. Et j'attribue les coordonnées d'arrivées aux nouvelles coordonnees de départ.

canvas.addEventListener("mousemove", (e)=>{
    if(sketch){
    destX = e.offsetX;
    destY = e.offsetY;
    draw(depX, depY, destX, destY );
    depX = destX;
    depY = destY;
    }
})

    //J'arrete de dessiner quand la souris n'est plus enfoncée

document.addEventListener("mouseup", ()=>{
    sketch = false;
})

//Je recupere les coordonnes quand la souris rentre sur le canvas et les passe en coordonnes de départs
// Evite les traits moches quand on sort et rentre du canvas avec le bouton enfoncé
canvas.addEventListener("mouseover", (e)=>{

    if(sketch){
        depX = e.offsetX;
        depY = e.offsetY;
    }
})

/***************
 * Les outils
 **************/



// Changement de l'épaisseur du trait
let thickness = document.querySelectorAll(".thickness-btn");

thickness.forEach(element=>{
    element.addEventListener("click", ()=>{
        context.lineWidth = element.dataset.trait;
        document.querySelector(".thickness-btn.active").classList.remove("active");
        element.classList.add("active");
        
    })
})

// Changement de la couleur sur trait

let colorSelect = document.querySelectorAll(".color-btn")

colorSelect.forEach(element=>{
    element.addEventListener("click", ()=>{
        context.strokeStyle =element.dataset.color;
        colorSelected()

        document.querySelector(".color-btn.active").classList.remove("active");
        element.classList.add("active");
        
    })
})
// Color picker


let colorPicker = document.querySelector("#color_picker");

    // Permet de recuperer la couleur selectionnée du picker
colorPicker.addEventListener("input", (e)=>{
context.strokeStyle = e.target.value;
colorSelected()
});

    //eviter que le picker ne reagisse si on touche pas la couleur
colorPicker.addEventListener("click", (e)=>{
context.strokeStyle = e.target.value;
colorSelected()
});

// La couleur selectionnee apparait dans le carré

function colorSelected(){

let colorSelected = document.querySelector(".color-selected")
colorSelected.style.backgroundColor = context.strokeStyle;
}

// le bouton erase

let eraseBtn = document.querySelector(".erase-btn");
eraseBtn.addEventListener("click", ()=>{
    erase();
})

// La fonction effacer le canvas
function erase(){

context.clearRect(0,0, canvas.width, canvas.height);

}

/***************
 * Le formulaire
 ***************/

// Apparation du formulaire

let formEnable = document.querySelector(".mail-btn")
let form = document.querySelector("#my-form");

formEnable.addEventListener("click", ()=>{
    form.classList.toggle("active");
})

//Fermeture du formulaire

let formDisable = document.querySelector(".close-btn")
formDisable.addEventListener("click", ()=>{
    form.classList.remove("active");

})

// Passer l'image en hidden avec le form
// Envoi en ajax

let imageForm = document.querySelector("#image");

form.onsubmit = (e) => {
    e.preventDefault();
    form.classList.remove("active");
    spinner.classList.add("active");

    const dataURL = canvas.toDataURL();
    imageForm.value = dataURL;
    let data = new FormData(form);
    console.log(dataURL);



    fetch("http://localhost/canvas/send.php", {
        method : 'POST',
        body : data
    }).then(response=>{
        console.log(response);
        return response.json();

    }).then(message=>{
        console.log(message);
        spinner.classList.remove("active");
        /*alert(message.succes);*/
        if(message.error){throw new Error(message.error)}
        validationp.textContent = message.succes;
        validation.classList.add("active");
    }).catch(e=>{
        console.error(e.message);
        alert("une erreur est survenue")
    });

}

// load spinner

let spinner = document.querySelector(".spinner-enable");
let validation = document.querySelector(".validation")
let validationp = document.querySelector(".validation p")
validationp.addEventListener("click", ()=>{
    validation.classList.remove("active");
    validationp.textContent = "";
})
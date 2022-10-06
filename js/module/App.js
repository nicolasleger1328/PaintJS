import {Painter} from "./Painter.js"
import {Form} from "./Form.js"

export class App {
    constructor() {

        /**
         * Instantiation d'un objet Painter()
         */
        this.painter = new Painter();
  
        
        /**
         * Instatiation d'un objet Form()
         */
        this.form = new Form();

        this.colorSelected = document.querySelector(".color-selected")
        // this.form = document.querySelector("#my-form");
        this.formEnable = document.querySelector(".mail-btn");
        
        /**
         * Installation du gestionnaire d'evenement au click sur les boutons couleurs // gere aussi la gomme
         */
        document.querySelectorAll('.color-btn').forEach(button => {
            button.addEventListener('click', this.onClickColorButton.bind(this));
        });
        
        /**
         * Installation du gestionnaire d'evenement au click sur les boutons epaisseur
         */
        document.querySelectorAll('.thickness-btn').forEach(button => {
            button.addEventListener('click', this.onClickThicknessButton.bind(this));
        });
        
        /**
         * Installation du gestionnaire d'evenement au click sur le bouton effacer
         */
        document.querySelector(".erase-btn").addEventListener("click", this.onClickEraseButton.bind(this));
        
        /**
         * Installation du gestionnaire d'evenement au click sur le bouton colorPicker
         */
        document.querySelector("#color_picker").addEventListener("click", this.onClickPickerButton.bind(this));
        
        /**
         * Installation du gestionnaire d'evenement au input sur le bouton colorPicker
         */
         document.querySelector("#color_picker").addEventListener("input", this.onInputPickerButton.bind(this));

         /**
          * Installation du gestionnaire d'evenement au bouton "envoyer e-card" pour faire apparaitre le formulaire
          */
          this.formEnable.addEventListener("click", this.form.formActive.bind(this.form));

        /**
          * Installation du gestionnaire d'evenement au bouton "Fermer" pour faire disparaitre le formulaire
          */
         document.querySelector(".close-btn").addEventListener("click", this.form.formDisable.bind(this.form));

        /**
          * Installation du gestionnaire d'evenement au bouton envoyer le formulaire
          */
        // document.querySelector("#my-form").addEventListener("submit", this.sendMail.bind(this));
        document.querySelector("#my-form").addEventListener("submit", (e)=>{
            e.preventDefault();
            this.form.sendMail(this.painter.canvas);
        });



    }

    // sendMail(e){
    //     e.preventDefault();
    //     this.form.sendMail(this.painter.canvas);
    // }

    /**
     * Selection de la couleur en cliquant sur le color picker
     * Application de la couleur au trait avec la methode setColor de la classe Painter
     * Remplissage de la case de la couleur active
     * @param {event} e 
     */
    onClickPickerButton(e){
        this.painter.setColor(e.target.value);
        this.addColorSelected();
    }
    
    /**
     * Selection de la couleur en  selectionnant sur le color picker
     * Application de la couleur au trait avec la methode setColor de la classe Painter
     * Remplissage de la case de la couleur active
     * @param {event} e 
     */
    onInputPickerButton(e){
        this.painter.setColor(e.target.value);
        this.addColorSelected();
    }

    /**
     * Selection de la couleur en passant par les Dataset
     * Application de la couleur au trait avec la methode setColor de la classe Painter
     * Remplissage de la case de la couleur active
     * Selection du bouton couleur activé
     * @param {event} e 
     */
    onClickColorButton (e) {
        const color = e.currentTarget.dataset.color;
        this.painter.setColor(color);
        this.addColorSelected();
        document.querySelector(".color-btn.active").classList.remove("active");
        e.currentTarget.classList.add("active");


    }
    /**
     * Selection de l'épaisseur en passant par les Dataset
     * Application de l'épaisseur au trait avec la methode setThickness de la classe Painter
     * Selection du bouton epaisseur activé
     * @param {event} e 
     */
    onClickThicknessButton(e){
        const thickness = e.currentTarget.dataset.thickness;
        this.painter.setThickness(thickness);
        document.querySelector(".thickness-btn.active").classList.remove("active");
        e.currentTarget.classList.add("active");


    }
    /**
     * Selection de la gomme
     * @param {event} e 
     */
    onClickEraserButton(e){
        const color = e.currentTarget.dataset.color;
        this.painter.setColor(color);
        this.colorSelected();
        document.querySelector(".color-btn.active").classList.remove("active");
        e.currentTarget.classList.add("active");
    }

    /**
     * Permet de mettre la couleur active dans le carré
     */
    addColorSelected(){
        this.colorSelected.style.backgroundColor = this.painter.getContextColor();
        }
        


    /**
     * Efface le dessin en appellant la methode erase de la clase painter
     */
    onClickEraseButton(){
        this.painter.erase();
    }


  }
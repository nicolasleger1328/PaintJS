export class Painter{


    constructor(){

        /** 
        * Initialisation du canvas
        */
        this.canvas = document.querySelector("#my-canvas");
        this.context = this.canvas.getContext("2d");

        /**
         * Initialisation a False de la variable dessin; Si le dessin est activ ou non
         */
        this.sketch = false;
        /**
         * Initialisation des coordonnées de départ
         */
        this.depX = null;
        this.depY = null;
        /**
         * Initialisation des coordonnées d'arrivée
         */
        this.destX = null;
        this.destY = null;

        this.init();
        

    }

    init(){

        /**
         * Initialisation de l'epaisseur et la couleur du trait
         */
        this.context.strokeStyle = "black";
        this.context.lineWidth = 5 ;
          
        /**
         * Initialisation du fond en blanc
         */
        this.whiteBackgrd();

        /**
         * Initialisation de la forme du dessin (round : Arrondit les coins d'une forme en remplissant un zone supplémentaire centré sur le point final commun des segments connectés)
         */
        this.context.lineJoin = 'round';

        // Installation du gestionnaire d'événement au click sur le canvas
        //this.canvas.addEventListener('click', this.onClickCanvas.bind(this));
        this.canvas.addEventListener("mousedown", (e)=>{
             this.depX = e.offsetX;
             this.depY = e.offsetY;
             this.sketchOn();
        })

        document.addEventListener("mouseup", ()=>{
            this.sketchOff();
        })
        
        this.canvas.addEventListener("mousemove", (e)=>{
            if(this.sketch){
            this.destX = e.offsetX;
            this.destY = e.offsetY;
            this.draw(this.depX, this.depY, this.destX, this.destY );
            this.depX = this.destX;
            this.depY = this.destY;
            }
        })

        this.canvas.addEventListener("mouseover", (e)=>{

            if(this.sketch){
                this.depX = e.offsetX;
                this.depY = e.offsetY;
            }
        })
        

    }

 

    draw(depX, depY, destX, destY){
        
        this.context.beginPath()
        this.context.moveTo(depX, depY)
        this.context.lineTo(destX, destY)
        this.context.closePath()
        this.context.stroke()
    
    
    }
    /**
     * Initialise le fond blanc
     */
    whiteBackgrd(){
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Efface le dessin
     */
    erase(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.whiteBackgrd();
    }

    sketchOn(){
       return this.sketch = true;
    }

    sketchOff(){
       return this.sketch = false;
    }

    setColor(color){

        this.context.strokeStyle = color;
    }

    setThickness(thickness){

        this.context.lineWidth = thickness;
    }
    getContextColor(){
        return this.context.strokeStyle;
    }
}
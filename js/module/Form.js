
export class Form{

    constructor(){  

        this.canvas = document.querySelector("#my-canvas");
        this.form = document.querySelector("#my-form");
        this.imageForm = document.querySelector("#image");
        this.spinner = document.querySelector(".spinner-enable");
        this.validation = document.querySelector(".validation")
        this.validationp = document.querySelector(".validation p")

        this.init()
    }

    init(){

        this.validationp.addEventListener("click", ()=>{
        this.validation.classList.remove("active");
        this.validationp.textContent = "";
        })
    }

    // Apparation du formulaire
    formActive(){

        this.form.classList.toggle("active");
    };

    // fermeture du formulaire
    formDisable(){

        this.form.classList.remove("active");
    }

    //Envoi du mail
    sendMail(canvas){
            
            
        this.form.classList.remove("active");
        try{
            const dataURL = canvas.toDataURL();
            this.imageForm.value = dataURL;
            const data = new FormData(this.form);
            this.spinner.classList.add("active");
    
            fetch("http://localhost/canvas/send.php", {
                method : 'POST',
                body : data
            }).then(response=>{
                console.log(response);
                return response.json();
        
            }).then(message=>{
                console.log(message);
                this.spinner.classList.remove("active");
                if(message.error){throw new Error(message.error)}
                this.validationp.textContent = message.succes;
                this.validation.classList.add("active");
                this.form.reset();
            }).catch(e=>{
                console.error(e.message);
                alert("une erreur est survenue")
            });
        }
        catch(e){
            this.validationp.textContent = "une erreur est survenue";
            this.validation.classList.add("active");
            return;
            
        }
    }
        
}

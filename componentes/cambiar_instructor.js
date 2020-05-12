var CambiarInstructor = Vue.component('CambiarInstructor', {
    data: function (){// Declaración de la Data
        return{
            errores: [],
            nombres: null,
            apellidos: null,
            genero: null,
            telefono: null,
            email: null
        }
    },

    //Aquí comienza nuestro template
    template: `
        <div>
            <p v-if="errores.length">
                <b>Por favor, corrija el(los) siguiente(s) error(es): </b>
                <ul>
                    <li v-for="error in errores" style="color: red;">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="nombres">Nombres</label>
                <input id="nombres" v-model="nombres" type="text">
            </p>

            <p>
                <label for="apellidos">Apellidos</label>
                <input id="apellidos" v-model="apellidos" type="text">
            </p>

            <p>
                <label for="genero">Género</label>
                <select id="genero" v-model="genero">
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
            </p>

            <p>
                <label for="telefono">Telefono</label>
                <input id="telefono" v-model="telefono" type="text">
            </p>

            <p>
                <label for="email">E-mail</label>
                <input id="email" v-model="email" type="text">
            </p>

            <p>
                <button v-on:click="validarFormulario(), cambiar_instructor(nombres, apellidos, genero, telefono, email)">Guardar Cambios</button>
            </p>
        </div>
    `, //Aquí termina nuestro template

    mounted() {
        let self = this;
        fetch('https://instructores-7e276.firebaseio.com/instructores/'+ this.$route.params.id + '.json')
        .then(r => r.json())
        .then(json => {
            self.nombres = json.nombres,
            self.apellidos = json.apellidos,
            self.genero = json.genero,
            self.telefono = json.telefono,
            self.email = json.email
        });
    },

    methods: { //Inician los métodos
        validarFormulario: function (e) {
            this.errores = [];

            if(!this.nombres){
                this.errores.push("Los nombres es obligatorio.");
            }

            if(!this.apellidos){
                this.errores.push("Los apellidos es obligatorio.");
            }

            if(!this.telefono){
                this.errores.push("El telefono es obligatorio.");
            }

            if(!this.email){
                this.errores.push("El email es obligatorio.");
            }

            if(!this.errores.length){
                return true;
            }
        },// fin de validarFormulario

        cambiar_instructor: function(nombres, apellidos, genero, telefono, email){
            if(!(Array.isArray(this.errores) && this.errores.length)){
                let self = this;
                axios.put('https://instructores-7e276.firebaseio.com/instructores/'+ this.$route.params.id + '.json', {
                    nombres:nombres,
                    apellidos:apellidos,
                    genero:genero,
                    telefono:telefono,
                    email:email
                }).then((response) => {
                    alert("Datos del instructor modificados exitosamente");
                    router.push({ name: "Instructores" });
                }).catch((err) => {
                    self.loading = false; console.log(err);
                });
            }
        }//fin del metodo cambiar_instructor
    }//termian los metodos
});

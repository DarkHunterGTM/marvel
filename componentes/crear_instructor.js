var CrearInstructor = Vue.component('CrearInstructor', {
    data: function () { //Declaración de la data
        return {
            errores: [],
            nombres: null,
            apellidos: null,
            genero: null,
            telefono: null,
            email: null
        }
    },

    //Aquí comenzamos nuestro template
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
                <button v-on:click="validarFormulario(), crear_instructor(nombres, apellidos, genero, telefono, email)">Agregar Instructor</button>
            </p>
        </div>
    `, //Aquí termina nuestro template

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

        crear_instructor: function(nombres, apellidos, genero, telefono, email){
            if(!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.post('https://instructores-7e276.firebaseio.com/instructores.json',{
                    nombres:nombres,
                    apellidos:apellidos,
                    genero:genero,
                    telefono:telefono,
                    email:email
                })
                .then((response) => {
                    alert("Se agrego a la lista exitosamente");
                    router.push({ name: "Instructores" });
                }
                ).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            }
        }//fin metodo crear_alumno
    }//Terminan los metodos

});

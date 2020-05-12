var CrearAlumno = Vue.component('CrearAlumno', {
    data: function () { // Declaración de la data
        return {
            errores: [],
            nombres: null,
            apellidos: null,
            genero: null
        }
    },
    //Aqui comenzamos nuestro template
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
                <button v-on:click="validarFormulario(), crear_alumno(nombres, apellidos, genero)">Agregar Alumno</button>
            </p>

        </div>
    `,//Aquí termina nuestro template

    methods: { //Inician los Métodos
        validarFormulario: function (e){ //inician la función que valida el formulario
            this.errores = [];

            if(!this.nombres){
                this.errores.push("Los nombres es obligatorio.");
            }

            if(!this.apellidos){
                this.errores.push("Los apellidos es obligatorio.");
            }

            if(!this.errores.length){
                return true;
            }
        },

        crear_alumno: function(nombres, apellidos, genero){
            if(!(Array.isArray(this.errores) && this.errores.length)){
                let self = this;
                axios.post('https://consumo-app-bf36d.firebaseio.com/alumnos.json',{
                    nombres:nombres,
                    apellidos:apellidos,
                    genero:genero
                })
                .then((response) => {
                    alert("Se Agregó a la Lista Exitosamente");
                    router.push({ name: "Alumnos" });
                }
                ).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            }
        } // fin metodo crear_alumno
    } // Terminan los Métodos
});

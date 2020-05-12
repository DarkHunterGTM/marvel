var CambiarAlumno = Vue.component('CambiarAlumno', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombres: null,
            apellidos: null,
            genero: null
        }
    },

    //Aquí comienza nuestro template
    template: `
        <div>
            <p v-if="errores.length">
                <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
                <ul>
                    <li v-for="error in errores" style="color:red;">{{ error }}</li>
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
                <button v-on:click="validarFormulario(), cambiar_alumno(nombres, apellidos, genero)">Guardar Cambios</button>
            </p>
        </div>
    `, //Aca termina el template

    mounted() {
        let self = this;
        fetch('https://consumo-app-bf36d.firebaseio.com/alumnos/' + this.$route.params.id + '.json')
            .then(r => r.json())
            .then(json => {
                self.nombres = json.nombres,
                self.apellidos = json.apellidos,
                self.genero = json.genero
            });
    },

    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
            this.errores = [];
            if (!this.nombres) {
                this.errores.push("El Nombre es obligatorio.");
            }
            if (!this.apellidos) {
                this.errores.push("El Apellido es obligatorio.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        cambiar_alumno: function (nombres, apellidos, genero) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.put('https://consumo-app-bf36d.firebaseio.com/alumnos/' + this.$route.params.id + '.json', {
                    nombres: nombres,
                    apellidos: apellidos,
                    genero: genero,
                }).then((response) => {
                    alert("Datos del Alumno Modificados Exitosamente");
                    router.push({ name: "Alumnos" });
                }).catch((err) => {
                    self.loading = false; console.log(err);
                });
            }
        } // fin metodo cambiar_alumno
    } // Terminan los Métodos
});

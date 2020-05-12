Vue.component('button-counter', {
    data: function () { //Declaración de la Data
        return {
            count: 0
        }
    },
    // Aquí comienza nuestro template
    template: `
        <div>
            <button v-on:click="count+=2">Me ha pulsado {{ count }} veces.</button> 
                <div v-if="count >= 20">
                    <strong>El numero es igual o mayor a 20</strong>
                </div>
        </div>
    `,

})
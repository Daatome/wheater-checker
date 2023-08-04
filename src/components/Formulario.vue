
<script setup>
    import { ref, reactive } from 'vue';
    import Alerta from './Alerta.vue'

    const error=ref('')

    const paises = [
        { codigo: 'US', nombre: 'Estados Unidos' },
        { codigo: 'MX', nombre: 'México' },
        { codigo: 'AR', nombre: 'Argentina' },
        { codigo: 'CO', nombre: 'Colombia' },
        { codigo: 'CR', nombre: 'Costa Rica' },
        { codigo: 'ES', nombre: 'España' },
        { codigo: 'PE', nombre: 'Perú' }
    ]

    const emit = defineEmits(['obtener-clima'])

    const datosBusqueda= reactive({
        pais:'',
        ciudad:''
    })

    const buscarClima=()=>{
        if(Object.values(datosBusqueda).includes('')){
            error.value='Todos los campos son necesarios'
            return
        }
        error.value=''
        emit('obtener-clima',datosBusqueda)
        
    }


</script>

<template>
    <form class="formulario"
        @submit.prevent="buscarClima"
    >
        <div class="campo">
            <Alerta v-if="error">{{ error }}</Alerta>

            <label for="" class="ciudad"> Ciudad</label>
            <input type="text" id="ciudad" placeholder="Ciudad" 
                v-model="datosBusqueda.ciudad"
            >
        </div>


        <div class="campo">
            <label for="pais" >País</label>
            <select  id="pais"
                v-model="datosBusqueda.pais"
            >
                <option value="">-- Seleccione un país</option>
                <option v-for="pais in paises"
                    :value="pais.codigo"
                >
                    {{ pais.nombre }}
            
                </option>
            </select>

        </div>

        <input type="submit" value="consultarClima">
    </form>
</template>

<style lang="scss" scoped>

</style>
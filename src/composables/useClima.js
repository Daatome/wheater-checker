import axios from "axios"
import { ref, computed } from "vue"


export default function useClima(){

    const clima= ref({})

    const mostrarSpinner= ref(false)

    const error= ref('')

    //destructuring to the object sended by the Formulario
    const obtenerClima=async ({ciudad,pais})=>{
        error.value=''

        const key= import.meta.env.VITE_API_KEY

        //getting lat and long
        try {
            mostrarSpinner.value=true
            clima.value={}

            const url= `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`

            // const response= await fetch(url)
            // const data= await response.json()

            const {data}= await axios(url)

            const {lat, lon}= data[0]
    
            
            //second call to get the weather
            const urlClima=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

            const {data: dataWeather}= await axios(urlClima)
            clima.value=dataWeather
        } catch {
            error.value='ciudad no encontrada'
        }finally{
            mostrarSpinner.value=false

        }

    }

    const mostrarClima=computed(()=>{
        return Object.values(clima.value).length>0
    })

    const formatearTemperatura=(temperatura)=> parseInt(temperatura-273.15)

    return {
        obtenerClima,
        clima,
        mostrarClima,
        mostrarSpinner,
        formatearTemperatura,
        error
    }
}
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
    profesor: Object,
    required: true
})

const emit = defineEmits(['osvezi-listu']);



const uIzmeni = ref(false);
const izmenjeniProfesor = ref({ ...props.profesor });

const izmeniProfesora = () => {
    uIzmeni.value = !uIzmeni.value;
  };

const sacuvajIzmene = () => {
    uIzmeni.value = false;
//prebaci u app.vue i na kraju funkcije pozovi dohvatiProfesore()
//tako nestaje potreba za eventom osvezi-listu
    emit('osvezi-listu');

    axios.put('http://pabp.viser.edu.rs:8000/api/Profesors/' + izmenjeniProfesor.value.idProfesora ,izmenjeniProfesor.value)
    .then(resp=>{
        console.log(resp)
    })
    .catch(err=>{
        console.error('Greska pri izmeni profesora:', err.response?.data || err.message);
        alert('Doslo je do greške pri čuvanju izmena.');
    })

    };

const predmeti = ref([]);
const prikaziPredmete = ref(false);

const dohvatiDetaljeProfesora = () => {
    
    //prebaci u app.vue
    axios.get(`http://pabp.viser.edu.rs:8000/api/Predmets?idProfesora=${props.profesor.idProfesora}`)
    .then(response=>{
        prikaziPredmete.value = true;
        predmeti.value = response.data;
    })
    .catch(error=>{
        console.error('Greska pri dohvatanju detalja profesora:', error.response?.data || error.message);
        alert('Doslo je do greške pri dohvatanju detalja profesora.');
    })

}

</script>

<template>
    <tr>
        <td>{{ profesor.ime }}</td>
        <td>{{ profesor.prezime }}</td>
        <td>{{ profesor.zvanje }}</td>
        <td><button v-if="prikaziPredmete" @click = "prikaziPredmete = !prikaziPredmete">Sakrij Detalje</button></td>
        <td><button v-if="!prikaziPredmete" @click = "dohvatiDetaljeProfesora">Detalji</button></td>
        <td><button @click = "izmeniProfesora">Izmene</button></td>

    </tr>

    <tr v-if="uIzmeni" style="border: none" >
        <td><input type="text" v-model="izmenjeniProfesor.ime" class="form-control" style="background-color: lightgray"></td>
        <td><input type="text" v-model="izmenjeniProfesor.prezime" class="form-control" style="background-color: lightgray"></td>
        <td><input type="text" v-model="izmenjeniProfesor.zvanje" class="form-control" style="background-color: lightgray"></td>
        <td><input type="text" v-model="izmenjeniProfesor.datumZap" class="form-control" style="background-color: lightgray"></td>
        <td><button @click="sacuvajIzmene">Sacuvaj</button></td>
    </tr>

    <tr>
        <td v-if="prikaziPredmete">
            <ul>
                <li v-for="predmet in predmeti" :key="predmet.idPredmeta">
                    naziv: {{ predmet.naziv }} ({{ predmet.espb }} ESPB)
                </li>
            </ul>
        </td>
    </tr>

</template>

<style scoped>

</style>
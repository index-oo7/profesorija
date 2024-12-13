<script setup>
import { ref } from 'vue';
import axios from 'axios';
import modal from '../../../utils/modal.vue';   

const props = defineProps({
    profesor: Object,
    required: true
})

const emit = defineEmits(['osvezi-listu']);

//funkcijama koje pozivaju api, pri premestanju, treba proslediti parametar profesor

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

const zapisnici = ref([]);
const prikazZapisnika = ref(false);

const dohvatiZapisnike = async () => {
    try {
        const response = await axios.get(`http://pabp.viser.edu.rs:8000/api/Zapisniks/`);
        zapisnici.value = response.data;
        console.log(zapisnici.value);
    } catch(error) {
        console.error('Greska pri dohvatanju zapisnika:', error.response?.data || error.message);
        alert('Doslo je do greške pri dohvatanju zapisnika.');
    }
}

const ispiti = ref([]);

const dohvatiIspite = async () => {
    try {
        const response = await axios.get(`http://pabp.viser.edu.rs:8000/api/Ispits/`);
        ispiti.value = response.data;
        console.log(ispiti.value);
    } catch(error) {
        console.error('Greska pri dohvatanju Ispita:', error.response?.data || error.message);
        alert('Doslo je do greške pri dohvatanju Ispita.');
    }
}

const predmeti = ref([]);

const dohvatiPredmete = async () => {
    try {
        const response = await axios.get(`http://pabp.viser.edu.rs:8000/api/Predmets`);
        predmeti.value = response.data;
        console.log(predmeti.value);

        //provera niza 
        predmeti.value = Array.isArray(response.data) ? response.data : [];
        console.log(predmeti.value);
    } catch(error) {
        console.error('Greska pri dohvatanju Predmeta:', error.response?.data || error.message);
        alert('Doslo je do greške pri dohvatanju Predmeta.');
    }
}

const profesori = ref([]);

const dohvatiProfesore = async () => {
    try {
        const response = await axios.get(`http://pabp.viser.edu.rs:8000/api/Profesors`);
        profesori.value = response.data;
        console.log(profesori.value);
    } catch(error) {
        console.error('Greska pri dohvatanju Profesora:', error.response?.data || error.message);
        alert('Doslo je do greške pri dohvatanju Profesora.');
    }
}

const predmetiPoProfesoru = ref([]);
const prikaziPredmetePoProfesoru = ref(false);

const dohvatiPredmetePoProfesoru = async() => {
    await dohvatiPredmete();

    

    predmetiPoProfesoru.value = predmeti.filter(predmet => predmet.idProfesora === props.profesor.idProfesora);
    prikaziPredmetePoProfesoru.value = true;
}



</script>

<template>
    <tr>
        <td>{{ profesor.ime }}</td>
        <td>{{ profesor.prezime }}</td>
        <td>{{ profesor.zvanje }}</td>
        <td><button v-if="prikaziPredmetePoProfesoru" @click = "prikaziPredmetePoProfesoru = !prikaziPredmetePoProfesoru">Sakrij Detalje</button></td>
        <td><button v-if="!prikaziPredmetePoProfesoru" @click = "dohvatiPredmetePoProfesoru">Detalji</button></td>
        <td><button @click = "izmeniProfesora">Izmene</button></td>
        <td><button @click = "prikaziZapisnik">Zapisnik</button></td>
        <modal :modal.naziv="'Zapisnik'" :modal.sadrzaj="zapisnici" :modal.show="prikazZapisnika"></modal>
    </tr>

    <tr v-if="uIzmeni" style="border: none" >
        <td><input type="text" v-model="izmenjeniProfesor.ime" class="form-control" style="background-color: lightgray"></td>
        <td><input type="text" v-model="izmenjeniProfesor.prezime" class="form-control" style="background-color: lightgray"></td>
        <td><input type="text" v-model="izmenjeniProfesor.zvanje" class="form-control" style="background-color: lightgray"></td>
        <td><input type="text" v-model="izmenjeniProfesor.datumZap" class="form-control" style="background-color: lightgray"></td>
        <td><button @click="sacuvajIzmene">Sacuvaj</button></td>
    </tr>

    <tr>
        <td v-if="prikaziPredmetePoProfesoru">
            <ul>
                <li v-for="predmet in predmetiPoProfesoru" :key="predmet.idPredmeta">
                    naziv: {{ predmet.naziv }} ({{ predmet.espb }} ESPB)
                </li>
            </ul>
        </td>
    </tr>

</template>

<style scoped>

</style>
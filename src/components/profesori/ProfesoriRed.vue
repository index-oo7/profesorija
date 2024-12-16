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

const dohvatiZapisnike = async () => {
    try {
        const response = await axios.get(`http://pabp.viser.edu.rs:8000/api/Zapisniks/`);
        zapisnici.value = response.data;
        console.log("zapisnici.value" + zapisnici.value);
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
        console.log("ispiti.value" + ispiti.value);
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
        console.log("predmeti.value" + predmeti.value);
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
        console.log("Profesori: " + profesori.value);
    } catch(error) {
        console.error('Greska pri dohvatanju Profesora:', error.response?.data || error.message);
        alert('Doslo je do greške pri dohvatanju Profesora.');
    }
}

const predmetiPoProfesoru = ref([]);
const prikaziPredmetePoProfesoru = ref(false);

const dohvatiPredmetePoProfesoru = async() => {
    await dohvatiPredmete();

    predmetiPoProfesoru.value = predmeti.value.filter(predmet => predmet.idProfesora === props.profesor.idProfesora);

    if (predmetiPoProfesoru.value.length === 0) {
        alert('Nema zapisnika za ovog profesora.');
        prikaziPredmetePoProfesoru.value = false;
    } else {
        prikaziPredmetePoProfesoru.value = true;
    }
}


const zapisniciPoProfesoru = ref([]);
const prikaziZapisnikePoProfesoru = ref(false);

const dohvatiZapisnikePoProfesoru = async() => {
    await Promise.all([dohvatiProfesore(),dohvatiPredmete(), dohvatiIspite(), dohvatiZapisnike()]);
    
    var predmetiProfesora = predmeti.value.filter(predmet => predmet.idProfesora === props.profesor.idProfesora);
    var ispitiProfesora = ispiti.value.filter(ispiti => predmetiProfesora.some(predmet => predmet.idPredmeta === ispiti.idPredmeta));
    var zapisniciProfesora = zapisnici.value.filter(zapisnik => ispitiProfesora.some(ispiti =>ispiti.idIspita === zapisnik.idIspita));

    zapisniciPoProfesoru.value = zapisniciProfesora;
    
    if (zapisniciPoProfesoru.value.length === 0) {
        alert('Nema zapisnika za ovog profesora.');
        prikaziZapisnikePoProfesoru.value = false;
    } else {
        prikaziZapisnikePoProfesoru.value = true;
    }
}


</script>

<template>
    <tr>
        <td>{{ profesor.ime }}</td>
        <td>{{ profesor.prezime }}</td>
        <td>{{ profesor.zvanje }}</td>
        <td><button v-if="!prikaziPredmetePoProfesoru" @click = "dohvatiPredmetePoProfesoru">Detalji</button></td>
        <td><button v-if="prikaziPredmetePoProfesoru" @click = "prikaziPredmetePoProfesoru = !prikaziPredmetePoProfesoru">Sakrij Detalje</button></td>
        <td><button @click = "izmeniProfesora">Izmene</button></td>
        <td><button v-if="!prikaziZapisnikePoProfesoru" @click = "dohvatiZapisnikePoProfesoru">Zapisnici</button></td>
        <td><button v-if="prikaziZapisnikePoProfesoru" @click = "prikaziZapisnikePoProfesoru = !prikaziZapisnikePoProfesoru">Sakrij Zapisnike</button></td>
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

    <tr>
        <td v-if="prikaziZapisnikePoProfesoru">
            <ul>
                <li v-for="zapisnik in zapisniciPoProfesoru" :key="zapisnik.idIspita">
                    zapisnik: <br>
                    idStudenta: {{ zapisnik.idStudenta }}, <br>
                    idIspita: {{zapisnik.idIspita}}, <br>
                    ocena: {{zapisnik.ocena}},<br>
                    bodovi: {{zapisnik.bodovi}},<br>
                    <br>
                </li>
            </ul>
        </td>
    </tr>

</template>

<style scoped>

</style>
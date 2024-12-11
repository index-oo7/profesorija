import apiClient from "./api";

const zapisnikServis = {
    dohvatiZapisnike() {
        return apiClient.get("/Zapisniks");
    },
    
    dohvatiDetaljeZapisnika(idZapisnika) {
        return apiClient.get(`/Zapisniks/${idZapisnika}`);
    },
};

export default zapisnikServis;
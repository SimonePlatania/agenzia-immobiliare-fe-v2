import { createSlice } from '@reduxjs/toolkit';
import {Annuncio} from "@/utils/types";

export const initialStateAnnuncio: Annuncio = {
    cittaId: 0,
    dataPubblicazione: undefined,
    descrizione: "",
    esisteAscensore: "",
    esisteGarage: "",
    esistePostoAutoAssegnato: "",
    esisteTerrazzo: "",
    id: 0,
    mq: 0,
    numeroVisualizzazioni: 0,
    piano: 0,
    prezzo: 0,
    rimosso: false,
    speseAggiuntive: 0,
    tipologiaAnnuncioId: 0,
    tipologiaImmobileId: 0,
    titolo: "",
    utenteId: 0,
    zona: ""
}

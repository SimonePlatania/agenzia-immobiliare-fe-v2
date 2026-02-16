import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RicercaRequest} from "@/utils/types";

export const initialStateRicerca: RicercaRequest = {
    tipologiaAnnuncioId: "",
    tipologiaImmobileId: "",
    prezzoDa: 0,
    prezzoAl: 0,
    dataDal: "",
    dataAl: "",
    mqMinimi: 0,
    stanzeMinime: 0,
    citta: "",
    ascensore: 0,
    garage: 0,
    terrazzo: 0,
    postoAuto: 0,
    zona: "",
    speseAggiuntive: 0,
    titolo: ""
}

const ricercaAnnuncioSlice = createSlice({
    name: "ricerca",
    initialState: initialStateRicerca,
    reducers: {
        setRicerca: (
            state,
            action: PayloadAction<RicercaRequest>) => {
            return action.payload
        },
        resetRicerca: (state) => {
            return initialStateRicerca
        }
    }
})

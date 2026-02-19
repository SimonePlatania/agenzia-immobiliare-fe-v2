import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RicercaRequest} from "@/utils/types";

export const initialStateRicerca: RicercaRequest = {
    tipologiaAnnuncioId: "",
    tipologiaImmobileId: "",
    prezzoDa: "",
    prezzoAl: "",
    dataDal: "",
    dataAl: "",
    mqMinimi: "",
    stanzeMinime: "",
    piano: "",
    citta: "",
    ascensore: "",
    garage: "",
    terrazzo: "",
    postoAuto: "",
    zona: "",
    speseAggiuntive: "",
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
        },
    }
})

export const {setRicerca, resetRicerca} = ricercaAnnuncioSlice.actions
export default ricercaAnnuncioSlice.reducer

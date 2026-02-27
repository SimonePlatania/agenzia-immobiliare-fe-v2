import { Annuncio } from "@/utils/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
    numeroStanze: 0,
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

const annuncioSlice = createSlice({
    name: "annuncio",
    initialState: initialStateAnnuncio,
    reducers: {
        setAnnuncio: (state, action: PayloadAction<Annuncio>) => {
            return action.payload
        },
        resetAnnuncio: (state) => {
            return initialStateAnnuncio
        }
    }
})

export const { setAnnuncio, resetAnnuncio } = annuncioSlice.actions
export default annuncioSlice.reducer

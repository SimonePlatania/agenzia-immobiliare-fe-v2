import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Annuncio, Paginazione, RicercaResponse } from "@/utils/types"

const initialStateAnnunciPaginazione: RicercaResponse = {
    annunci: [],
    paginazione: {
        countElementi: 0,
        numPagina: 0,
        elementiPagina: 0,
        pagineTotali: 0
    }
}

const annunciPaginazioneSlice = createSlice({
    name: "annunciPaginazione",
    initialState: initialStateAnnunciPaginazione,
    reducers: {
        setAnnunci: (
            state: RicercaResponse,
            action: PayloadAction<{
                annunci: Annuncio[]
                paginazione: Paginazione
            }>
        ) => {
            state.annunci = action.payload.annunci
            state.paginazione = action.payload.paginazione
        },
        resetAnnunci: (state: RicercaResponse) => {
            state.annunci = []
            state.paginazione = {
                countElementi: 0,
                numPagina: 0,
                elementiPagina: 0,
                pagineTotali: 0
            }
        }
    }
})

export const { setAnnunci, resetAnnunci } = annunciPaginazioneSlice.actions
export default annunciPaginazioneSlice.reducer

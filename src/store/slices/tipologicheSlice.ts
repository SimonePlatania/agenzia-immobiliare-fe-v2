import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Tipologica, TipologicheState} from "@/utils/types";

const initialState: TipologicheState = {
    codice: "",
    descrizione: "",
    tipologicaProdMiscelatiList: [],
    tipologicaRuoli: [],
    tipologicaCitta: [],
    tipologicaImmobile: [],
    tipologicaAnnuncio: [],
    tipologicaClienti: [],
}

const tipologicheSlice = createSlice({
    name: "tipologica",
    initialState: initialState,
    reducers: {
        setTipologica: (
            state: TipologicheState,
            action: PayloadAction<String>
        ) => {
            // @ts-ignore
            state.codice = action.payload
            return state
        },
        setListaTipologicheProdMiscelati: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaProdMiscelatiList = action.payload
            return state
        },
        setTipologicaRuoli: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaRuoli = action.payload
            return state
        },
        setTipologicaCitta: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaCitta = action.payload
        },
        setTipologicaImmobile: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaImmobile = action.payload
        },
        setTipologicaAnnuncio: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaAnnuncio = action.payload
        },
        setTipologicaClienti: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaClienti = action.payload
        },
        resetTipologica: (state: TipologicheState) => {
            return initialState
        }
    }
})

const {actions, reducer} = tipologicheSlice
export const {
    setTipologica,
    setListaTipologicheProdMiscelati,
    setTipologicaRuoli,
    setTipologicaCitta,
    setTipologicaImmobile,
    setTipologicaAnnuncio,
    resetTipologica
} = actions
export default tipologicheSlice.reducer

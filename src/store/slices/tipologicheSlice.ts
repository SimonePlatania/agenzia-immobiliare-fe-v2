import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Tipologica} from "@/utils/types";

export interface TipologicheState {
    codice: string
    descrizione: string
    tipologicaProdMiscelatiList: Array<Tipologica<string>>
    tipologicaRuoli: Array<Tipologica<string>>
}

const initialState: TipologicheState = {
    codice: "",
    descrizione: "",
    tipologicaProdMiscelatiList: [],
    tipologicaRuoli: []
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
    resetTipologica
} = actions
export default tipologicheSlice.reducer

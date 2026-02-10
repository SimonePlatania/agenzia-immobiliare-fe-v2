import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Tipologica} from "@/utils/types";

export interface TipologicheState {
    tipologicaIdList: Array<Tipologica<string>>
    tipologicaModList: Array<Tipologica<string>>
    tipologicaProdList: Array<Tipologica<string>>
    tipologicaProdMiscelatiList: Array<Tipologica<string>>
}

const initialState: TipologicheState = {
    tipologicaIdList: [],
    tipologicaModList: [],
    tipologicaProdList: [],
    tipologicaProdMiscelatiList: [],
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
        setListaTipologicheId: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaIdList = action.payload
            return state
        },
        setListaTipologicheMod: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaModList = action.payload
            return state
        },
        setListaTipologicheProd: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaProdList = action.payload
            return state
        },
        setListaTipologicheProdMiscelati: (
            state: TipologicheState,
            action: PayloadAction<Tipologica<any>[]>
        ) => {
            state.tipologicaProdMiscelatiList = action.payload
            return state
        },
        resetTipologica: (state: TipologicheState) => {
            return initialState
        }
    }
})
const { actions, reducer } = tipologicheSlice
export const {
    setTipologica,
    setListaTipologicheId,
    setListaTipologicheMod,
    setListaTipologicheProd,
    setListaTipologicheProdMiscelati,
    resetTipologica
} = actions
export default tipologicheSlice.reducer

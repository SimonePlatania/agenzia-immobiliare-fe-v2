import {createSlice} from '@reduxjs/toolkit';
import {UtenteResponse} from "@/utils/types";

const initialUtenteState: UtenteResponse = {
    cognome: "",
    email: "",
    id: "",
    nome: "",
    ruoloId: 0,
    telefono: ""
}

const utenteSlice = createSlice({
    name: "utente",
    initialState: initialUtenteState,
    reducers: {
        setUtente: (state, {payload}) => {
            return payload
        }
    }
})

export const {actions, reducer} = utenteSlice
export const {setUtente} = actions
export default utenteSlice.reducer

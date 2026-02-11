import {createSlice} from '@reduxjs/toolkit';
import {UtenteResponse} from "@/utils/types";
import {utenteApi} from "@/api/utenteApi"

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
        setLoginUtente: (state, {payload}) => {
            return payload
        },
        setRegistraUtente: (state, {payload}) => {
            return payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            utenteApi.endpoints.loginUser.matchFulfilled,
            (state, {payload}) => {
                state.ruoloId = Number(payload.ruolo)

            }
        )
        builder.addMatcher(
            utenteApi.endpoints.logoutUser.matchFulfilled,
            () => initialUtenteState
        )
        builder.addMatcher(
            utenteApi.endpoints.registrazioneUser.matchFulfilled,
            () => initialUtenteState
        )
    }
})

export const {actions, reducer} = utenteSlice
export const {setLoginUtente, setRegistraUtente} = actions
export default utenteSlice.reducer

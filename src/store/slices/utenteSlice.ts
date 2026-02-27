import { createSlice } from "@reduxjs/toolkit"
import { LoginResponse, UtenteResponse } from "@/utils/types"

const initialUtenteState: UtenteResponse = {
    cognome: "",
    email: "",
    id: "",
    nome: "",
    ruoloId: 0,
    telefono: ""
}

const initialLoginState: LoginResponse = {
    id: "",
    nome: "",
    cognome: "",
    email: "",
    ruolo: ""
}

const utenteSlice = createSlice({
    name: "utente",
    initialState: initialLoginState,
    reducers: {
        setLoginUtente: (state, { payload }) => {
            return payload
        },
        setLogoutUtente: (state) => {
            return initialLoginState
        },
        setRegistraUtente: (state, { payload }) => {
            return payload
        }
    }
})

export const { setLoginUtente, setRegistraUtente, setLogoutUtente } =
    utenteSlice.actions
export const resetAll = { type: "RESET_ALL" }
export default utenteSlice.reducer

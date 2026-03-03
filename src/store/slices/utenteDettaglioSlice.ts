import { UtenteResponse } from "@/utils/types"
import { createSlice } from "@reduxjs/toolkit"

const initialUtenteState: UtenteResponse = {
    id: "",
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    ruoloId: 0
}

const utenteDettaglioSlice = createSlice({
    name: "utenteDettaglio",
    initialState: initialUtenteState,
    reducers: {
        setUtenteDettaglio: (state, { payload }) => {
            return payload
        },
        resetUtenteAnnuncio: (state) => {
            return initialUtenteState
        }
    }
})

export const { setUtenteDettaglio, resetUtenteAnnuncio } =
    utenteDettaglioSlice.actions
export default utenteDettaglioSlice.reducer

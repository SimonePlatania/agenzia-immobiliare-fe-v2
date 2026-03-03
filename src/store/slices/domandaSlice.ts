import { createSlice } from "@reduxjs/toolkit"
import { DomandaRequest } from "@/utils/types"

export const initialDomandaState: DomandaRequest = {
    id: 0,
    dataDomanda: "",
    domanda: "",
    annuncioId: "",
    utenteId: ""
}

const domandaSlice = createSlice({
    name: "domanda",
    initialState: initialDomandaState,
    reducers: {
        setDomanda: (state, { payload }) => {
            return payload
        },
        resetDomanda: (state) => {
            return initialDomandaState
        }
    }
})

export const { setDomanda, resetDomanda } = domandaSlice.actions
export default domandaSlice.reducer

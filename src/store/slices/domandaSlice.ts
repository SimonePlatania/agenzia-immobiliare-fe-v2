import { createSlice } from "@reduxjs/toolkit"

export const initialDomandaState = {
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

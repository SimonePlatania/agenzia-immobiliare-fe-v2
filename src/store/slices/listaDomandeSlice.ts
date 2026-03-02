import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DomandaResponse } from "@/utils/types"

const initialDomandeState: DomandaResponse[] = []

const listaDomandeSlice = createSlice({
    name: "listaDomande",
    initialState: initialDomandeState,
    reducers: {
        setListaDomande: (
            state,
            { payload }: PayloadAction<DomandaResponse[]>
        ) => {
            return payload
        },
        resetListaDomande: (state) => {
            return []
        }
    }
})

export const { setListaDomande, resetListaDomande } = listaDomandeSlice.actions
export default listaDomandeSlice.reducer

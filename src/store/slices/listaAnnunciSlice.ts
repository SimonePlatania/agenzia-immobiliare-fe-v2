import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Annuncio } from "@/utils/types"

const listaAnnunciInitialState: Annuncio[] = []

const listaAnnunciSlice = createSlice({
    name: "listaAnnunci",
    initialState: listaAnnunciInitialState,
    reducers: {
        setListaAnnunci: (
            state: Annuncio[],
            action: PayloadAction<Annuncio[]>
        ) => {
            return action.payload
        },
        aggiornaListaAnnunci: (state, action: PayloadAction<Annuncio>) => {
            const index = state.findIndex(
                (annuncio) => annuncio.id === action.payload.id
            )
            if (index !== -1) {
                state[index] = action.payload
            }
        },
        rimuoviAnnuncioDaLista: (state, action: PayloadAction<number>) => {
            return state.filter((a) => a.id !== action.payload)
        },
        resetListaAnnunci: (state: Annuncio[]) => {
            return listaAnnunciInitialState
        }
    }
})

export const {
    setListaAnnunci,
    resetListaAnnunci,
    aggiornaListaAnnunci,
    rimuoviAnnuncioDaLista
} = listaAnnunciSlice.actions
export default listaAnnunciSlice.reducer

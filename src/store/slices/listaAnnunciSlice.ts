import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Annuncio} from "@/utils/types";

const listaAnnunciInitialState: Annuncio[] = []


const listaAnnunciSlice = createSlice({
    name: "listaAnnunci",
    initialState: listaAnnunciInitialState,
    reducers: {
        setListaAnnunci: (state: Annuncio[], action: PayloadAction<Annuncio[]>) => {
            return action.payload
        },
        resetListaAnnunci: (state: Annuncio[]) => {
            return listaAnnunciInitialState
        }
    }
})

export const {setListaAnnunci, resetListaAnnunci} = listaAnnunciSlice.actions
export default listaAnnunciSlice.reducer

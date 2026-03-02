import { combineReducers } from "redux"
import { rootApi } from "@/api/rootApi"
import uiSlice from "@/store/slices/uiSlice"
import messagesSlice from "@/store/slices/messagesSlice"
import breadCrumbSlice from "@/store/slices/breadCrumb-slice"
import breadCrumbSliceSaved from "@/store/slices/breadCrumb-slice-saved"
import tipologicheSlice from "@/store/slices/tipologicheSlice"
import utenteSlice from "@/store/slices/utenteSlice"
import annuncioSlice from "@/store/slices/annuncioSlice"
import sectionSlice from "@/store/slices/sectionSlice"
import listaAnnunciSlice from "@/store/slices/listaAnnunciSlice"
import ricercaAnnuncioSlice from "@/store/slices/ricercaAnnuncioSlice"
import { initialStateRedux } from "@/utils/constants/consts"
import domandaSlice from "@/store/slices/domandaSlice"
import listaDomandeSlice from "@/store/slices/listaDomandeSlice"

const appReducer = combineReducers({
    [rootApi.reducerPath]: rootApi.reducer,
    ui: uiSlice,
    messages: messagesSlice,
    breadcrumb: breadCrumbSlice,
    breadcrumbSaved: breadCrumbSliceSaved,
    tipologica: tipologicheSlice,
    utente: utenteSlice,
    section: sectionSlice,
    annuncio: annuncioSlice,
    ricerca: ricercaAnnuncioSlice,
    listaAnnunci: listaAnnunciSlice,
    domanda: domandaSlice,
    listaDomande: listaDomandeSlice
})

const createRootReducer = () => (state: any, action: any) => {
    if (action.type === "RESET_ALL") {
        state = initialStateRedux
    }
    return appReducer(state, action)
}

export default createRootReducer

import {combineReducers} from "redux"
import {rootApi} from "@/api/rootApi";
import uiSlice from "@/store/slices/uiSlice";
import messagesSlice from "@/store/slices/messagesSlice";
import breadCrumbSlice from "@/store/slices/breadCrumb-slice";
import breadCrumbSliceSaved from "@/store/slices/breadCrumb-slice-saved";
import tipologicheSlice from "@/store/slices/tipologicheSlice";
import utenteSlice from "@/store/slices/utenteSlice";
import annuncioSlice from "@/store/slices/annuncioSlice";
import sectionSlice from "@/store/slices/sectionSlice";

const createRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        ui: uiSlice,
        messages: messagesSlice,
        breadcrumb: breadCrumbSlice,
        breadcrumbSaved: breadCrumbSliceSaved,
        tipologica: tipologicheSlice,
        utente: utenteSlice,
        section: sectionSlice,
        annuncio: annuncioSlice,
        ricerca: annuncioSlice
    })

export default createRootReducer

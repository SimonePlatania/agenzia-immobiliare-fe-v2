import { combineReducers } from "redux"
import {rootApi} from "@/api/rootApi";
import uiSlice from "@/store/slices/uiSlice";
import messagesSlice from "@/store/slices/messagesSlice";
import breadCrumbSlice from "@/store/slices/breadCrumb-slice";
import breadCrumbSliceSaved from "@/store/slices/breadCrumb-slice-saved";
import tipologicheSlice from "@/store/slices/tipologicheSlice";

const createRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        ui: uiSlice,
        messages: messagesSlice,
        breadcrumb: breadCrumbSlice,
        breadcrumbSaved: breadCrumbSliceSaved,
        tipologica: tipologicheSlice,
    })

export default createRootReducer

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {AppPaths} from "@/utils/constants/routes";
import {setNavigateTo} from "@/store/slices/uiSlice";
import type {Dispatch} from "react";
import {type AnyAction, isRejectedWithValue} from "@reduxjs/toolkit";

export const ROOT_API_PRIVATE = `${__CONTEXT_PATH__}/api`

export const unauthenticatedMiddleware =
    () => (next: Dispatch<any>) => (action: any) => {
        if (isRejectedWithValue(action)) {
            let status = action?.meta?.baseQueryMeta?.response?.status
            if (status === 401 /*|| status === 403*/) {
                next(setNavigateTo(AppPaths.DELEGANTI))
            }
        }
        return next(action)
    }

export const successMiddleware =
    (store: any) => (next: Dispatch<any>) => (action: AnyAction) => {
        const user = store.getState().user
        // if (isFulfilled(action)) {
        //     store.dispatch(
        //         setSessionTime(
        //             user.sessionTimeout || Session.TOTAL_SESSION_TIME
        //         )
        //     )
        //     if (store.getState().ui.showMessage) {
        //         store.dispatch(setSessionShowMessage(false))
        //     }
        // }
        return next(action)
    }

export const rootApi = createApi({
    reducerPath: "privato",
    baseQuery: fetchBaseQuery({baseUrl: ROOT_API_PRIVATE}),
    tagTypes: ["User", "Tipologiche", "Miscelazione", "Annuncio"],
    keepUnusedDataFor: 0,
    endpoints: () => ({})
})

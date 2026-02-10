import { reduxBatch } from "@manaflair/redux-batch"
import { configureStore } from "@reduxjs/toolkit"
import createRootReducer from "./slices"
import {rootApi, successMiddleware, unauthenticatedMiddleware} from "@/api/rootApi";


export const storeApp = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .concat(unauthenticatedMiddleware)
            .concat(successMiddleware)
            .concat(rootApi.middleware),
    devTools: true,
    enhancers: [reduxBatch]
})
export type AppState = ReturnType<typeof storeApp.getState>

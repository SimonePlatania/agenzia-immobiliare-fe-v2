import { createSlice } from "@reduxjs/toolkit"
import {AppPaths} from "@/utils/constants/routes";

export type BreadCrumbType = AppPaths

const initialState: BreadCrumbType[] = [AppPaths.HOME]

export const removeUntilDetail = (
    breadcrumb: BreadCrumbType[],
    prop: string
) => {
    while (breadcrumb.length > 0) {
        const lastElement = breadcrumb[breadcrumb.length - 1]
        if (lastElement.includes(prop)) {
            break
        }
        breadcrumb.pop()
    }
    return breadcrumb
}

const breadCrumbSavedSlice = createSlice({
    name: "breadCrumbSaved",
    initialState: initialState,
    reducers: {
        resetBreadCrumbSaved: (state: BreadCrumbType[]) => {
            state = [AppPaths.HOME]
            return state
        },
        setBreadCrumbStateSaved: (state: BreadCrumbType[], action) => {
            state = action.payload
            return state
        },
        addBreadCrumbStateSaved: (state: BreadCrumbType[], action) => {
            state = [
                ...state.filter((i: BreadCrumbType) => i != action.payload),
                action.payload
            ]
            return state
        },
        removeBreadCrumbStateSaved: (state: BreadCrumbType[], action) => {
            state = state.filter((s: BreadCrumbType) => s != action.payload)
            return state
        },
        removeBreadCrumbStateUntilDetailSaved: (
            state: BreadCrumbType[],
            action
        ) => {
            const list = removeUntilDetail(state, action.payload.prop)
            list.push(action.payload.path)
            return list
        }
    }
})

export const {
    setBreadCrumbStateSaved,
    addBreadCrumbStateSaved,
    removeBreadCrumbStateSaved,
    resetBreadCrumbSaved,
    removeBreadCrumbStateUntilDetailSaved
} = breadCrumbSavedSlice.actions
export default breadCrumbSavedSlice.reducer

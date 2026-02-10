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

const breadCrumbSlice = createSlice({
    name: "breadCrumb",
    initialState: initialState,
    reducers: {
        resetBreadCrumb: (state: BreadCrumbType[]) => {
            state = [AppPaths.HOME]
            return state
        },
        setBreadCrumbState: (state: BreadCrumbType[], action) => {
            state = action.payload
            return state
        },
        addBreadCrumbState: (state: BreadCrumbType[], action) => {
            state = [
                ...state.filter((i: BreadCrumbType) => i != action.payload),
                action.payload
            ]
            return state
        },
        removeBreadCrumbState: (state: BreadCrumbType[], action) => {
            state = state.filter((s: BreadCrumbType) => s != action.payload)
            return state
        },
        removeBreadCrumbStateUntilDetail: (state: BreadCrumbType[], action) => {
            const list = removeUntilDetail(state, action.payload.prop)
            list.push(action.payload.path)
            return list
        }
    }
})

export const {
    setBreadCrumbState,
    addBreadCrumbState,
    removeBreadCrumbState,
    resetBreadCrumb,
    removeBreadCrumbStateUntilDetail
} = breadCrumbSlice.actions
export default breadCrumbSlice.reducer

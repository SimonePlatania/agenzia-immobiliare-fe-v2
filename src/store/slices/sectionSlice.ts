import { createSlice } from "@reduxjs/toolkit"
import { Sections } from "@/utils/constants/consts"

const initialState: Sections | string = Sections.ACQUISIZIONE

const sectionSlice = createSlice({
    name: "section",
    initialState: initialState,
    reducers: {
        setSection: (state, { payload }) => {
            return payload
        },
        resetSection: (state) => {
            return initialState
        }
    }
})
export const { setSection, resetSection } = sectionSlice.actions
export default sectionSlice.reducer

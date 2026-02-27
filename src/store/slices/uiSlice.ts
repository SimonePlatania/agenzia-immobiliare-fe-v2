import type { BreadCrumbType } from "./breadCrumb-slice.ts"
import { AppPaths } from "@/utils/constants/routes"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { createErrorGrowl } from "@/custom/modal/Growl"
import { Session } from "@/utils/constants/consts"
import { LoginResponse } from "@/utils/types"

export type SessionTime = Session | number
export type GrowlType = {
    show: boolean
    header?: string
    body?: string
    icon?: string
    style?: string
}

export interface UiType {
    cookieBar: boolean
    sessionTime: SessionTime
    showMessage: boolean
    spinner: boolean
    growl: GrowlType
    messageStatus: number | string
    routeTo: string
    navbar: MenuStructure[]
}

export interface MenuStructure {
    label: string
    disabled: (path?: string, user?: LoginResponse) => boolean
    notRendered: (path?: string, user?: LoginResponse) => boolean
    clickAction?: () => void | (() => void)[]
    dispatchAction?: any
    icon?: string
    path: string
    submenus?: MenuStructure[]
    className?: string
    isSeparated?: boolean
}

export interface UserState {
    username: string
    codiceUfficio: string
    denominazioneUfficio: string
    sessionTimeout: number
    sessionExpiring: number
    tipoUfficio: string
    ruolo: string
    infoUfficio: {
        ufficioITP: {
            key: string
            value: string
        }
        ufficioITU: {
            key: string
            value: string
        }
    }
}

export const navigationTo = (path: BreadCrumbType): BreadCrumbType => {
    let destination: BreadCrumbType = AppPaths.HOME
    if (path != AppPaths.HOME) {
        destination = (AppPaths.HOME + `/${path}`) as BreadCrumbType
    }
    return destination
}

export const renderDesc = (
    larghezzaFinestra: number,
    descTouched: any[],
    desc: string
) => {
    return larghezzaFinestra < 1650 &&
        descTouched.some((d: string) =>
            d.toLowerCase().includes(desc.toLowerCase())
        )
        ? desc.substring(0, 15) + "..."
        : desc
}

const initialState: UiType = {
    cookieBar: false,
    sessionTime: Session.TOTAL_SESSION_TIME,
    showMessage: false,
    spinner: false,
    messageStatus: "",
    growl: {
        show: false,
        header: "",
        body: "",
        icon: "",
        style: ""
    },
    routeTo: "",
    navbar: []
}
const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        acceptCookieBar: (state: UiType) => {
            state.cookieBar = true
        },
        setSessionTime: (state: UiType, action: PayloadAction<SessionTime>) => {
            state.sessionTime = action.payload
        },
        decrementSessionTime: (state: UiType) => {
            state.sessionTime =
                state.sessionTime !== undefined ? state.sessionTime - 1 : 0
        },
        setSessionShowMessage: (
            state: UiType,
            action: PayloadAction<boolean>
        ) => {
            state.showMessage = action.payload
        },
        enableSpinner: (state: UiType) => {
            state.spinner = true
        },
        disableSpinner: (state: UiType) => {
            state.spinner = false
        },
        setGrowl: (state: UiType, action: PayloadAction<GrowlType>) => {
            state.growl = action.payload
        },
        setStatusMessage: (state: UiType, { payload }) => {
            state.messageStatus = payload
            return state
        },
        setErrorGrowl: (state: UiType, { payload }) => {
            state.messageStatus = payload
            state.growl = createErrorGrowl(
                /*decodeStatusMessage(*/ payload /*)*/
            )
            state.routeTo = AppPaths.ERROR
            return state
        },
        setNavigateTo: (state: UiType, { payload }) => {
            state.routeTo = payload
            return state
        },
        resetNavigateTo: (state: UiType) => {
            state.routeTo = ""
            return state
        },
        resetStatus: (state: UiType) => {
            state.routeTo = ""
            state.messageStatus = ""
            return state
        },
        setNavbar: (state: UiType, action: PayloadAction<MenuStructure[]>) => {
            state.navbar = action.payload
            return state
        },
        resetNavbar: (state: UiType) => {
            state.navbar = []
            return state
        }
    }
})
export const {
    acceptCookieBar,
    setSessionTime,
    decrementSessionTime,
    setSessionShowMessage,
    enableSpinner,
    disableSpinner,
    setGrowl,
    setStatusMessage,
    setErrorGrowl,
    resetStatus,
    setNavigateTo,
    resetNavigateTo,
    setNavbar,
    resetNavbar
} = uiSlice.actions
export default uiSlice.reducer

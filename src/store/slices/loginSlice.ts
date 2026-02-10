import {createSlice} from "@reduxjs/toolkit";
import {LoginResponse} from "@/utils/types";

export const initialStateLogin: LoginResponse = {
    cognome: "",
    email: "",
    id: "",
    nome: "",
    ruolo: ""
}

const loginSlice = createSlice({
    name: "login",
    initialState: initialStateLogin,
    reducers: {
        setLogin: (state, action) => {
            return action.payload
        },
        clearLogin: (state) => {
            return initialStateLogin
        }
    }
});

const {actions, reducer} = loginSlice
export const {setLogin} = actions
export default loginSlice.reducer

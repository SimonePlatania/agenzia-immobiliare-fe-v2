import {rootApi} from "@/api/rootApi";
import {UtenteRest} from "@/utils/constants/endpoints";
import {LoginRequest, LoginResponse, UtenteRequest, UtenteResponse} from "@/utils/types";

export const utenteApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.LOGIN_UTENTE}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
        logoutUser: build.mutation<string, void>({
            query: () => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.LOGOUT_UTENTE}`,
                method: "POST"
            }),
            invalidatesTags: ["User"]
        }),
        registrazioneUser: build.mutation<UtenteResponse, UtenteRequest>({
            query: (body) => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.REGISTRA_UTENTE}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        })
    }),
    overrideExisting: false
})

export const {
    useLoginUserMutation,
    useRegistrazioneUserMutation,
    useLogoutUserMutation
} = utenteApi

import { rootApi } from "@/api/rootApi"
import { UtenteRest } from "@/utils/constants/endpoints"
import {
    LoginRequest,
    LoginResponse,
    ModificaUtenteDTO,
    PasswordChangeRequest,
    UtenteRequest,
    UtenteResponse
} from "@/utils/types"
import { HttpMethods } from "@/utils/constants/consts"

export const utenteApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.LOGIN_UTENTE}`,
                method: HttpMethods.POST,
                body
            }),
            invalidatesTags: ["User"]
        }),
        logoutUser: build.mutation<string, void>({
            query: () => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.LOGOUT_UTENTE}`,
                method: HttpMethods.POST
            }),
            invalidatesTags: ["User"]
        }),
        registrazioneUser: build.mutation<UtenteResponse, UtenteRequest>({
            query: (body) => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.REGISTRA_UTENTE}`,
                method: HttpMethods.POST,
                body
            }),
            invalidatesTags: ["User"]
        }),
        getListaUtenti: build.query<UtenteResponse[], void>({
            query: () => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.LISTA_UTENTI}`,
                method: HttpMethods.GET
            }),
            providesTags: ["User"]
        }),
        getUtenteById: build.query<UtenteResponse, number>({
            query: (id: number) => ({
                url: `${UtenteRest.UTENTE}/${id}`,
                method: HttpMethods.GET
            }),
            providesTags: ["User"]
        }),
        modificaDatiAnagrafici: build.mutation<
            UtenteResponse,
            ModificaUtenteDTO & { id: number }
        >({
            query: ({ id, ...body }) => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.MODIFICA_DATI_ANAGRAFICI}/${id}`,
                method: HttpMethods.PUT,
                body
            }),
            invalidatesTags: ["User"]
        }),
        modificaPassword: build.mutation<void, PasswordChangeRequest>({
            query: ({ ...body }) => ({
                url: `${UtenteRest.UTENTE}${UtenteRest.MODIFICA_PASSWORD}`,
                method: HttpMethods.POST,
                body
            })
        })
    }),

    overrideExisting: false
})

export const {
    useLoginUserMutation,
    useRegistrazioneUserMutation,
    useLogoutUserMutation,
    useGetListaUtentiQuery,
    useGetUtenteByIdQuery,
    useModificaDatiAnagraficiMutation,
    useModificaPasswordMutation
} = utenteApi

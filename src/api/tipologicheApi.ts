import {rootApi} from "@/api/rootApi"
import {Tipologica} from "@/utils/types"
import {TipologicaRest} from "@/utils/constants/endpoints"

export const tipologicheApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getRuoli: build.query<Array<Tipologica<number>>, void>({
            query: () => ({
                url: `${TipologicaRest.TIPOLOGICA}${TipologicaRest.GET_TIPO_RUOLO}`,
                method: "GET"
            }),
            transformResponse: (
                response: Array<{ codice: number; descrizione: string }>
            ) => {
                return response.map((ruolo) => ({
                    key: ruolo.codice,
                    value: ruolo.descrizione
                }))
            },
            providesTags: ["Tipologiche"]
        }),
        getCitta: build.query<Array<Tipologica<number>>, void>({
            query: () => ({
                url: `${TipologicaRest.TIPOLOGICA}${TipologicaRest.GET_CITTA}`,
                method: "GET"
            }),
            transformResponse: (
                response: Array<{ codice: number; descrizione: string }>
            ) => {
                return response.map((ruolo) => ({
                    key: ruolo.codice,
                    value: ruolo.descrizione
                }))
            },
            providesTags: ["Tipologiche"]
        }),
        getTipoImmobili: build.query<Array<Tipologica<number>>, void>({
            query: () => ({
                url: `${TipologicaRest.TIPOLOGICA}${TipologicaRest.GET_TIPO_IMMOBILI}`,
                method: "GET"
            }),
            transformResponse: (
                response: Array<{ codice: number; descrizione: string }>
            ) => {
                return response.map((ruolo) => ({
                    key: ruolo.codice,
                    value: ruolo.descrizione
                }))
            },
            providesTags: ["Tipologiche"]
        }),
        getTipoAnnunci: build.query<Array<Tipologica<number>>, void>({
            query: () => ({
                url: `${TipologicaRest.TIPOLOGICA}${TipologicaRest.GET_TIPO_ANNUNCI}`,
                method: "GET"
            }),
            transformResponse: (
                response: Array<{ codice: number; descrizione: string }>
            ) => {
                return response.map((ruolo) => ({
                    key: ruolo.codice,
                    value: ruolo.descrizione
                }))
            },
            providesTags: ["Tipologiche"]
        }),
        getClienti: build.query<Array<Tipologica<string>>, void>({
            query: () => ({
                url: `${TipologicaRest.TIPOLOGICA}${TipologicaRest.GET_CLIENTI}`,
                method: "GET"
            }),
            transformResponse: (
                response: Array<{ codice: string; descrizione: string }>
            ) => {
                return response.map((ruolo) => ({
                    key: ruolo.codice,
                    value: ruolo.descrizione
                }))
            },
            providesTags: ["Tipologiche"]
        }),
    })
})

export const {
    useGetRuoliQuery,
    useGetCittaQuery,
    useGetTipoAnnunciQuery,
    useGetTipoImmobiliQuery,
    useGetClientiQuery,
} = tipologicheApi

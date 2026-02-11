import { rootApi } from "@/api/rootApi"
import { Tipologica } from "@/utils/types"
import { TipologicaRest } from "@/utils/constants/endpoints"

export const tipologicheApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getRuoli: build.query<Array<Tipologica<string>>, void>({
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
            providesTags: ["Ruoli"]
        })
    })
})

export const { useGetRuoliQuery } = tipologicheApi
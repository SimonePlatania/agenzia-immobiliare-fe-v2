import { rootApi } from "@/api/rootApi"
import { DomandaRequest, DomandaResponse } from "@/utils/types"
import { AnnuncioRest } from "@/utils/constants/endpoints"

export const domandaRispostaApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        faiDomanda: build.mutation<void, DomandaRequest>({
            query: ({ annuncioId, ...body }) => ({
                url: `${AnnuncioRest.ANNUNCIO}/${annuncioId}${AnnuncioRest.INSERISCI_DOMANDA}`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Domanda"]
        }),
        getDomandePersonali: build.query<DomandaResponse[], void>({
            query: () => ({
                url: `${AnnuncioRest.ANNUNCIO}${AnnuncioRest.GET_ALL_DOMANDE_PERSONALI}`,
                method: "GET"
            }),
            providesTags: ["Domanda"]
        })
    })
})

export const { useFaiDomandaMutation, useGetDomandePersonaliQuery } =
    domandaRispostaApi

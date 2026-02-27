import { rootApi } from "@/api/rootApi"
import { DomandaRequest } from "@/utils/types"
import { AnnuncioRest } from "@/utils/constants/endpoints"

export const domandaRispostaApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        faiDomanda: build.mutation<void, DomandaRequest>({
            query: ({ annuncioId, ...body }) => ({
                url: `${AnnuncioRest.ANNUNCIO}/${annuncioId}${AnnuncioRest.INSERISCI_DOMANDA}`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Annuncio"]
        })
    })
})

export const { useFaiDomandaMutation } = domandaRispostaApi

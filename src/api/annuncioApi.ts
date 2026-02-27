import { rootApi } from "@/api/rootApi"
import { Annuncio, RicercaRequest, RicercaResponse } from "@/utils/types"
import { AnnuncioRest, RicercaRest } from "@/utils/constants/endpoints"

export const annuncioApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        creaAnnuncio: build.mutation<void, Annuncio>({
            query: (body) => ({
                url: `${AnnuncioRest.ANNUNCIO}${AnnuncioRest.REGISTRA_ANNUNCIO}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Annuncio"]
        }),
        modificaAnnuncio: build.mutation<void, Annuncio>({
            query: (body) => ({
                url: `${AnnuncioRest.ANNUNCIO}${AnnuncioRest.MODIFICA_ANNUNCIO}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Annuncio"]
        }),
        rimuoviAnnuncio: build.mutation<string, number>({
            query: (id) => ({
                url: `${AnnuncioRest.ANNUNCIO}${AnnuncioRest.RIMUOVI_ANNUNCIO}/${id}`,
                method: "DELETE"
            })
        }),
        ricercaAnnuncio: build.mutation<
            RicercaResponse,
            {
                filtri: RicercaRequest
                page?: number
                pageSize?: number
            }
        >({
            query: ({ filtri, page, pageSize }) => ({
                url: `${RicercaRest.RICERCA}`,
                method: "POST",
                body: filtri,
                params: {
                    ...(page !== undefined && { page }),
                    ...(pageSize !== undefined && { pageSize })
                }
            }),
            invalidatesTags: ["Annuncio"]
        }),
        ricercaAnnuncioById: build.query<Annuncio, number>({
            query: (id) => ({
                url: `${AnnuncioRest.ANNUNCIO}/${id}`,
                method: "GET"
            }),
            providesTags: ["Annuncio"]
        })
    })
})

export const {
    useCreaAnnuncioMutation,
    useRicercaAnnuncioMutation,
    useRicercaAnnuncioByIdQuery,
    useModificaAnnuncioMutation,
    useRimuoviAnnuncioMutation
} = annuncioApi

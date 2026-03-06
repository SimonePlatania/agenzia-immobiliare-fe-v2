import { rootApi } from "@/api/rootApi"
import {
    Annuncio,
    RicercaRequest,
    RicercaResponse,
    UtenteResponse
} from "@/utils/types"
import { AnnuncioRest, RicercaRest } from "@/utils/constants/endpoints"

export const annuncioApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        creaAnnuncio: build.mutation<Annuncio, Annuncio>({
            query: (body) => ({
                url: `${AnnuncioRest.ANNUNCIO}${AnnuncioRest.REGISTRA_ANNUNCIO}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Annuncio"]
        }),
        uploadFoto: build.mutation<void, { idAnnuncio: number; foto: string }>({
            query: ({ idAnnuncio, foto }) => {
                const byteChars = atob(foto)
                const byteArray = new Uint8Array(byteChars.length)
                for (let i = 0; i < byteChars.length; i++) {
                    byteArray[i] = byteChars.charCodeAt(i)
                }
                const blob = new Blob([byteArray], { type: "image/*" })
                const formData = new FormData()
                formData.append("foto", blob)

                return {
                    url: `${AnnuncioRest.ANNUNCIO}/${idAnnuncio}${AnnuncioRest.UPLOAD_FOTO}`,
                    method: "POST",
                    body: formData
                }
            },
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
            })
        }),
        ricercaAnnuncioById: build.query<Annuncio, number>({
            query: (id) => ({
                url: `${AnnuncioRest.ANNUNCIO}/${id}`,
                method: "GET"
            }),
            providesTags: ["Annuncio"]
        }),
        getUtenteByIdAnnuncio: build.query<UtenteResponse, number>({
            query: (idAnnuncio) => ({
                url: `${AnnuncioRest.ANNUNCIO}/${idAnnuncio}${AnnuncioRest.DATI_UTENTE_ANNUNCIO}`,
                method: "GET"
            }),
            providesTags: ["Annuncio"]
        }),
        getUtenteByIdDomanda: build.query<UtenteResponse, number>({
            query: (idDomanda) => ({
                url: `${AnnuncioRest.ANNUNCIO}/${idDomanda}${AnnuncioRest.DATI_UTENTE_DOMANDA}`,
                method: "GET"
            }),
            providesTags: ["Annuncio"]
        })
    })
})

export const {
    useCreaAnnuncioMutation,
    useUploadFotoMutation,
    useRicercaAnnuncioMutation,
    useRicercaAnnuncioByIdQuery,
    useModificaAnnuncioMutation,
    useRimuoviAnnuncioMutation,
    useGetUtenteByIdAnnuncioQuery,
    useGetUtenteByIdDomandaQuery
} = annuncioApi

import {rootApi} from "@/api/rootApi";
import {Annuncio} from "@/utils/types";
import {AnnuncioRest} from "@/utils/constants/endpoints";

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
    })
})

export const {
    useCreaAnnuncioMutation
} = annuncioApi

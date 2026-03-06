import {
    useGetListaUtentiQuery,
    useLazyGetUtenteByIdQuery
} from "@/api/utenteApi"
import { useGetRuoliQuery } from "@/api/tipologicheApi"
import { Dispatch } from "react"
import { AnyAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { UtenteResponse } from "@/utils/types"
import { Sections } from "@/utils/constants/consts"
import { setSection } from "@/store/slices/sectionSlice"
import { setUtenteDettaglio } from "@/store/slices/utenteDettaglioSlice"
import {
    getNomeRuolo,
    getNumeroRisulati,
    scrollToTop
} from "@/utils/genericUtils"
import { disableSpinner, enableSpinner, setGrowl } from "@/store/slices/uiSlice"
import { getErrorGrowl } from "@/utils/custom-utils"
import { createErrorGrowl } from "@/custom/modal/Growl"

export const ListaUtenti = () => {
    const dispatch: Dispatch<AnyAction> = useDispatch()

    const { data: ruoli, isLoading: ruoliLoading } = useGetRuoliQuery()

    const {
        data: utenti,
        isLoading: utentiIsLoading,
        error: utentiIsError
    } = useGetListaUtentiQuery()

    const [getUtenteById] = useLazyGetUtenteByIdQuery()

    const handleModificaUtente = async (
        utente: UtenteResponse
    ): Promise<void> => {
        try {
            if (!utente.id) {
                return
            }
            dispatch(enableSpinner())
            const utenteDettaglio = await getUtenteById(
                Number(utente.id)
            ).unwrap()
            dispatch(setUtenteDettaglio(utenteDettaglio))
            dispatch(setSection(Sections.MODIFICA_UTENTE))
            scrollToTop()
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        } finally {
            dispatch(disableSpinner())
        }
    }

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Gestione anagrafica utenti</legend>
                <table className="table table-striped table-group-divider table-bordered align-middle">
                    <thead className="table-dark text-center align-middle">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cognome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Ruolo</th>
                            <th scope="col">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utenti?.map((utente: UtenteResponse) => (
                            <tr key={utente.id}>
                                <td>{utente.id}</td>
                                <td>{utente.nome}</td>
                                <td>{utente.cognome}</td>
                                <td>{utente.email}</td>
                                <td>{utente.telefono}</td>
                                <td>{getNomeRuolo(utente.ruoloId)}</td>
                                <td className={""}>
                                    <div className="d-flex gap-2 justify-content-center ">
                                        <button
                                            title="Modifica utente"
                                            className="btn btn-sm btn-mini order-3"
                                            type={"button"}
                                            onClick={() =>
                                                handleModificaUtente(utente)
                                            }
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan={12}
                                className="text-sm-center text-muted"
                            >
                                {getNumeroRisulati(utenti ?? [])}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </fieldset>
        </>
    )
}

export default ListaUtenti

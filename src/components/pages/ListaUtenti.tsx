import { useGetListaUtentiQuery, useGetUtenteByIdQuery } from "@/api/utenteApi"
import { useGetRuoliQuery } from "@/api/tipologicheApi"
import { Dispatch, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnyAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { UtenteResponse } from "@/utils/types"
import { Sections } from "@/utils/constants/consts"
import { setSection } from "@/store/slices/sectionSlice"
import { setUtenteDettaglio } from "@/store/slices/utenteDettaglioSlice"
import { scrollToTop } from "@/utils/genericUtils"

export const ListaUtenti = () => {
    const [idUtente, setIdUtente] = useState<number | null>(null)
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()
    const [utenteSelezionato, setUtenteSelezionato] =
        useState<UtenteResponse | null>(null)

    const {
        data: utenti,
        isLoading: utentiIsLoading,
        error: utentiIsError
    } = useGetListaUtentiQuery()

    const {
        data: utente,
        isLoading: utenteIsLoading,
        error: utenteIsError
    } = useGetUtenteByIdQuery(Number(utenteSelezionato?.id), {
        skip: utenteSelezionato === undefined
    })

    const { data: ruoli, isLoading: ruoliLoading } = useGetRuoliQuery()

    useEffect(() => {
        if (utente && utenteSelezionato) {
            scrollToTop()
            dispatch(setUtenteDettaglio(utente))
            dispatch(setSection(Sections.MODIFICA_UTENTE))
            setUtenteSelezionato(null)
        }
    }, [utente])

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
                                <td>{utente.ruoloId}</td>
                                <td className={""}>
                                    <div className="d-flex gap-2 justify-content-center ">
                                        <button
                                            title="Modifica utente"
                                            className="btn btn-sm btn-mini order-3"
                                            type={"button"}
                                            onClick={() => {
                                                setUtenteSelezionato(utente)
                                            }}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </fieldset>
        </>
    )
}

export default ListaUtenti

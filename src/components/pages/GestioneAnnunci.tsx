import {
    useDaiRispostaMutation,
    useGetAllDomandeQuery
} from "@/api/domandaRispostaApi"
import { Row } from "react-bootstrap"
import {
    formatDateToDMYHHMM,
    getNumeroRisulati,
    truncateString
} from "@/utils/genericUtils"
import { DomandaResponse, RispostaDTO } from "@/utils/types"
import { Dispatch, useEffect, useState } from "react"
import { AnyAction } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomModal from "@/custom/modal/CustomModal"
import { getErrorGrowl } from "@/utils/custom-utils"
import { setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { AppPaths } from "@/utils/constants/routes"
import { setAnnuncio } from "@/store/slices/annuncioSlice"
import {
    useGetUtenteByIdDomandaQuery,
    useRicercaAnnuncioByIdQuery
} from "@/api/annuncioApi"
import { setSection } from "@/store/slices/sectionSlice"
import { Sections } from "@/utils/constants/consts"
import ModalRisposta from "@/custom/modal/ModalRisposta"
import { setDomanda } from "@/store/slices/domandaSlice"
import { AppState } from "@/store/store"
import { setUtenteDettaglio } from "@/store/slices/utenteDettaglioSlice"

export const GestioneAnnunci = () => {
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()
    const [domandaPerRisposta, setDomandaPerRisposta] =
        useState<DomandaResponse | null>(null)
    const [showDomanda, setShowDomanda] = useState<boolean>(false)
    const [showRisposta, setShowRisposta] = useState<boolean>(false)
    const [domandaSelezionata, setDomandaSelezionata] = useState<
        string | null
    >()
    const [utenteSelezionato, setUtenteSelezionato] =
        useState<DomandaResponse | null>(null)
    const { annuncioId } = useSelector((state: AppState) => state.domanda)

    const {
        data: domande,
        isLoading: isLoadingDomande,
        error: domandeError
    } = useGetAllDomandeQuery()
    const { data: utente } = useGetUtenteByIdDomandaQuery(
        Number(utenteSelezionato?.id),
        { skip: utenteSelezionato?.annuncioId === undefined }
    )
    const {
        data: annuncio,
        isLoading: annuncioIsLoading,
        error: annuncioError
    } = useRicercaAnnuncioByIdQuery(Number(domandaPerRisposta?.annuncioId), {
        skip: domandaPerRisposta?.annuncioId === undefined
    })
    const [
        daiRisposta,
        { isLoading: isLoadingRisposta, error: errorRisposta }
    ] = useDaiRispostaMutation()

    const handleDettaglioAnnuncio = (id: number): void => {
        try {
            if (annuncio) {
                dispatch(setAnnuncio(annuncio))
                navigate(AppPaths.ANNUNCIO_DETTAGLIO)
                dispatch(setSection(Sections.DETTAGLIO))
            }
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        }
    }

    const handleRisposta = async (data: RispostaDTO): Promise<void> => {
        if (!domandaPerRisposta) {
            getErrorGrowl(
                dispatch,
                setGrowl,
                createErrorGrowl,
                new Error("Errore generico")
            )
            return
        }
        try {
            await daiRisposta({
                ...data,
                domandaId: domandaPerRisposta.id,
                annuncioId: domandaPerRisposta.annuncioId,
                utenteId: domandaPerRisposta.utenteId
            }).unwrap()
            dispatch(
                setGrowl(createSuccessGrowl("Risposta inviata con successo"))
            )
            setShowRisposta(false)
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
            setShowRisposta(false)
        }
    }

    useEffect(() => {
        if (domandeError) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, domandeError)
        }

        dispatch(setDomanda(domande))
    }, [domandeError, domande])

    useEffect(() => {
        if (utente && utenteSelezionato) {
            dispatch(setUtenteDettaglio(utente))
            dispatch(setSection(Sections.DETTAGLIO_UTENTE))
            setUtenteSelezionato(null)
        }
    }, [utente])

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Domande</legend>
                <Row>
                    <table className="table table-striped table-group-divider table-bordered align-middle">
                        <thead className="table-dark text-center align-middle">
                            <tr>
                                <th scope="col" style={{ width: "15%" }}>
                                    ID Annuncio
                                </th>
                                <th scope="col" style={{ width: "15%" }}>
                                    ID Utente
                                </th>
                                <th scope="col">Domanda</th>
                                <th scope="col">Data domanda</th>
                                <th scope="col">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domande?.map((domanda: DomandaResponse) => (
                                <tr key={domanda.id}>
                                    <td>{domanda?.annuncioId}</td>
                                    <td>{domanda.utenteId}</td>
                                    <td
                                        className="clickable-row"
                                        onClick={() => {
                                            setShowDomanda(true)
                                            setDomandaSelezionata(
                                                domanda.domanda
                                            )
                                        }}
                                    >
                                        {truncateString(domanda?.domanda)}
                                    </td>
                                    <td>
                                        {formatDateToDMYHHMM(
                                            domanda?.dataDomanda
                                        )}
                                    </td>
                                    <td className={""}>
                                        <div className="d-flex gap-2 justify-content-center ">
                                            <button
                                                title="Dettaglio annuncio"
                                                className="btn btn-sm btn-mini order-3"
                                                type={"button"}
                                                onClick={() => {
                                                    setDomandaPerRisposta(
                                                        domanda
                                                    )
                                                    handleDettaglioAnnuncio(
                                                        domandaPerRisposta?.annuncioId ??
                                                            0
                                                    )
                                                }}
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>
                                            <button
                                                title="Dettaglio utente"
                                                className="btn btn-sm btn-mini order-3"
                                                type={"button"}
                                                onClick={() =>
                                                    setUtenteSelezionato(
                                                        domanda
                                                    )
                                                }
                                            >
                                                <i className="bi bi-person-badge-fill"></i>
                                            </button>
                                            <button
                                                title="Rispondi"
                                                className="btn btn-sm btn-mini order-3"
                                                type={"button"}
                                                disabled={!!domanda.risposta}
                                                onClick={() => {
                                                    setDomandaPerRisposta(
                                                        domanda
                                                    )
                                                    setShowRisposta(true)
                                                }}
                                            >
                                                <i className="bi bi-reply"></i>
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
                                    {getNumeroRisulati(domande ?? [])}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Row>
            </fieldset>
            <ModalRisposta
                show={showRisposta}
                setShow={setShowRisposta}
                onConfirm={async (data: RispostaDTO) => handleRisposta(data)}
            />
            <CustomModal
                show={showDomanda}
                setShow={setShowDomanda}
                title={"Domanda"}
                textBody={domandaSelezionata}
                confirmText="Chiudi"
                onConfirm={() => setShowDomanda(false)}
            />
        </>
    )
}

export default GestioneAnnunci

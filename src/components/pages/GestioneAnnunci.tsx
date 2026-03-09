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
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomModal from "@/custom/modal/CustomModal"
import { getErrorGrowl } from "@/utils/custom-utils"
import { disableSpinner, enableSpinner, setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { AppPaths } from "@/utils/constants/routes"
import { setAnnuncio } from "@/store/slices/annuncioSlice"
import {
    useLazyGetUtenteByIdDomandaQuery,
    useLazyRicercaAnnuncioByIdQuery
} from "@/api/annuncioApi"
import { setSection } from "@/store/slices/sectionSlice"
import { Sections } from "@/utils/constants/consts"
import ModalRisposta from "@/custom/modal/ModalRisposta"
import { setDomanda } from "@/store/slices/domandaSlice"
import { setUtenteDettaglio } from "@/store/slices/utenteDettaglioSlice"

export const GestioneAnnunci = () => {
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()
    const [domandaPerRisposta, setDomandaPerRisposta] =
        useState<DomandaResponse | null>(null)
    const [showDomanda, setShowDomanda] = useState<boolean>(false)
    const [showRisposta, setShowRisposta] = useState<boolean>(false)
    const [showRispostaData, setShowRispostaData] = useState<boolean>(false)
    const [domandaSelezionata, setDomandaSelezionata] = useState<
        string | null
    >()
    const [rispostaSelezionata, setRispostaSelezionata] = useState<
        string | null
    >()
    const isRispostaInserita = (risposta: string) => {
        return risposta !== null && risposta !== ""
    }

    useState<DomandaResponse | null>(null)

    const {
        data: domande,
        isLoading: isLoadingDomande,
        error: domandeError
    } = useGetAllDomandeQuery()

    const [fetchAnnuncio] = useLazyRicercaAnnuncioByIdQuery()
    const [fetchUtente] = useLazyGetUtenteByIdDomandaQuery()

    const [
        daiRisposta,
        { isLoading: isLoadingRisposta, error: errorRisposta }
    ] = useDaiRispostaMutation()

    const handleSetAnnuncio = async (idDomanda: number): Promise<void> => {
        try {
            dispatch(enableSpinner())
            const annuncio = await fetchAnnuncio(idDomanda).unwrap()
            dispatch(setAnnuncio(annuncio))
            dispatch(setSection(Sections.DETTAGLIO))
            navigate(AppPaths.ANNUNCIO_DETTAGLIO)
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        } finally {
            dispatch(disableSpinner())
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
            dispatch(enableSpinner())
            await daiRisposta({
                ...data,
                domandaId: domandaPerRisposta.id,
                annuncioId: domandaPerRisposta.annuncioId,
                utenteId: domandaPerRisposta.utenteId
            }).unwrap()
            dispatch(setDomanda(domande))
            dispatch(
                setGrowl(createSuccessGrowl("Risposta inviata con successo"))
            )
            setShowRisposta(false)
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
            setShowRisposta(false)
        } finally {
            dispatch(disableSpinner())
        }
    }

    const handleDettaglioUtente = async (utenteId: number): Promise<void> => {
        try {
            dispatch(enableSpinner())
            const utente = await fetchUtente(utenteId).unwrap()
            dispatch(setUtenteDettaglio(utente))
            dispatch(setSection(Sections.DETTAGLIO_UTENTE))
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        } finally {
            dispatch(disableSpinner())
        }
    }

    useEffect(() => {
        if (domandeError) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, domandeError)
        }

        dispatch(setDomanda(domande))
    }, [domandeError, domande])

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
                                                onClick={() =>
                                                    handleSetAnnuncio(
                                                        domanda.annuncioId
                                                    )
                                                }
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>
                                            <button
                                                title="Dettaglio utente"
                                                className="btn btn-sm btn-mini order-3"
                                                type={"button"}
                                                onClick={() =>
                                                    handleDettaglioUtente(
                                                        domanda.id
                                                    )
                                                }
                                            >
                                                <i className="bi bi-person-badge-fill"></i>
                                            </button>
                                            {!isRispostaInserita(
                                                domanda.risposta
                                            ) ? (
                                                <button
                                                    title="Rispondi"
                                                    className="btn btn-sm btn-mini order-3"
                                                    type={"button"}
                                                    onClick={() => {
                                                        setDomandaPerRisposta(
                                                            domanda
                                                        )
                                                        setShowRisposta(true)
                                                    }}
                                                >
                                                    <i className="bi bi-reply"></i>
                                                </button>
                                            ) : (
                                                <button
                                                    title="Dettaglio risposta"
                                                    className="btn btn-sm btn-mini order-3"
                                                    type={"button"}
                                                    onClick={() => {
                                                        setRispostaSelezionata(
                                                            domanda.risposta
                                                        )
                                                        setShowRispostaData(
                                                            true
                                                        )
                                                    }}
                                                >
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </button>
                                            )}
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

            <CustomModal
                show={showRispostaData}
                setShow={setShowRispostaData}
                title={"Risposta"}
                textBody={rispostaSelezionata}
                confirmText="Chiudi"
                onConfirm={() => setShowRispostaData(false)}
            />
        </>
    )
}

export default GestioneAnnunci

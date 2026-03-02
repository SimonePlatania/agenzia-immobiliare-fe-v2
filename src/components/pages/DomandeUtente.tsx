import { useGetDomandePersonaliQuery } from "@/api/domandaRispostaApi"
import { getErrorGrowl } from "@/utils/custom-utils"
import { Dispatch, useEffect, useState } from "react"
import { setGrowl } from "@/store/slices/uiSlice"
import { useDispatch } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"
import { createErrorGrowl } from "@/custom/modal/Growl"
import { DomandaResponse } from "@/utils/types"
import { Row } from "react-bootstrap"
import {
    formatDateToDMYHHMM,
    getNumeroRisulati,
    truncateString
} from "@/utils/genericUtils"
import { useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { setSection } from "@/store/slices/sectionSlice"
import { Sections } from "@/utils/constants/consts"
import { setAnnuncio } from "@/store/slices/annuncioSlice"
import { useRicercaAnnuncioByIdQuery } from "@/api/annuncioApi"
import CustomModal from "@/custom/modal/CustomModal"

export const DomandeUtente = () => {
    const [id, setId] = useState<number | null>(null)
    const [domandaSelezionata, setDomandaSelezionata] = useState<
        string | null
    >()
    const [ripostaSelezionata, setRispostaSelezionata] = useState<
        string | null
    >()
    const [showDomandaCompleta, setShowDomandaCompleta] =
        useState<boolean>(false)
    const [showRispostaCompleta, setShowRispostaCompleta] =
        useState<boolean>(false)

    const {
        data: domande,
        isLoading: domandeIsLoading,
        error: domandeError
    } = useGetDomandePersonaliQuery()

    const {
        data: annuncio,
        isLoading: annuncioIsLoading,
        error: annuncioError
    } = useRicercaAnnuncioByIdQuery(Number(id), { skip: id === null })

    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (domandeError) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, domandeError)
        }

        if (annuncioError) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, annuncioError)
        }
    }, [domandeError])

    if (domandeIsLoading) {
        return <div>Caricamento...</div>
    }
    const handleSetAnnuncio = (): void => {
        try {
            dispatch(setSection(Sections.DETTAGLIO))
            if (annuncio) {
                dispatch(setAnnuncio(annuncio))
                navigate(AppPaths.ANNUNCIO_DETTAGLIO)
            }
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        }
    }

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Le mie domande</legend>
                <Row>
                    <table className="table table-striped table-group-divider table-bordered align-middle">
                        <thead className="table-dark text-center align-middle">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Titolo annuncio</th>
                                <th scope="col">Data domanda</th>
                                <th scope="col">Domanda</th>
                                <th scope="col">Risposta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domande?.map((domanda: DomandaResponse) => (
                                <tr key={domanda.id}>
                                    <td
                                        className="clickable-row"
                                        onClick={() => {
                                            setId(domanda.annuncioId)
                                            handleSetAnnuncio()
                                        }}
                                    >
                                        {domanda.id}
                                    </td>
                                    <td>{domanda.titoloAnnuncio}</td>
                                    <td>
                                        {formatDateToDMYHHMM(
                                            domanda.dataDomanda
                                        )}
                                    </td>
                                    <td
                                        className="clickable-row"
                                        onClick={() => {
                                            setDomandaSelezionata(
                                                domanda.domanda
                                            )
                                            setShowDomandaCompleta(true)
                                        }}
                                    >
                                        {truncateString(domanda.domanda)}
                                    </td>
                                    <td
                                        className={
                                            domanda.risposta !== null
                                                ? "clickable-row"
                                                : "text-muted"
                                        }
                                        onClick={() => {
                                            setRispostaSelezionata(
                                                domanda.risposta
                                            )
                                            ripostaSelezionata !== null &&
                                                setShowRispostaCompleta(true)
                                        }}
                                    >
                                        {domanda.risposta !== null
                                            ? truncateString(domanda.risposta)
                                            : "Nessuna risposta"}
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

            <CustomModal
                show={showDomandaCompleta}
                setShow={setShowDomandaCompleta}
                title={"Domanda"}
                textBody={domandaSelezionata}
                confirmText="Chiudi"
                onConfirm={() => setShowDomandaCompleta(false)}
            />

            <CustomModal
                show={showRispostaCompleta}
                setShow={setShowRispostaCompleta}
                title={"Risposta"}
                textBody={ripostaSelezionata}
                confirmText="Chiudi"
                onConfirm={() => setShowRispostaCompleta(false)}
            />
        </>
    )
}

export default DomandeUtente

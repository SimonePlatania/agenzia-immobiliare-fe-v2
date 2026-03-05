import { useForm, UseFormProps } from "react-hook-form"
import { Annuncio, RicercaRequest } from "@/utils/types"
import {
    useGetCittaQuery,
    useGetTipoAnnunciQuery,
    useGetTipoImmobiliQuery
} from "@/api/tipologicheApi"
import { useDispatch, useSelector } from "react-redux"
import { disableSpinner, enableSpinner, setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes, Ruolo, Sections } from "@/utils/constants/consts"
import { STATI } from "@/utils/utils"
import {
    useRicercaAnnuncioMutation,
    useRimuoviAnnuncioMutation
} from "@/api/annuncioApi"
import { initialStateRicerca } from "@/store/slices/ricercaAnnuncioSlice"
import {
    rimuoviAnnuncioDaLista,
    setListaAnnunci
} from "@/store/slices/listaAnnunciSlice"
import { Dispatch, useState } from "react"
import {
    cleanFiltri,
    findByTipologica,
    getNumeroRisulati,
    scrollToTop
} from "@/utils/genericUtils"
import { setAnnuncio } from "@/store/slices/annuncioSlice"
import { useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { setSection } from "@/store/slices/sectionSlice"
import { AppState } from "@/store/store"
import CustomModal from "@/custom/modal/CustomModal"
import { AnyAction } from "@reduxjs/toolkit"
import { getErrorGrowl } from "@/utils/custom-utils"

const formConfig: UseFormProps<RicercaRequest> = {
    defaultValues: {
        tipologiaAnnuncioId: "",
        tipologiaImmobileId: "",
        prezzoDa: "",
        prezzoAl: "",
        dataDal: "",
        dataAl: "",
        mqMinimi: "",
        stanzeMinime: "",
        piano: "",
        citta: "",
        ascensore: "",
        garage: "",
        terrazzo: "",
        postoAuto: "",
        zona: "",
        speseAggiuntive: "",
        titolo: ""
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    }
}

export const RicercaAnnuncio = () => {
    const { data: tipologieAnnunci, isLoading: tipologieAnnunciLoading } =
        useGetTipoAnnunciQuery()
    const { data: tipologieImmobili, isLoading: tipologieImmobiliLoading } =
        useGetTipoImmobiliQuery()
    const { data: getCitta, isLoading: getCittaLoading } = useGetCittaQuery()
    const [ricerca, { isLoading, error }] = useRicercaAnnuncioMutation()
    const [rimuoviAnnuncio, { isLoading: isLoadingRimuoviAnnuncio }] =
        useRimuoviAnnuncioMutation()

    const { ruolo } = useSelector((state: AppState) => state.utente)
    const listaPositiva = useSelector((state: AppState) => state.listaAnnunci)
    const form = useForm<RicercaRequest>(formConfig)
    const [ricercaEffettuata, setRicercaEffettuata] = useState<boolean>(false)
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [annuncioSelezionato, setAnnuncioSelezionato] =
        useState<Annuncio | null>(null)

    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE
    const isListaPositiva: boolean = listaPositiva.length > 0

    const handleReset = () => {
        form.reset(initialStateRicerca)
        dispatch(setListaAnnunci([]))
        scrollToTop()
    }

    const handleRicercaAnnunci = async (): Promise<void> => {
        try {
            dispatch(enableSpinner())
            const response = await ricerca({
                filtri: cleanFiltri(form.getValues()),
                page: 0,
                pageSize: 100
            }).unwrap()
            setRicercaEffettuata(true)
            dispatch(setListaAnnunci(response.annunci))
            dispatch(
                setGrowl(createSuccessGrowl("Ricerca effettuata con successo"))
            )
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
            dispatch(setListaAnnunci([]))
        } finally {
            dispatch(disableSpinner())
        }
    }

    const handleDettaglio = (annuncio: Annuncio) => {
        dispatch(setAnnuncio(annuncio))
        dispatch(setSection(Sections.DETTAGLIO))
        scrollToTop()
        navigate(AppPaths.ANNUNCIO_DETTAGLIO)
    }

    const handleModifica = (annuncio: Annuncio) => {
        dispatch(setAnnuncio(annuncio))
        scrollToTop()
        dispatch(setSection(Sections.MODIFICA))
        navigate(AppPaths.ANNUNCIO_DETTAGLIO)
    }

    const handleCancellaAnnuncio = async (
        annuncio: Annuncio
    ): Promise<void> => {
        try {
            await rimuoviAnnuncio(annuncio.id!).unwrap()
            dispatch(rimuoviAnnuncioDaLista(annuncio.id!))
            dispatch(
                setGrowl(createSuccessGrowl("Annuncio cancellato con successo"))
            )
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        }
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(handleRicercaAnnunci)}>
                <fieldset className="fieldset-bordered fieldset-main mt-5">
                    <legend>Ricerca annunci</legend>
                    <fieldset className="fieldset-bordered mt-1">
                        <legend>Specifiche</legend>
                        <Row>
                            <Col sm={12} md={8}>
                                <CustomInput
                                    field="titolo"
                                    descr="Titolo"
                                    placeholder="Inserisci il titolo dell'annuncio"
                                    type={InputTypes.TEXT}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={4}>
                                <CustomInput
                                    field="citta"
                                    descr="Città"
                                    type={InputTypes.SELECT}
                                    form={form}
                                    options={getCitta ?? []}
                                    isLoading={getCittaLoading}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Tipologia</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="tipologiaImmobileId"
                                    descr="Tipologia immobile"
                                    type={InputTypes.SELECT}
                                    options={tipologieImmobili ?? []}
                                    isLoading={tipologieImmobiliLoading}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="tipologiaAnnuncioId"
                                    descr="Tipologia annuncio"
                                    type={InputTypes.SELECT}
                                    options={tipologieAnnunci ?? []}
                                    isLoading={tipologieAnnunciLoading}
                                    form={form}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Prezzo</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="prezzoDa"
                                    descr="Prezzo (Da)"
                                    placeholder="Inserisci il prezzo minimo"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="prezzoAl"
                                    descr="Prezzo (A)"
                                    placeholder="Inserisci il prezzo massimo"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Data pubblicazione</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="dataDal"
                                    descr="Data di pubblicazione (Dal)"
                                    type={InputTypes.DATE}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="dataAl"
                                    descr="Data di pubblicazione (Al)"
                                    type={InputTypes.DATE}
                                    form={form}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Caratteristiche tecniche</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="zona"
                                    descr="Zona"
                                    placeholder="Inserisci la zona"
                                    type={InputTypes.TEXT}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={3}>
                                <CustomInput
                                    field="mqMinimi"
                                    descr="MQ minimi"
                                    placeholder="Inserisci la MQ minima"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={3}>
                                <CustomInput
                                    field="piano"
                                    descr="Piano"
                                    placeholder={"Inserisci il piano"}
                                    type={InputTypes.NUMBER}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="stanzeMinime"
                                    descr="Stanze minime"
                                    placeholder={
                                        "Inserisci il numero minimo di stanze"
                                    }
                                    type={InputTypes.NUMBER}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="speseAggiuntive"
                                    descr="Spese"
                                    placeholder={
                                        "Inserisci le spese aggiuntive"
                                    }
                                    type={InputTypes.NUMBER}
                                    form={form}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Servizi e dotazioni</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="ascensore"
                                    descr="Ascensore"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="garage"
                                    descr="Garage"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="terrazzo"
                                    descr="Terrazzo"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="postoAuto"
                                    descr="Posto auto"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                />
                            </Col>
                        </Row>
                    </fieldset>

                    <Row>
                        <Col
                            xs={12}
                            className="d-flex justify-content-center mt-4 mb-5"
                        >
                            <button
                                className="btn btn-general btn-primary px-4 order-1"
                                type="submit"
                                disabled={isLoading}
                            >
                                <i className="bi bi-search"></i>
                                {isLoading
                                    ? " Creazione..."
                                    : " RICERCA ANNUNCIO"}
                            </button>
                            <button
                                className="btn btn-general btn-primary px-4 order-2"
                                type="button"
                                onClick={handleReset}
                                disabled={isLoading}
                            >
                                <i className="bi bi-eraser-fill me-2"></i>
                                {isLoading ? "Pulizia..." : "PULISCI CAMPI"}
                            </button>
                        </Col>
                    </Row>

                    {isListaPositiva && (
                        <fieldset
                            className="fieldset-bordered fieldset-main mt-1"
                            style={{ overflowX: "auto" }}
                        >
                            <legend>Risultati ricerca</legend>
                            <Row>
                                <table className="table table-striped table-group-divider table-bordered align-middle">
                                    <thead className="table-dark text-center align-middle">
                                        <tr>
                                            {isAdmin && <th scope="col">ID</th>}
                                            <th scope="col">
                                                Tipologia annuncio
                                            </th>
                                            <th scope="col">
                                                Tipologia immobile
                                            </th>
                                            <th scope="col">Titolo</th>
                                            <th scope="col">Città - Zona</th>
                                            <th scope="col">Prezzo</th>
                                            <th scope="col">MQ</th>
                                            <th scope="col">Piano</th>
                                            <th scope="col">Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPositiva.map(
                                            (annuncio: Annuncio) => (
                                                <tr key={annuncio.id}>
                                                    {isAdmin && (
                                                        <td>{annuncio.id}</td>
                                                    )}
                                                    <td>
                                                        {findByTipologica(
                                                            tipologieAnnunci ??
                                                                [],
                                                            annuncio.tipologiaAnnuncioId
                                                        )}
                                                    </td>
                                                    <td>
                                                        {findByTipologica(
                                                            tipologieImmobili ??
                                                                [],
                                                            annuncio.tipologiaImmobileId
                                                        )}
                                                    </td>
                                                    <td>{annuncio.titolo}</td>
                                                    <td>
                                                        {findByTipologica(
                                                            getCitta ?? [],
                                                            annuncio.cittaId
                                                        )}
                                                        {""} - {annuncio.zona}
                                                    </td>
                                                    <td>
                                                        {annuncio.prezzo.toLocaleString(
                                                            undefined,
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}
                                                        €
                                                    </td>
                                                    <td>{annuncio.mq}</td>
                                                    <td>{annuncio.piano}</td>
                                                    <td className={""}>
                                                        <div className="d-flex gap-2 justify-content-center ">
                                                            <button
                                                                title="Dettaglio annuncio"
                                                                className="btn btn-sm btn-mini order-3"
                                                                type={"button"}
                                                                onClick={() =>
                                                                    handleDettaglio(
                                                                        annuncio
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-search"></i>
                                                            </button>
                                                            {isAdmin && (
                                                                <>
                                                                    <>
                                                                        <button
                                                                            title="Modifica annuncio"
                                                                            className="btn btn-sm btn-mini order-3"
                                                                            type={
                                                                                "button"
                                                                            }
                                                                            onClick={() =>
                                                                                handleModifica(
                                                                                    annuncio
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="bi bi-pencil-square"></i>
                                                                        </button>
                                                                        <button
                                                                            title="Cancella annuncio"
                                                                            className="btn btn-sm btn-mini order-3"
                                                                            type={
                                                                                "button"
                                                                            }
                                                                            onClick={() => {
                                                                                setAnnuncioSelezionato(
                                                                                    annuncio
                                                                                )
                                                                                setShow(
                                                                                    true
                                                                                )
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-trash3"></i>
                                                                        </button>
                                                                    </>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td
                                                colSpan={12}
                                                className="text-sm-center text-muted"
                                            >
                                                {getNumeroRisulati(
                                                    listaPositiva ?? []
                                                )}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Row>
                        </fieldset>
                    )}
                </fieldset>
            </form>
            {annuncioSelezionato && (
                <CustomModal
                    show={show}
                    setShow={setShow}
                    title="Attenzione"
                    textBody="Sei sicuro di voler cancellare questo annuncio?"
                    confirmText="Conferma"
                    cancelText="Annulla"
                    onConfirm={async (): Promise<void> => {
                        await handleCancellaAnnuncio(annuncioSelezionato)
                        setAnnuncioSelezionato(null)
                    }}
                />
            )}
        </>
    )
}

export default RicercaAnnuncio

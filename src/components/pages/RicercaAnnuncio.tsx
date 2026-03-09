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
import { rimuoviAnnuncioDaLista } from "@/store/slices/listaAnnunciSlice"
import { Dispatch, useState } from "react"
import {
    cleanFiltri,
    findByTipologica,
    getNomePiano,
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
import {
    resetAnnunci,
    setAnnunci
} from "@/store/slices/annunciPaginazioneSlice"
import PaginazioneCustom from "@/custom/utils/PaginationCustom"
import ModalFoto from "@/custom/modal/ModalFoto"

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
    const { annunci: listaPositiva, paginazione } = useSelector(
        (state: AppState) => state.annunciPaginazione
    )
    const form = useForm<RicercaRequest>(formConfig)
    const [ricercaEffettuata, setRicercaEffettuata] = useState<boolean>(false)
    const [fotoModal, setFotoModal] = useState<string | null>(null)

    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [annuncioSelezionato, setAnnuncioSelezionato] =
        useState<Annuncio | null>(null)

    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE
    const isListaPositiva: boolean = listaPositiva.length > 0

    const handleReset = () => {
        form.reset(initialStateRicerca)
        dispatch(resetAnnunci())
        scrollToTop()
    }

    const handleRicercaAnnunci = async (page: number = 0): Promise<void> => {
        try {
            dispatch(enableSpinner())
            const response = await ricerca({
                filtri: cleanFiltri(form.getValues()),
                page: 0,
                pageSize: 100
            }).unwrap()
            dispatch(
                setAnnunci({
                    annunci: response.annunci,
                    paginazione: response.paginazione
                })
            )
            setRicercaEffettuata(true)
            dispatch(
                setGrowl(createSuccessGrowl("Ricerca effettuata con successo"))
            )
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
            dispatch(resetAnnunci())
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
            <>
                <form
                    onSubmit={form.handleSubmit(() => handleRicercaAnnunci())}
                >
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
                                        ? " RICERCA IN CORSO..."
                                        : " RICERCA ANNUNCIO"}
                                </button>
                                <button
                                    className="btn btn-general-secondary btn-primary px-4 order-2"
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isLoading}
                                >
                                    <i className="bi bi-eraser-fill me-2"></i>
                                    PULISCI CAMPI
                                </button>
                            </Col>
                        </Row>

                        {isListaPositiva && (
                            <fieldset
                                className="fieldset-bordered fieldset-main mt-1"
                                style={{ overflowX: "auto" }}
                            >
                                <legend>Risultati ricerca</legend>
                                <Row className="g-3 mb-4">
                                    {listaPositiva.map((annuncio: Annuncio) => (
                                        <Col sm={12} md={6} key={annuncio.id}>
                                            <div className="card h-100">
                                                {annuncio.foto && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFotoModal(
                                                                annuncio.foto!
                                                            )
                                                        }
                                                        style={{
                                                            padding: 0,
                                                            border: "none",
                                                            background: "none",
                                                            display: "block",
                                                            width: "100%"
                                                        }}
                                                    >
                                                        <img
                                                            src={annuncio.foto}
                                                            alt={
                                                                annuncio.titolo
                                                            }
                                                            className="card-img-top"
                                                            style={{
                                                                height: "180px",
                                                                objectFit:
                                                                    "cover",
                                                                cursor: "pointer"
                                                            }}
                                                        />
                                                    </button>
                                                )}
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h5 className="card-title">
                                                            {annuncio.titolo}
                                                        </h5>

                                                        <span
                                                            className={
                                                                annuncio.tipologiaAnnuncioId ===
                                                                1
                                                                    ? "badge bg-warning text-dark"
                                                                    : "badge bg-success text-white"
                                                            }
                                                        >
                                                            {findByTipologica(
                                                                tipologieAnnunci ??
                                                                    [],
                                                                annuncio.tipologiaAnnuncioId
                                                            )}
                                                        </span>
                                                    </div>

                                                    <p className="text-muted small mt-2">
                                                        <i className="bi bi-geo-alt me-1"></i>
                                                        {findByTipologica(
                                                            getCitta ?? [],
                                                            annuncio.cittaId
                                                        )}
                                                        {" - "}
                                                        {annuncio.zona}
                                                    </p>

                                                    <div className="d-flex gap-3 flex-wrap mb-3">
                                                        <span>
                                                            <i className="bi bi-house me-2"></i>
                                                            {findByTipologica(
                                                                tipologieImmobili ??
                                                                    [],
                                                                annuncio.tipologiaImmobileId
                                                            )}
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-rulers me-2"></i>
                                                            {annuncio.mq} m²
                                                        </span>

                                                        <span>
                                                            <i className="bi bi-layers me-2"></i>
                                                            {getNomePiano(
                                                                annuncio.piano
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                                        <strong className="text-primary-emphasis fs-5">
                                                            {annuncio.prezzo.toLocaleString(
                                                                undefined,
                                                                {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                }
                                                            )}
                                                            €
                                                        </strong>

                                                        <div className="d-flex gap-2">
                                                            <button
                                                                title="Dettaglio annuncio"
                                                                className="btn btn-sm btn-mini"
                                                                type="button"
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
                                                                    <button
                                                                        title="Modifica annuncio"
                                                                        className="btn btn-sm btn-mini"
                                                                        type="button"
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
                                                                        className="btn btn-sm btn-mini"
                                                                        type="button"
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
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                {listaPositiva.length > 0 && (
                                    <PaginazioneCustom
                                        currentPage={paginazione.numPagina}
                                        totalItems={paginazione.countElementi}
                                        allPages={paginazione.pagineTotali}
                                        onPageChange={(newPage) =>
                                            handleRicercaAnnunci(newPage)
                                        }
                                    />
                                )}
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
            <ModalFoto fotoModal={fotoModal} setFotoModal={setFotoModal} />
        </>
    )
}

export default RicercaAnnuncio

import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { Annuncio, DomandaRequest } from "@/utils/types"
import { Dispatch, useEffect, useState } from "react"
import {
    useGetCittaQuery,
    useGetClientiQuery,
    useGetTipoAnnunciQuery,
    useGetTipoImmobiliQuery
} from "@/api/tipologicheApi"
import {
    useCreaAnnuncioMutation,
    useModificaAnnuncioMutation
} from "@/api/annuncioApi"
import { Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes, Ruolo, Sections } from "@/utils/constants/consts"
import {
    initialStateAnnuncio,
    resetAnnuncio,
    setAnnuncio
} from "@/store/slices/annuncioSlice"
import { useDispatch, useSelector } from "react-redux"
import { disableSpinner, enableSpinner, setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { STATI } from "@/utils/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { annuncioSchema } from "@/components/yupSchemas/yupSchema"
import { useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { scrollToBottom, scrollToTop } from "@/utils/genericUtils"
import { aggiornaListaAnnunci } from "@/store/slices/listaAnnunciSlice"
import { resetSection, setSection } from "@/store/slices/sectionSlice"
import { AppState } from "@/store/store"
import ModalDomanda from "@/custom/modal/ModalDomanda"
import CustomModal from "@/custom/modal/CustomModal"
import {
    useFaiDomandaMutation,
    useGetDomandePersonaliQuery
} from "@/api/domandaRispostaApi"
import { AnyAction } from "@reduxjs/toolkit"
import { getErrorGrowl } from "@/utils/custom-utils"

const formConfig: UseFormProps<Annuncio> = {
    defaultValues: {
        titolo: "",
        descrizione: "",
        cittaId: 0,
        utenteId: 0,
        tipologiaImmobileId: 0,
        tipologiaAnnuncioId: 0,
        zona: "",
        mq: 0,
        numeroStanze: 0,
        speseAggiuntive: 0,
        prezzo: 0,
        piano: 0,
        esisteAscensore: "",
        esisteGarage: "",
        esistePostoAutoAssegnato: "",
        esisteTerrazzo: ""
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    },
    resolver: yupResolver(annuncioSchema),
    mode: "onChange"
}

const CreazioneAnnuncio = () => {
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()
    const domanda = useSelector((state: AppState) => state.domanda)

    const [creaAnnuncio, { isLoading, error }] = useCreaAnnuncioMutation()
    const { data: tipologieAnnunci, isLoading: tipologieAnnunciLoading } =
        useGetTipoAnnunciQuery()
    const { data: tipologieImmobili, isLoading: tipologieImmobiliLoading } =
        useGetTipoImmobiliQuery()
    const { data: getCitta, isLoading: getCittaLoading } = useGetCittaQuery()
    const { data: getClienti, isLoading: getClientiLoading } =
        useGetClientiQuery()
    const [modificaAnnuncio, { isLoading: isLoadingModifica }] =
        useModificaAnnuncioMutation()
    const [faiDomanda, { isLoading: isLoadingDomanda }] =
        useFaiDomandaMutation()

    const form: UseFormReturn<any> = useForm<Annuncio>(formConfig)
    const { id } = useSelector((state: AppState) => state.utente)
    const annuncioInStore = useSelector((state: AppState) => state.annuncio)
    const section = useSelector((state: AppState) => state.section)
    const { ruolo } = useSelector((state: AppState) => state.utente)
    const [showDomanda, setshowDomanda] = useState(false)
    const [showAnnuncio, setShowAnnuncio] = useState(false)

    const {
        data: domande,
        isLoading: domandeIsLoading,
        error: domandeError
    } = useGetDomandePersonaliQuery()

    const isEditMode: boolean = section === Sections.MODIFICA
    const isViewMode: boolean = section === Sections.DETTAGLIO
    const isReadOnly: boolean = isViewMode
    const isModifyMode: boolean = isEditMode
    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE
    const isUtente: boolean = ruolo === Ruolo.UTENTE

    const isDomandaGiaInviata = (): boolean => {
        if (!domande || !annuncioInStore?.id || !id) return false

        return domande.some(
            (d) =>
                String(d?.utenteId) === String(id) &&
                String(d?.annuncioId) === String(annuncioInStore.id)
        )
    }

    const {
        formState: { isValid }
    } = form

    const handleAnnuncio = async (): Promise<void> => {
        try {
            const values = form.watch()
            await creaAnnuncio(values).unwrap()
            dispatch(aggiornaListaAnnunci(values))
            dispatch(
                setGrowl(createSuccessGrowl("Annuncio creato con successo"))
            )
            scrollToTop()
        } catch (err: unknown) {
            setShowAnnuncio(false)
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        }
    }

    const handleReset = () => {
        form.reset(initialStateAnnuncio)
        scrollToTop()
    }

    useEffect(() => {
        if (isViewMode || isEditMode) {
            form.reset(annuncioInStore)
        }

        return () => {
            dispatch(resetAnnuncio())
        }
    }, [])

    const handleRitornaRicerca = () => {
        dispatch(resetAnnuncio())
        dispatch(setSection(Sections.RICERCA))
        scrollToTop()
        navigate(AppPaths.RICERCA_MODIFICA)
    }

    const handleModifica = async (data: Annuncio): Promise<void> => {
        if (isLoading || !isValid) {
            return
        }
        dispatch(enableSpinner())
        try {
            await modificaAnnuncio(data).unwrap()
            dispatch(resetSection())
            dispatch(setAnnuncio(data))
            dispatch(aggiornaListaAnnunci(data))
            dispatch(
                setGrowl(createSuccessGrowl("Modifica effettuata con successo"))
            )
            scrollToTop()
            setShowAnnuncio(true)
            navigate(AppPaths.RICERCA_MODIFICA)
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
        } finally {
            dispatch(disableSpinner())
        }
    }

    const handleAnnullaModifica = () => {
        form.reset(annuncioInStore)
        scrollToBottom()
        dispatch(resetSection())
        navigate(AppPaths.RICERCA_MODIFICA)
    }

    const handleDomanda = async (data: DomandaRequest): Promise<void> => {
        try {
            await faiDomanda({
                ...data,
                annuncioId: annuncioInStore.id,
                utenteId: id
            }).unwrap()

            dispatch(
                setGrowl(createSuccessGrowl("Domanda effettuata con successo"))
            )
            scrollToTop()
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
            dispatch(setSection(Sections.RICERCA))
            navigate(AppPaths.RICERCA_MODIFICA)
            scrollToTop()
        }
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(handleModifica)}>
                <fieldset className="fieldset-bordered fieldset-main mt-5">
                    <legend>
                        {isReadOnly
                            ? "Dettaglio annuncio"
                            : isModifyMode
                            ? "Modifica annuncio"
                            : "Inserimento annuncio"}
                    </legend>

                    <fieldset className="fieldset-bordered mt-1">
                        <legend>Presentazione annuncio</legend>
                        <Row>
                            <Col sm={12} md={isReadOnly ? 12 : 6}>
                                <CustomInput
                                    field="titolo"
                                    descr="Titolo*"
                                    placeholder="Inserisci il titolo dell'annuncio"
                                    type={InputTypes.TEXT}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>

                            {!isReadOnly && (
                                <Col sm={12} md={6}>
                                    <CustomInput
                                        field="descrizione"
                                        descr="Foto immobile"
                                        placeholder="Inserisci foto dell'immobile"
                                        type={InputTypes.FILE}
                                        form={form}
                                        readOnly={isReadOnly}
                                    />
                                </Col>
                            )}

                            <Col sm={12} md={10}>
                                <CustomInput
                                    field="descrizione"
                                    descr="Descrizione"
                                    placeholder={
                                        isReadOnly
                                            ? "Nessuna descrizione disponibile"
                                            : "Inserisci la descrizione dell'annuncio"
                                    }
                                    type={InputTypes.TEXTAREA}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={2}>
                                <CustomInput
                                    field="prezzo"
                                    descr="Prezzo*"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className="fieldset-bordered mt-4">
                        <legend>Classificazione e posizione</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="cittaId"
                                    descr="Città*"
                                    type={InputTypes.SELECT}
                                    form={form}
                                    options={getCitta ?? []}
                                    isLoading={getCittaLoading}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="utenteId"
                                    descr="Utente*"
                                    type={InputTypes.SELECT}
                                    form={form}
                                    options={getClienti ?? []}
                                    isLoading={getClientiLoading}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="tipologiaImmobileId"
                                    descr="Tipo di immobile*"
                                    type={InputTypes.SELECT}
                                    form={form}
                                    options={tipologieImmobili ?? []}
                                    isLoading={tipologieImmobiliLoading}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="tipologiaAnnuncioId"
                                    descr="Tipo di annuncio*"
                                    type={InputTypes.SELECT}
                                    form={form}
                                    options={tipologieAnnunci ?? []}
                                    isLoading={tipologieAnnunciLoading}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                        </Row>
                    </fieldset>

                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Caratteristiche tecniche</legend>
                        <Row>
                            <Col sm={12} md={8}>
                                <CustomInput
                                    field="zona"
                                    descr="Zona*"
                                    placeholder="Inserisci la zona"
                                    type={InputTypes.TEXT}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={4}>
                                <CustomInput
                                    field="mq"
                                    descr="MQ*"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={4}>
                                <CustomInput
                                    field="numeroStanze"
                                    descr="Numero stanze*"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={4}>
                                <CustomInput
                                    field="piano"
                                    descr="Piano"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={4}>
                                <CustomInput
                                    field="speseAggiuntive"
                                    descr="Spese"
                                    type={InputTypes.NUMBER}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                        </Row>
                    </fieldset>

                    <fieldset className={"fieldset-bordered mt-4"}>
                        <legend>Servizi e dotazioni</legend>
                        <Row>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="esisteAscensore"
                                    descr="Ascensore*"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="esisteGarage"
                                    descr="Garage*"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="esistePostoAutoAssegnato"
                                    descr="Posto auto assegnato*"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            <Col sm={12} md={6}>
                                <CustomInput
                                    field="esisteTerrazzo"
                                    descr="Terrazzo*"
                                    type={InputTypes.SELECT}
                                    options={STATI}
                                    form={form}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                        </Row>
                    </fieldset>

                    <fieldset className="fieldset-bordered mt-4">
                        <Row>
                            <i className="text-center small text-muted">
                                I campi contrassegnati con l’asterisco (*) sono
                                obbligatori
                            </i>
                        </Row>
                    </fieldset>
                    <Row>
                        <Col
                            sm={12}
                            md={12}
                            className="d-flex justify-content-center mt-4 mb-5"
                        >
                            {!isViewMode && !isEditMode && (
                                <>
                                    <button
                                        className="btn btn-general btn-primary px-4 order-1"
                                        type="submit"
                                        disabled={isLoading || !isValid}
                                        onClick={async (): Promise<void> => {
                                            // const isValid = await form.trigger()
                                            // if (isValid) setShowAnnuncio(true)
                                            // navigate(AppPaths.RICERCA_MODIFICA)
                                        }}
                                    >
                                        <i className="bi bi-plus-circle-dotted"></i>
                                        {isLoading
                                            ? " Inserimento..."
                                            : " INSERISCI ANNUNCIO"}
                                    </button>
                                    <button
                                        className="btn-general btn btn-primary px-4 order-2"
                                        type="button"
                                        onClick={handleReset}
                                        disabled={isLoading}
                                    >
                                        <i className="bi bi-eraser-fill me-2"></i>
                                        {isLoading
                                            ? "Pulizia..."
                                            : "PULISCI CAMPI"}
                                    </button>
                                </>
                            )}
                            {isReadOnly && (
                                <>
                                    <button
                                        className="btn btn-general btn-primary px-4 order-2"
                                        type="button"
                                        onClick={handleRitornaRicerca}
                                    >
                                        TORNA ALLA RICERCA
                                    </button>

                                    {isUtente && (
                                        <button
                                            className={
                                                "btn btn-general btn-primary"
                                            }
                                            disabled={isDomandaGiaInviata()}
                                            type="button"
                                            onClick={() => setshowDomanda(true)}
                                        >
                                            <i className="bi bi-arrow-90deg-right"></i>{" "}
                                            FAI DOMANDA
                                        </button>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <button
                                                className="btn btn-general btn-primary px-4 order-1"
                                                type="submit"
                                                onClick={() =>
                                                    dispatch(
                                                        setSection(
                                                            Sections.MODIFICA
                                                        )
                                                    )
                                                }
                                            >
                                                <i className="bi bi-pencil-square"></i>{" "}
                                                MODIFICA
                                            </button>
                                        </>
                                    )}
                                </>
                            )}

                            {isModifyMode && (
                                <>
                                    <button
                                        className="btn btn-general btn-primary px-4 order-1"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Salvataggio..."
                                            : "SALVA MODIFICHE"}
                                    </button>

                                    <button
                                        className="btn btn-general btn-primary px-4 order-3"
                                        type="button"
                                        onClick={handleAnnullaModifica}
                                    >
                                        <i className="bi bi-skip-backward-btn-fill"></i>{" "}
                                        INDIETRO
                                    </button>
                                </>
                            )}
                        </Col>
                    </Row>
                </fieldset>
            </form>

            <ModalDomanda
                show={showDomanda}
                setShow={setshowDomanda}
                onConfirm={async (data: DomandaRequest): Promise<void> => {
                    await handleDomanda(data)
                    setshowDomanda(false)
                }}
            />
            <CustomModal
                show={showAnnuncio}
                setShow={setShowAnnuncio}
                title="Attenzione"
                textBody="Stai per creare l'annuncio, vuoi procedere?"
                confirmText="Conferma"
                cancelText="Annulla"
                onConfirm={async (): Promise<void> => {
                    await handleAnnuncio()
                    setShowAnnuncio(false)
                }}
            />
        </>
    )
}

export default CreazioneAnnuncio

import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { Annuncio } from "@/utils/types"
import { useEffect, useState } from "react"
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
import { InputTypes } from "@/utils/constants/consts"
import {
    initialStateAnnuncio,
    resetAnnuncio,
    setAnnuncio
} from "@/store/slices/annuncioSlice"
import { useDispatch, useSelector } from "react-redux"
import { setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { STATI } from "@/utils/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { annuncioSchema } from "@/components/yupSchemas/yupSchema"
import { useLocation, useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { scrollToTop } from "@/utils/genericUtils"

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
    resolver: yupResolver(annuncioSchema)
}

const CreazioneAnnuncio = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

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

    const annuncioInStore = useSelector((state: any) => state.annuncio)
    const form: UseFormReturn<any> = useForm<Annuncio>(formConfig)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isEditMode, setIsEditMode] = useState<boolean>(
        location.state?.isEditMode ?? false
    )

    const isViewMode: boolean = annuncioInStore.id > 0
    const isReadOnly = isViewMode && !isEditMode
    const isModifyMode = isViewMode && isEditMode

    const handleAnnuncio = async () => {
        try {
            await creaAnnuncio(form.watch()).unwrap()
            dispatch(
                setGrowl(createSuccessGrowl("Annuncio creato con successo"))
            )
            scrollToTop()
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
        }
    }

    const handleReset = () => {
        form.reset(initialStateAnnuncio)
    }

    useEffect(() => {
        if (isViewMode) {
            form.reset(annuncioInStore)
        }

        return () => {
            dispatch(resetAnnuncio())
        }
    }, [])

    const handleRitornaRicerca = () => {
        dispatch(resetAnnuncio())
        scrollToTop()
        navigate(AppPaths.RICERCA_MODIFICA)
    }

    const handleModifica = async (data: Annuncio) => {
        try {
            await modificaAnnuncio(data).unwrap()
            setIsEditMode(false)
            dispatch(setAnnuncio(data))
            dispatch(
                setGrowl(createSuccessGrowl("Modifica effettuata con successo"))
            )
            scrollToTop()
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
        }
    }

    function handleAnnullaModifica() {
        form.reset(annuncioInStore)
        scrollToTop()
        setIsEditMode(false)
        navigate(AppPaths.RICERCA_MODIFICA)
    }

    const handleSubmit = isEditMode ? handleModifica : handleAnnuncio

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>
                    {isReadOnly
                        ? "Dettaglio annuncio"
                        : isModifyMode
                        ? "Modifica annuncio"
                        : "Creazione annuncio"}
                </legend>

                <fieldset className="fieldset-bordered mt-1">
                    <legend>Presentazione annuncio</legend>
                    <Row>
                        <Col sm={12} md={isReadOnly ? 12 : 6}>
                            <CustomInput
                                field="titolo"
                                descr="Titolo"
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
                                    placeholder="Inserisci la descrizione dell'annuncio"
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
                                placeholder="Inserisci la descrizione dell'annuncio"
                                type={InputTypes.TEXTAREA}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                        <Col sm={12} md={2}>
                            <CustomInput
                                field="prezzo"
                                descr="Prezzo"
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
                                descr="Città"
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
                                descr="Utente"
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
                                descr="Tipo di immobile"
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
                                descr="Tipo di annuncio"
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
                                descr="Zona"
                                placeholder="Inserisci la zona"
                                type={InputTypes.TEXT}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <CustomInput
                                field="mq"
                                descr="MQ"
                                type={InputTypes.NUMBER}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <CustomInput
                                field="numeroStanze"
                                descr="Numero stanze"
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
                                descr="Ascensore"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="esisteGarage"
                                descr="Garage"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="esistePostoAutoAssegnato"
                                descr="Posto auto assegnato"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="esisteTerrazzo"
                                descr="Terrazzo"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                                readOnly={isReadOnly}
                            />
                        </Col>
                    </Row>
                </fieldset>

                <Row>
                    <Col
                        sm={12}
                        md={12}
                        className="d-flex justify-content-center mt-4 mb-5"
                    >
                        {!isViewMode && (
                            <>
                                <button
                                    className="btn btn-general btn-primary px-4 order-1"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    <i className="bi bi-plus-circle-dotted"></i>
                                    {isLoading
                                        ? " Creazione..."
                                        : " CREA ANNUNCIO"}
                                </button>
                                <button
                                    className="btn-general btn btn-primary px-4 order-2"
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isLoading}
                                >
                                    <i className="bi bi-eraser-fill me-2"></i>
                                    {isLoading ? "Pulizia..." : "PULISCI CAMPI"}
                                </button>
                            </>
                        )}
                        {isReadOnly && (
                            <>
                                <button
                                    className="btn btn-general btn-primary px-4 order-2"
                                    type="submit"
                                    onClick={handleRitornaRicerca}
                                >
                                    <i className="bi bi-skip-backward-btn-fill"></i>{" "}
                                    INDIETRO
                                </button>
                                <button
                                    className="btn btn-general btn-primary px-4 order-1"
                                    type="submit"
                                    onClick={() => setIsEditMode(true)}
                                >
                                    <i className="bi bi-pencil-square"></i>{" "}
                                    MODIFICA
                                </button>
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
                                    className="btn btn-general btn-primary px-4 order-2"
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
    )
}

export default CreazioneAnnuncio

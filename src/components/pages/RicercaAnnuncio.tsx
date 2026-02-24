import { useForm, UseFormProps } from "react-hook-form"
import { Annuncio, RicercaRequest } from "@/utils/types"
import {
    useGetCittaQuery,
    useGetTipoAnnunciQuery,
    useGetTipoImmobiliQuery
} from "@/api/tipologicheApi"
import { useDispatch, useSelector } from "react-redux"
import { setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes } from "@/utils/constants/consts"
import { STATI } from "@/utils/utils"
import { useRicercaAnnuncioMutation } from "@/api/annuncioApi"
import { initialStateRicerca } from "@/store/slices/ricercaAnnuncioSlice"
import { setListaAnnunci } from "@/store/slices/listaAnnunciSlice"
import { useState } from "react"
import { findByTipologica, scrollToTop } from "@/utils/genericUtils"
import { setAnnuncio } from "@/store/slices/annuncioSlice"
import { useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"

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
    const listaPositiva = useSelector((state: any) => state.listaAnnunci)
    const form = useForm<RicercaRequest>(formConfig)
    const isListaPositiva: boolean = listaPositiva.length > 0
    const [ricercaEffettuata, setRicercaEffettuata] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleReset = () => {
        form.reset(initialStateRicerca)
        dispatch(setListaAnnunci([]))
    }

    const cleanFiltri = (filtri: RicercaRequest): Partial<RicercaRequest> => {
        return Object.fromEntries(
            Object.entries(filtri).filter(
                ([_, value]) =>
                    value !== "" && value !== null && value !== undefined
            )
        ) as Partial<RicercaRequest>
    }

    const handleRicercaAnnunci = async () => {
        try {
            const response = await ricerca({
                filtri: cleanFiltri(form.getValues()),
                page: 0,
                pageSize: 100
            }).unwrap()
            dispatch(setListaAnnunci(response.annunci))
            dispatch(
                setGrowl(createSuccessGrowl("Ricerca effettuata con successo"))
            )
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
            dispatch(setListaAnnunci([]))
        }
    }

    const handleDettaglio = (annuncio: Annuncio) => {
        dispatch(setAnnuncio(annuncio))
        scrollToTop()
        navigate(AppPaths.ANNUNCIO_DETTAGLIO)
    }

    const handleModifica = (isEditMode: boolean, annuncio: Annuncio) => {
        dispatch(setAnnuncio(annuncio))
        scrollToTop()
        navigate(AppPaths.ANNUNCIO_DETTAGLIO, {
            state: { isEditMode: true }
        })
    }

    return (
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
                                descr="Prezzo (Al)"
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
                                placeholder={"Inserisci le spese aggiuntive"}
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
                        sm={12}
                        md={12}
                        className="d-flex justify-content-center mt-4 mb-5"
                    >
                        <button
                            className="btn btn-general btn-primary px-4 order-1"
                            type="submit"
                            disabled={isLoading}
                            onClick={() => setRicercaEffettuata(true)}
                        >
                            <i className="bi bi-search"></i>
                            {isLoading ? " Creazione..." : " RICERCA ANNUNCIO"}
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
                    <div className="table-responsive">
                        <fieldset className="fieldset-bordered fieldset-main mt-2">
                            <legend>Risultati ricerca</legend>
                            <Row>
                                <table className="table table-striped table-group-divider table-bordered align-middle">
                                    <thead className="table-dark text-center align-middle">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">
                                                Tipologia annuncio
                                            </th>
                                            <th scope="col">
                                                Tipologia immobile
                                            </th>
                                            <th
                                                scope="col"
                                                style={{ width: "320px" }}
                                            >
                                                Titolo
                                            </th>
                                            <th
                                                scope="col"
                                                style={{ width: "300px" }}
                                            >
                                                Città - Zona
                                            </th>
                                            <th
                                                scope="col"
                                                style={{ width: "105px" }}
                                            >
                                                Prezzo
                                            </th>
                                            <th scope="col">MQ</th>
                                            <th scope="col">Piano</th>
                                            <th scope="col">Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPositiva.map(
                                            (annuncio: Annuncio) => (
                                                <tr key={annuncio.id}>
                                                    <td>{annuncio.id}</td>
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
                                                    <td>
                                                        <button
                                                            className="btn btn-general btn-primary px-1 order-1"
                                                            type={"button"}
                                                            onClick={() =>
                                                                handleDettaglio(
                                                                    annuncio
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-search"></i>
                                                            DETTAGLI
                                                        </button>
                                                        <button
                                                            className="btn btn-general btn-primary px-1 order-2"
                                                            type={"button"}
                                                            onClick={() =>
                                                                handleModifica(
                                                                    true,
                                                                    annuncio
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                            MODIFICA
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </Row>
                        </fieldset>
                    </div>
                )}
            </fieldset>
        </form>
    )
}

export default RicercaAnnuncio

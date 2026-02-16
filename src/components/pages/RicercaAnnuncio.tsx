import {useForm, UseFormProps} from "react-hook-form";
import {RicercaRequest} from "@/utils/types";
import {useGetCittaQuery, useGetTipoAnnunciQuery, useGetTipoImmobiliQuery} from "@/api/tipologicheApi";
import {useDispatch} from "react-redux";
import {setGrowl} from "@/store/slices/uiSlice";
import {createErrorGrowl} from "@/custom/modal/Growl";
import {Col, Row} from "react-bootstrap";
import CustomInput from "@/custom/utils/CustomInput";
import {InputTypes} from "@/utils/constants/consts";
import {STATI} from "@/utils/utils";
import {useRicercaAnnuncioMutation} from "@/api/annuncioApi";
import {initialStateRicerca} from "@/store/slices/ricercaAnnuncioSlice";

const formConfig: UseFormProps<RicercaRequest> = {
    defaultValues: {
        tipologiaAnnuncioId: "",
        tipologiaImmobileId: "",
        prezzoDa: 0,
        prezzoAl: 0,
        dataDal: "",
        dataAl: "",
        mqMinimi: 0,
        stanzeMinime: 0,
        citta: "",
        ascensore: 0,
        garage: 0,
        terrazzo: 0,
        postoAuto: 0,
        zona: "",
        speseAggiuntive: 0,
        titolo: ""
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    }
};

export const RicercaAnnuncio = () => {
    const {data: tipologieAnnunci, isLoading: tipologieAnnunciLoading} = useGetTipoAnnunciQuery()
    const {data: tipologieImmobili, isLoading: tipologieImmobiliLoading} = useGetTipoImmobiliQuery()
    const {data: getCitta, isLoading: getCittaLoading} = useGetCittaQuery()
    const [ricerca, {isLoading, error}] = useRicercaAnnuncioMutation()

    const form = useForm<RicercaRequest>(formConfig);
    const dispatch = useDispatch();

    const handleReset = () => {
        form.reset(initialStateRicerca)
    }

    const handleRicercaAnnunci = async () => {
        try {
            await ricerca({
                filtri: form.watch(),
                page: 0,
                pageSize: 100,
            }).unwrap();
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
        }
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
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.NUMBER}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="prezzoAl"
                                descr="Prezzo (Al)"
                                placeholder="Inserisci il titolo dell'annuncio"
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
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.DATE}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="dataAl"
                                descr="Data di pubblicazione (Al)"
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.DATE}
                                form={form}
                            />
                        </Col>
                    </Row>
                </fieldset>
                <fieldset className={"fieldset-bordered mt-4"}>
                    <legend>Caratteristiche tecniche</legend>
                    <Row>
                        <Col sm={12} md={9}>
                            <CustomInput
                                field="zona"
                                descr="Zona"
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.TEXT}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={3}>
                            <CustomInput
                                field="mqMinimi"
                                descr="MQ minimi"
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.NUMBER}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="stanzeMinime"
                                descr="Stanze minime"
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.NUMBER}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="speseAggiuntive"
                                descr="Spese"
                                placeholder="Inserisci il titolo dell'annuncio"
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
                    <Col sm={12} md={12} className="d-flex justify-content-center mt-4 mb-5">
                        <button
                            className="btn btn-primary px-4 order-1"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creazione..." : "RICERCA ANNUNCIO"}
                        </button>
                        <button
                            className="btn btn-primary px-4 order-2"
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            {isLoading ? "Pulizia..." : "RIPULISCI"}
                        </button>
                    </Col>
                </Row>
            </fieldset>
        </form>
    )
}

export default RicercaAnnuncio

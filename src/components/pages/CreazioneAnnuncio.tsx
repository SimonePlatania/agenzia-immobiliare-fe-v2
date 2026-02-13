import {useForm, UseFormProps, UseFormReturn} from "react-hook-form";
import {Annuncio} from "@/utils/types";
import {useState} from "react";
import {
    useGetCittaQuery,
    useGetRuoliQuery,
    useGetTipoAnnunciQuery,
    useGetTipoImmobiliQuery
} from "@/api/tipologicheApi";
import {useCreaAnnuncioMutation} from "@/api/annuncioApi";
import {Col, Row} from "react-bootstrap";
import CustomInput from "@/custom/utils/CustomInput";
import {InputTypes} from "@/utils/constants/consts";
import {initialStateAnnuncio} from "@/store/slices/annuncioSlice";
import {useDispatch} from "react-redux";
import {setGrowl} from "@/store/slices/uiSlice";
import {createErrorGrowl} from "@/custom/modal/Growl";
import {STATI} from "@/utils/utils";

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
    }
};


const CreazioneAnnuncio = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [creaAnnuncio, {isLoading, error}] = useCreaAnnuncioMutation();
    const {data: ruoli, isLoading: ruoliLoading} = useGetRuoliQuery()
    const {data: tipologieAnnunci, isLoading: tipologieAnnunciLoading} = useGetTipoAnnunciQuery()
    const {data: tipologieImmobili, isLoading: tipologieImmobiliLoading} = useGetTipoImmobiliQuery()
    const {data: getCitta, isLoading: getCittaLoading} = useGetCittaQuery()

    const form: UseFormReturn<any> = useForm<Annuncio>(formConfig);
    const dispatch = useDispatch();

    const handleAnnuncio = async () => {
        try {
            await creaAnnuncio(form.watch()).unwrap();
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
        }
    }

    const handleReset = () => {
        form.reset(initialStateAnnuncio)
    }

    return (
        <form onSubmit={form.handleSubmit(handleAnnuncio)}>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Creazione annuncio</legend>

                <fieldset className="fieldset-bordered mt-1">
                    <legend>Presentazione annuncio</legend>
                    <Row>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="titolo"
                                descr="Titolo"
                                placeholder="Inserisci il titolo dell'annuncio"
                                type={InputTypes.TEXT}
                                form={form}
                            />
                        </Col>

                        <Col sm={12} md={6}>
                            <CustomInput
                                field="descrizione"
                                descr="Foto immobile"
                                placeholder="Inserisci la descrizione dell'annuncio"
                                type={InputTypes.FILE}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={12}>
                            <CustomInput
                                field="descrizione"
                                descr="Descrizione"
                                placeholder="Inserisci la descrizione dell'annuncio"
                                type={InputTypes.TEXT}
                                form={form}
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
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="utenteId"
                                descr="Utente"
                                type={InputTypes.SELECT}
                                form={form}
                                options={getCitta ?? []}
                                isLoading={getCittaLoading}
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
                            />
                        </Col>
                    </Row>
                </fieldset>

                <fieldset className={"fieldset-bordered mt-4"}>
                    <legend>Caratteristiche tecniche</legend>
                    <Row>
                        <Col sm={12} md={3}>
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
                                field="mq"
                                descr="MQ"
                                placeholder={"Inserisci la superficie in mq"}
                                type={InputTypes.NUMBER}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={3}>
                            <CustomInput
                                field="numeroStanze"
                                descr="Numero stanze"
                                placeholder="Inserisci il numero di stanze"
                                type={InputTypes.NUMBER}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={3}>
                            <CustomInput
                                field="piano"
                                descr="Piano"
                                placeholder="Inserisci il piano dell'immobile"
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
                                field="esisteAscensore"
                                descr="Ascensore"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="esisteGarage"
                                descr="Garage"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="esistePostoAutoAssegnato"
                                descr="Posto auto assegnato"
                                type={InputTypes.SELECT}
                                options={STATI}
                                form={form}
                            />
                        </Col>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="esisteTerrazzo"
                                descr="Terrazzo"
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
                            {isLoading ? "Creazione..." : "CREA ANNUNCIO"}
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

export default CreazioneAnnuncio

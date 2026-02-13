import {useForm, UseFormProps, UseFormReturn} from "react-hook-form";
import {UtenteRequest} from "@/utils/types";
import {useRegistrazioneUserMutation} from "@/api/utenteApi";
import {Button, Col, Row} from "react-bootstrap";
import CustomInput from "@/custom/utils/CustomInput";
import {InputTypes} from "@/utils/constants/consts";
import {useGetRuoliQuery} from "@/api/tipologicheApi"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setGrowl} from "@/store/slices/uiSlice";
import {createErrorGrowl} from "@/custom/modal/Growl";

const formConfig: UseFormProps<UtenteRequest> = {
    defaultValues: {
        nome: "",
        cognome: "",
        email: "",
        password: "",
        telefono: "",
        ruoloId: 0
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    }
}

export const Registrazione = () => {
    const [registrazioneUser, {isLoading, error}] =
        useRegistrazioneUserMutation()
    const {data: ruoli, isLoading: ruoliLoading} = useGetRuoliQuery()
    const form: UseFormReturn<any> = useForm<UtenteRequest>(formConfig);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        try {
            await registrazioneUser(form.watch()).unwrap();
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)));
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(handleRegister)}
        >
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Registrazione</legend>

                <CustomInput
                    field="nome"
                    descr="Nome"
                    placeholder="Inserisci il nome"
                    type={InputTypes.TEXT}
                    form={form}
                />

                <CustomInput
                    field="cognome"
                    descr="Cognome"
                    placeholder="Inserisci il cognome"
                    type={InputTypes.TEXT}
                    form={form}
                />

                <CustomInput
                    field="email"
                    descr="Email"
                    placeholder="Inserisci la email"
                    type={InputTypes.TEXT}
                    form={form}
                />

                <CustomInput
                    field="password"
                    descr="Password"
                    placeholder="Inserisci la password"
                    type={InputTypes.PASSWORD}
                    form={form}
                />

                <CustomInput
                    field="telefono"
                    descr="Telefono"
                    placeholder="Inserisci il telefono"
                    type={InputTypes.NUMBER}
                    form={form}
                />

                <CustomInput
                    field="ruoloId"
                    descr="Ruolo"
                    placeholder="Inserisci il ruolo"
                    type={InputTypes.SELECT}
                    form={form}
                    options={ruoli ?? []}
                    isLoading={ruoliLoading}
                />

                <Row>
                    <Col sm={12} md={12}>
                        <Button
                            variant="outline-dark"
                            type={"submit"}
                            disabled={isLoading}
                            className="mt-3"
                        >
                            {isLoading ? "Accesso..." : "REGISTRATI"}
                        </Button>
                        <Button
                            variant="outline-dark"
                            disabled={isLoading}
                            onClick={() => navigate('/login')}
                            className="mt-3"
                        >
                            {isLoading ? "Accesso..." : "LOGIN"}
                        </Button>
                    </Col>
                </Row>
            </fieldset>
        </form>
    )
}

export default Registrazione

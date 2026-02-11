import {useForm, UseFormProps, UseFormReturn} from "react-hook-form";
import {UtenteRequest} from "@/utils/types";
import {useRegistrazioneUserMutation} from "@/api/utenteApi";
import {useState} from "react";
import {Alert, Button, Col, Row} from "react-bootstrap";
import CustomInput from "@/custom/utils/CustomInput";
import {InputTypes} from "@/utils/constants/consts";
import { useNavigate } from "react-router-dom"
import { useGetRuoliQuery } from "@/api/tipologicheApi"

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
    const [registrazioneUser, { isLoading, error }] =
        useRegistrazioneUserMutation()
    const { data: ruoli, isLoading: ruoliLoading } = useGetRuoliQuery()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const form: UseFormReturn<any> = useForm<UtenteRequest>(formConfig);

    const handleRegister = async (
        data,
        setErrorMessage,
        registrazioneUser
    ) => {
        setErrorMessage(null)
        try {
            await registrazioneUser(data).unwrap();
        } catch (err: any) {
            setErrorMessage(err?.data?.messaggio || "Errore generico")
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit((values) =>
                handleRegister(values, setErrorMessage, registrazioneUser)
            )}
        >
            <fieldset className="fieldset-bordered mt-4">
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
                            // onClick={() => navigate('/login')}
                            className="mt-3"
                        >
                            {isLoading ? "Accesso..." : "LOGIN"}
                        </Button>
                    </Col>
                </Row>
            </fieldset>
            {errorMessage && (
                <Alert
                    style={{ marginTop: "10px" }}
                    variant="danger"
                >
                    {errorMessage}
                </Alert>
            )}
        </form>
    )
}

export default Registrazione

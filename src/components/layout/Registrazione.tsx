import {useForm, UseFormProps, UseFormReturn} from "react-hook-form";
import {UtenteRequest} from "@/utils/types";
import {useRegistrazioneUserMutation} from "@/api/utenteApi";
import {useState} from "react";
import {Alert, Button, Col, Row} from "react-bootstrap";
import CustomInput from "@/custom/utils/CustomInput";
import {InputTypes} from "@/utils/constants/consts";

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
    const [registazioneUser, {isLoading, error}] = useRegistrazioneUserMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const form: UseFormReturn<any> = useForm<UtenteRequest>(formConfig);

    const handleRegister = form.handleSubmit(async (data) => {
        setErrorMessage(null)
        try {
            await registazioneUser(data).unwrap();
        } catch (err: any) {
            setErrorMessage(err?.data?.messaggio || "Errore generico")
        }
    });

    return (
        <>
            <fieldset className="fieldset-bordered mt-4">
                <legend>Registrazione</legend>

                {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
                        {errorMessage}
                    </Alert>
                )}

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
                />

                <Row>
                    <Col sm={12} md={12}>
                        <Button
                            variant="outline-dark"
                            onClick={handleRegister}
                            disabled={isLoading}
                            className="mt-3"
                        >
                            {isLoading ? "Accesso..." : "REGISTRATI"}
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={handleRegister}
                            disabled={isLoading}
                            className="mt-3"
                        >
                            {isLoading ? "Accesso..." : "LOGIN"}
                        </Button>
                    </Col>
                </Row>
            </fieldset>
        </>
    )
}

export default Registrazione

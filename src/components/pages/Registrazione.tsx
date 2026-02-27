import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { ErrorMessage, UtenteRequest } from "@/utils/types"
import { useRegistrazioneUserMutation } from "@/api/utenteApi"
import { Button, Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes, Ruolo } from "@/utils/constants/consts"
import { useGetRuoliQuery } from "@/api/tipologicheApi"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl } from "@/custom/modal/Growl"
import { AppState } from "@/store/store"

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
    const form: UseFormReturn<any> = useForm<UtenteRequest>(formConfig)
    const { ruolo } = useSelector((state: AppState) => state.utente)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE

    const handleRegister = async (): Promise<void> => {
        try {
            await registrazioneUser(form.watch()).unwrap()
        } catch (err: any) {
            const messaggio =
                (err as ErrorMessage)?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleRegister)}
            style={{
                marginTop: "50px",
                marginBottom: "50px",
                width: "50%",
                marginLeft: "25%"
            }}
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

                {isAdmin && (
                    <CustomInput
                        field="ruoloId"
                        descr="Ruolo"
                        placeholder="Inserisci il ruolo"
                        type={InputTypes.SELECT}
                        form={form}
                        options={ruoli ?? []}
                        isLoading={ruoliLoading}
                    />
                )}

                <Row>
                    <Col sm={12} md={12}>
                        <Button
                            type={"submit"}
                            disabled={isLoading}
                            className="btn btn-general"
                            variant="outline-dark"
                        >
                            <i className="bi bi-sign-intersection-fill"></i>
                            {isLoading ? " Accesso..." : " REGISTRATI"}
                        </Button>
                        <Button
                            variant="outline-dark"
                            disabled={isLoading}
                            onClick={() => navigate("/login")}
                            className="btn btn-general"
                        >
                            <i className="bi bi-door-open-fill"></i>
                            {isLoading ? " Accesso..." : " LOGIN"}
                        </Button>
                    </Col>
                </Row>
            </fieldset>
        </form>
    )
}

export default Registrazione

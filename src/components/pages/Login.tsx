import { Alert, Button, Row } from "react-bootstrap"
import { useLoginUserMutation } from "@/api/utenteApi"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes, Ruolo } from "@/utils/constants/consts"
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { ErrorMessage, LoginRequest } from "@/utils/types"
import { useState } from "react"
import { createErrorGrowl } from "@/custom/modal/Growl"
import { setGrowl } from "@/store/slices/uiSlice"
import { useDispatch } from "react-redux"
import { resetAll, setLoginUtente } from "@/store/slices/utenteSlice"
import { useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/components/yupSchemas/yupSchema"

const formConfig: UseFormProps<LoginRequest> = {
    defaultValues: {
        email: "",
        password: ""
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    },
    resolver: yupResolver(loginSchema)
}

const Login = () => {
    const [loginUser, { isLoading, error }] = useLoginUserMutation()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const form: UseFormReturn<any> = useForm<LoginRequest>(formConfig)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (data: LoginRequest): Promise<void> => {
        try {
            const userData = await loginUser(data).unwrap()
            dispatch(resetAll)
            dispatch(setLoginUtente(userData))
            if (userData.ruolo === Ruolo.AMMINISTRATORE) {
                navigate(AppPaths.CREA_ANNUNCIO)
            } else {
                navigate(AppPaths.RICERCA_MODIFICA)
            }
        } catch (err: any) {
            const messaggio =
                (err as ErrorMessage)?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)))
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleLogin)}
            style={{
                marginTop: "125px",
                marginBottom: "125px",
                width: "50%",
                marginLeft: "25%"
            }}
        >
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Login</legend>

                <CustomInput
                    field="email"
                    descr="Email"
                    placeholder="Inserisci la tua email"
                    type={InputTypes.TEXT}
                    form={form}
                />
                <Row>
                    <CustomInput
                        field="password"
                        descr="Password"
                        classes={"col-12"}
                        placeholder="Inserisci la tua password"
                        type={InputTypes.PASSWORD}
                        form={form}
                    />
                </Row>

                <Button
                    className="btn btn-general"
                    variant="outline-dark"
                    type={"submit"}
                    disabled={isLoading}
                    style={{ marginTop: "10px" }}
                >
                    <i className="bi bi-door-open-fill"></i>
                    {isLoading ? " Accesso..." : " ACCEDI"}
                </Button>
            </fieldset>

            {errorMessage && (
                <Alert style={{ marginTop: "10px" }} variant="danger">
                    {errorMessage}
                </Alert>
            )}
        </form>
    )
}

export default Login

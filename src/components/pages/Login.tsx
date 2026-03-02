import { Alert, Button, Row } from "react-bootstrap"
import { useLoginUserMutation } from "@/api/utenteApi"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes } from "@/utils/constants/consts"
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { LoginRequest } from "@/utils/types"
import { Dispatch, useState } from "react"
import { createErrorGrowl } from "@/custom/modal/Growl"
import { setGrowl } from "@/store/slices/uiSlice"
import { useDispatch } from "react-redux"
import { resetAll, setLoginUtente } from "@/store/slices/utenteSlice"
import { useNavigate } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/components/yupSchemas/yupSchema"
import { AnyAction } from "@reduxjs/toolkit"
import { getErrorGrowl } from "@/utils/custom-utils"

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
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (data: LoginRequest): Promise<void> => {
        try {
            const userData = await loginUser(data).unwrap()
            dispatch(resetAll)
            dispatch(setLoginUtente(userData))
            navigate(AppPaths.HOME)
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
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

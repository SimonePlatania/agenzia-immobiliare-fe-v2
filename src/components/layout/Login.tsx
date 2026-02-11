import {Alert, Button} from "react-bootstrap";
import {useLoginUserMutation} from "@/api/utenteApi";
import CustomInput from "@/custom/utils/CustomInput";
import {InputTypes} from "@/utils/constants/consts";
import {useForm, UseFormProps, UseFormReturn} from "react-hook-form";
import {LoginRequest} from "@/utils/types";
import {useState} from "react";

const formConfig: UseFormProps<LoginRequest> = {
    defaultValues: {
        email: "",
        password: ""
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    }
};

const handleLogin = async (data, setErrorMessage, loginUser) => {
    setErrorMessage(null)
    try {
        await loginUser(data).unwrap();
    } catch (err: any) {
        setErrorMessage(err?.data?.messaggio || "Errore generico")
    }
}

const Login = () => {
    const [loginUser, {isLoading, error}] = useLoginUserMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const form: UseFormReturn<any> = useForm<LoginRequest>(formConfig);


    return (
        <form onSubmit={form.handleSubmit((values) => handleLogin(values, setErrorMessage, loginUser))}>
            <fieldset className="fieldset-bordered mt-4">
                <legend>Login</legend>

                {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
                        {errorMessage}
                    </Alert>
                )}
                <CustomInput
                    field="email"
                    descr="Email"
                    placeholder="Inserisci la tua email"
                    type={InputTypes.TEXT}
                    form={form}
                />

                <CustomInput
                    field="password"
                    descr="Password"
                    placeholder="Inserisci la tua password"
                    type={InputTypes.PASSWORD}
                    form={form}
                />

                <Button
                    variant="outline-dark"
                    type={'submit'}
                    disabled={isLoading}
                    className="mt-3"
                >
                    {isLoading ? "Accesso..." : "ACCEDI"}
                </Button>
            </fieldset>
        </form>
    )
}

export default Login;

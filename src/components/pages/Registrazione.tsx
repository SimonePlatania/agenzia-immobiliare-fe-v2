import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { UtenteRequest } from "@/utils/types"
import { useRegistrazioneUserMutation } from "@/api/utenteApi"
import { Button, Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes, Ruolo, Sections } from "@/utils/constants/consts"
import { useGetRuoliQuery } from "@/api/tipologicheApi"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { AppState } from "@/store/store"
import { Dispatch } from "react"
import { AnyAction } from "@reduxjs/toolkit"
import { getErrorGrowl } from "@/utils/custom-utils"
import { AppPaths } from "@/utils/constants/routes"
import { setSection } from "@/store/slices/sectionSlice"
import { setLogin } from "@/store/slices/loginSlice"

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
    const dispatch: Dispatch<AnyAction> = useDispatch()

    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE

    const handleRegister = async (): Promise<void> => {
        try {
            await registrazioneUser(form.watch()).unwrap()
            dispatch(
                setGrowl(createSuccessGrowl("Utente registrato con successo!"))
            )
            if (isAdmin) {
                navigate(AppPaths.IMPOSTAZIONI)
                dispatch(setSection(Sections.IMPOSTAZIONI))
            } else {
                navigate(AppPaths.HOME)
                dispatch(setSection(Sections.HOME))
                dispatch(setLogin(registrazioneUser ?? null))
            }
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
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
            <div className="w-100">
                <fieldset className="fieldset-bordered fieldset-main mt-5">
                    <legend>Registrazione utente</legend>

                    <Row>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="nome"
                                descr="Nome"
                                placeholder="Inserisci il nome"
                                type={InputTypes.TEXT}
                                form={form}
                            />
                        </Col>

                        <Col sm={12} md={6}>
                            <CustomInput
                                field="cognome"
                                descr="Cognome"
                                placeholder="Inserisci il cognome"
                                type={InputTypes.TEXT}
                                form={form}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12} md={6}>
                            <CustomInput
                                field="email"
                                descr="Email"
                                placeholder="Inserisci la email"
                                type={InputTypes.TEXT}
                                form={form}
                            />
                        </Col>

                        <Col sm={12} md={6}>
                            <CustomInput
                                field="telefono"
                                descr="Telefono"
                                placeholder="Inserisci il telefono"
                                type={InputTypes.NUMBER}
                                form={form}
                            />
                        </Col>
                    </Row>

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

                    <CustomInput
                        field="password"
                        descr="Password"
                        placeholder="Inserisci la password"
                        type={InputTypes.PASSWORD}
                        form={form}
                    />

                    <Row>
                        <Col sm={12} md={12}>
                            <Button
                                type={"submit"}
                                disabled={isLoading}
                                className="btn btn-general"
                                variant="outline-dark"
                            >
                                <i className="bi bi-sign-intersection-fill"></i>
                                {isAdmin ? " REGISTRA UTENTE" : " REGISTRATI"}
                            </Button>
                            {!isAdmin && (
                                <Button
                                    variant="outline-dark"
                                    disabled={isLoading}
                                    onClick={() => navigate("/login")}
                                    className="btn btn-general"
                                >
                                    <i className="bi bi-door-open-fill"></i>
                                    {isLoading ? " Accesso..." : " LOGIN"}
                                </Button>
                            )}
                        </Col>
                    </Row>
                </fieldset>
            </div>
        </form>
    )
}

export default Registrazione

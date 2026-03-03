import { Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { UtenteResponse } from "@/utils/types"
import { InputTypes, Sections } from "@/utils/constants/consts"
import { AppState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, useEffect } from "react"
import { useGetRuoliQuery } from "@/api/tipologicheApi"
import { AppPaths } from "@/utils/constants/routes"
import { useNavigate } from "react-router-dom"
import { AnyAction } from "@reduxjs/toolkit"
import { setSection } from "@/store/slices/sectionSlice"

const formConfig: UseFormProps<UtenteResponse> = {
    defaultValues: {
        id: "",
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        ruoloId: 0
    },
    resetOptions: {
        keepDirtyValues: true,
        keepErrors: true
    }
}

export const SchedaUtente = () => {
    const form: UseFormReturn<any> = useForm<UtenteResponse>(formConfig)
    const utente = useSelector((state: AppState) => state.utenteDettaglio)
    const { data: ruoli, isLoading: ruoliLoading } = useGetRuoliQuery()
    const navigate = useNavigate()
    const dispatch: Dispatch<AnyAction> = useDispatch()

    const handleIndietro = () => {
        dispatch(setSection(Sections.IMPOSTAZIONI))
        navigate(AppPaths.IMPOSTAZIONI)
    }

    useEffect(() => {
        form.reset(utente)
    })

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Scheda utente</legend>
                <Row>
                    <Col sm={12} md={2}>
                        <CustomInput
                            field={"id"}
                            descr="Id utente"
                            type={InputTypes.TEXT}
                            readOnly={true}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={5}>
                        <CustomInput
                            field={"nome"}
                            descr={"Nome"}
                            type={InputTypes.TEXT}
                            readOnly={true}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={5}>
                        <CustomInput
                            field={"cognome"}
                            descr={"Cognome"}
                            type={InputTypes.TEXT}
                            readOnly={true}
                            form={form}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <CustomInput
                            field={"email"}
                            descr={"Email"}
                            type={InputTypes.TEXT}
                            readOnly={true}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={3}>
                        <CustomInput
                            field={"telefono"}
                            descr={"Telefono/Cellulare"}
                            type={InputTypes.NUMBER}
                            readOnly={true}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={3}>
                        <CustomInput
                            field={"ruoloId"}
                            descr={"Ruolo"}
                            options={ruoli ?? []}
                            type={InputTypes.SELECT}
                            readOnly={true}
                            form={form}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} className="d-flex justify-content-center mt-2">
                        <button
                            className="btn btn-general btn-primary px-4 order-1"
                            type="submit"
                        >
                            MODIFICA
                        </button>
                        <button
                            className="btn btn-general btn-primary px-4 order-2"
                            type="button"
                            onClick={() => handleIndietro()}
                        >
                            INDIETRO
                        </button>
                    </Col>
                </Row>
            </fieldset>
        </>
    )
}

export default SchedaUtente

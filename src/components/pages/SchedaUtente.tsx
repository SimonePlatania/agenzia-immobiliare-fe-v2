import { Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { ModificaUtenteDTO, UtenteResponse } from "@/utils/types"
import { InputTypes, Sections } from "@/utils/constants/consts"
import { AppState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, useState } from "react"
import { useGetRuoliQuery } from "@/api/tipologicheApi"
import { AppPaths } from "@/utils/constants/routes"
import { useNavigate } from "react-router-dom"
import { AnyAction } from "@reduxjs/toolkit"
import { setSection } from "@/store/slices/sectionSlice"
import { useModificaDatiAnagraficiMutation } from "@/api/utenteApi"
import { getErrorGrowl } from "@/utils/custom-utils"
import { disableSpinner, enableSpinner, setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { isEqual } from "lodash"
import CustomModal from "@/custom/modal/CustomModal"
import { yupResolver } from "@hookform/resolvers/yup"
import { modificaUtenteSchema } from "@/components/yupSchemas/yupSchema"

export const SchedaUtente = () => {
    const utente = useSelector((state: AppState) => state.utenteDettaglio)
    const formConfig: UseFormProps<UtenteResponse> = {
        defaultValues: {
            id: utente.id,
            nome: utente.nome,
            cognome: utente.cognome,
            email: utente.email,
            telefono: utente.telefono,
            ruoloId: utente.ruoloId
        },
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true
        },
        resolver: yupResolver(modificaUtenteSchema),
        mode: "onChange"
    }
    const form: UseFormReturn<any> = useForm<UtenteResponse>(formConfig)
    const [showModal, setShowModal] = useState<boolean>(false)
    const { data: ruoli, isLoading: ruoliLoading } = useGetRuoliQuery()
    const [modificaDatiAnagrafici, { isLoading, error }] =
        useModificaDatiAnagraficiMutation()
    const navigate = useNavigate()
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const section = useSelector((state: AppState) => state.section)
    const isEditMode: boolean = section !== Sections.MODIFICA_UTENTE

    const handleIndietro = () => {
        dispatch(setSection(Sections.IMPOSTAZIONI))
        navigate(AppPaths.IMPOSTAZIONI)
    }

    const handleModifica = () => {
        dispatch(setSection(Sections.MODIFICA_UTENTE))
    }

    const disableButton = (): boolean => {
        form.formState.isValid
        const formValues = form.getValues()
        return isEqual(formValues, utente)
    }

    const handleSalva = async (data: ModificaUtenteDTO): Promise<void> => {
        try {
            dispatch(enableSpinner())
            await modificaDatiAnagrafici({
                ...data,
                id: Number(utente.id)
            }).unwrap()
            dispatch(
                setGrowl(createSuccessGrowl("Utente modificato con successo"))
            )
            dispatch(setSection(Sections.IMPOSTAZIONI))
        } catch (err: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, err)
            form.reset()
            setShowModal(false)
        } finally {
            dispatch(disableSpinner())
        }
    }

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Scheda utente</legend>
                <Row>
                    <Col sm={12} md={2}>
                        <CustomInput
                            field={"id"}
                            descr="ID"
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
                            readOnly={isEditMode}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={5}>
                        <CustomInput
                            field={"cognome"}
                            descr={"Cognome"}
                            type={InputTypes.TEXT}
                            readOnly={isEditMode}
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
                            readOnly={isEditMode}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={3}>
                        <CustomInput
                            field={"telefono"}
                            descr={"Cellulare"}
                            type={InputTypes.NUMBER}
                            readOnly={isEditMode}
                            form={form}
                        />
                    </Col>
                    <Col sm={12} md={3}>
                        <CustomInput
                            field={"ruoloId"}
                            descr={"Ruolo"}
                            options={ruoli ?? []}
                            type={InputTypes.SELECT}
                            readOnly={isEditMode}
                            form={form}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} className="d-flex justify-content-center mt-2">
                        {isEditMode && (
                            <button
                                className="btn btn-general btn-primary px-4 order-1"
                                type="button"
                                onClick={() => {
                                    handleModifica()
                                }}
                            >
                                MODIFICA
                            </button>
                        )}

                        {!isEditMode && (
                            <button
                                className="btn btn-general btn-primary px-4 order-1"
                                type="button"
                                disabled={disableButton()}
                                onClick={() => {
                                    setShowModal(true)
                                }}
                            >
                                SALVA
                            </button>
                        )}
                        <button
                            className="btn btn-general btn-primary px-4 order-2"
                            type="button"
                            onClick={() => handleIndietro()}
                        >
                            TORNA A IMPOSTAZIONI
                        </button>
                    </Col>
                </Row>
            </fieldset>
            <CustomModal
                title={"Attenzione"}
                show={showModal}
                setShow={setShowModal}
                textBody={"Sei sicuro di voler modificare questo utente?"}
                confirmText={"Conferma"}
                cancelText={"Annulla"}
                onConfirm={async (): Promise<void> =>
                    await handleSalva(form.watch())
                }
            ></CustomModal>
        </>
    )
}

export default SchedaUtente

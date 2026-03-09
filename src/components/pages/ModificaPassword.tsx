import { useModificaPasswordMutation } from "@/api/utenteApi"
import { PasswordChangeRequest } from "@/utils/types"
import { getErrorGrowl } from "@/utils/custom-utils"
import { useDispatch } from "react-redux"
import { disableSpinner, enableSpinner, setGrowl } from "@/store/slices/uiSlice"
import { createErrorGrowl, createSuccessGrowl } from "@/custom/modal/Growl"
import { Col, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { InputTypes } from "@/utils/constants/consts"
import CustomModal from "@/custom/modal/CustomModal"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { modificaPasswordSchema } from "@/components/yupSchemas/yupSchema"

export const ModificaPassword = () => {
    const formConfig: UseFormProps<PasswordChangeRequest> = {
        defaultValues: {
            vecchiaPassword: "",
            nuovaPassword: ""
        },
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true
        },
        resolver: yupResolver(modificaPasswordSchema),
        mode: "onChange"
    }
    const form: UseFormReturn<any> = useForm<PasswordChangeRequest>(formConfig)

    const {
        formState: { isValid }
    } = form

    const [showModal, setShowModal] = useState<boolean>(false)

    const [
        modificaPassword,
        { isLoading: isLoadingPassword, error: errorModificaPassword }
    ] = useModificaPasswordMutation()

    const dispatch = useDispatch()

    const isDisabled: boolean = isLoadingPassword || !isValid

    const handleModificaPassword = async (
        data: PasswordChangeRequest
    ): Promise<void> => {
        if (isDisabled) {
            return
        }
        try {
            dispatch(enableSpinner())
            await modificaPassword(data).unwrap()
            dispatch(
                setGrowl(createSuccessGrowl("Password modificata con successo"))
            )
            setShowModal(false)
            form.reset()
        } catch (error: unknown) {
            getErrorGrowl(dispatch, setGrowl, createErrorGrowl, error)
            setShowModal(false)
            form.reset()
        } finally {
            dispatch(disableSpinner())
        }
    }
    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Modifica password</legend>
                <Row>
                    <Col xs={12}>
                        <CustomInput
                            field={"vecchiaPassword"}
                            descr={"Vecchia password"}
                            placeholder={"Inserisci la vecchia password"}
                            type={InputTypes.PASSWORD}
                            form={form}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <CustomInput
                            field={"nuovaPassword"}
                            descr={"Nuova password"}
                            placeholder={"Inserisci la nuova password"}
                            type={InputTypes.PASSWORD}
                            form={form}
                        />
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs={12} className="d-flex justify-content-center">
                        <button
                            className="btn btn-general btn-primary px-4 order-1"
                            type="button"
                            onClick={() => setShowModal(true)}
                            disabled={isDisabled}
                        >
                            {isLoadingPassword ? "MODIFICA..." : "MODIFICA"}
                        </button>
                    </Col>
                </Row>
            </fieldset>

            <CustomModal
                title={"Attenzione"}
                show={showModal}
                setShow={setShowModal}
                textBody={"Sei sicuro di voler modificare la password?"}
                confirmText={"Conferma"}
                cancelText={"Annulla"}
                onConfirm={async (): Promise<void> =>
                    await handleModificaPassword(form.getValues())
                }
            ></CustomModal>
        </>
    )
}

export default ModificaPassword

import { Col, Modal, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes } from "@/utils/constants/consts"
import { Resolver, useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { RispostaDTO } from "@/utils/types"
import { useSelector } from "react-redux"
import { AppState } from "@/store/store"
import { yupResolver } from "@hookform/resolvers/yup"
import { rispostaSchema } from "@/components/yupSchemas/yupSchema"

export const ModalRisposta = ({
    show,
    setShow,
    onConfirm
}: {
    show: boolean
    setShow: any
    onConfirm?: any
}) => {
    const formConfig: UseFormProps<RispostaDTO> = {
        defaultValues: {
            risposta: ""
        },
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true
        },
        resolver: yupResolver(
            rispostaSchema
        ) as unknown as Resolver<RispostaDTO>,
        mode: "onChange"
    }

    const form: UseFormReturn<any> = useForm<RispostaDTO>(formConfig)
    const { titolo } = useSelector((state: AppState) => state.annuncio)
    const titoloModale = `Rispondi alla domanda di annuncio: ${titolo}`

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titoloModale}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <CustomInput
                                field="risposta"
                                descr="Risposta"
                                placeholder="Inserisci la risposta"
                                type={InputTypes.TEXTAREA}
                                form={form}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <button
                        className="btn btn-general-modal btn-primary order-1"
                        type="button"
                        onClick={form.handleSubmit(onConfirm)}
                    >
                        Invia
                    </button>
                    <button
                        className="btn btn-general-modal-close btn-secondary me-2 order-2"
                        type="button"
                        onClick={handleClose}
                    >
                        Chiudi
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalRisposta

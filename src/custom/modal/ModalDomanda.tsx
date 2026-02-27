import { Col, Modal, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes } from "@/utils/constants/consts"
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { DomandaRequest } from "@/utils/types"
import { useSelector } from "react-redux"
import { AppState } from "@/store/store"

export const ModalDomanda = ({
    show,
    setShow,
    onConfirm
}: {
    show: boolean
    setShow: any
    onConfirm?: any
}) => {
    const handleClose = () => {
        setShow(false)
    }
    const { titolo } = useSelector((state: AppState) => state.annuncio)
    const titoloModale = `Fai domanda per l'annuncio: ${titolo}`
    const formConfig: UseFormProps<DomandaRequest> = {
        defaultValues: {
            domanda: ""
        },
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true
        }
    }

    const form: UseFormReturn<any> = useForm<DomandaRequest>(formConfig)

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
                                field="domanda"
                                descr="Domanda"
                                placeholder="Inserisci la domanda"
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

export default ModalDomanda

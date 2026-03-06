import { Col, Modal, Row } from "react-bootstrap"
import CustomInput from "@/custom/utils/CustomInput"
import { InputTypes } from "@/utils/constants/consts"
import { Resolver, useForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { DomandaRequest } from "@/utils/types"
import { useSelector } from "react-redux"
import { AppState } from "@/store/store"
import { yupResolver } from "@hookform/resolvers/yup"
import { domandaSchema } from "@/components/yupSchemas/yupSchema"

export const ModalDomanda = ({
    show,
    setShow,
    onConfirm
}: {
    show: boolean
    setShow: any
    onConfirm?: any
}) => {
    const formConfig: UseFormProps<DomandaRequest> = {
        defaultValues: {
            domanda: ""
        },
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true
        },
        resolver: yupResolver(
            domandaSchema
        ) as unknown as Resolver<DomandaRequest>
    }

    const form: UseFormReturn<any> = useForm<DomandaRequest>(formConfig)
    const { titolo } = useSelector((state: AppState) => state.annuncio)
    const titoloModale = `Fai domanda per l'annuncio: ${titolo}`

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
                        onClick={form.handleSubmit(
                            onConfirm,
                            (errors) =>
                                console.log("Errori validazione:", errors) // ← secondo argomento = callback errori
                        )}
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

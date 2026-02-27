import { Modal } from "react-bootstrap"

export const ModalCancellaAnnuncio = ({
    title,
    text,
    confirmText,
    cancelText,
    show,
    setShow,
    onConfirm
}: {
    title: string
    text: string
    confirmText: string
    cancelText: string
    show: boolean
    setShow: any
    onConfirm?: any
}) => {
    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{text}</p>
                </Modal.Body>
                <Modal.Footer className={"d-flex justify-content-center"}>
                    <button
                        className="btn btn-general-modal btn-primary"
                        type="button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className="btn btn-general-modal-close btn-secondary"
                        type="button"
                        onClick={handleClose}
                    >
                        {cancelText}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCancellaAnnuncio

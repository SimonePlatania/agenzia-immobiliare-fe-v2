import { Modal } from "react-bootstrap"

const CustomModal = ({
    title,
    textBody,
    confirmText,
    cancelText,
    show,
    setShow,
    onConfirm
}: {
    title: string
    textBody?: string | null | undefined
    confirmText?: string
    cancelText?: string
    input?: any
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
                    <p>{textBody}</p>
                </Modal.Body>
                <Modal.Footer className={"d-flex justify-content-center"}>
                    <button
                        className="btn btn-general-modal btn-primary"
                        type="button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                    {cancelText !== undefined && cancelText.length > 0 && (
                        <button
                            className="btn btn-general-modal-close btn-secondary"
                            type="button"
                            onClick={handleClose}
                        >
                            {cancelText}
                        </button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomModal

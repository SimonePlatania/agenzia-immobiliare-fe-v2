import { Modal } from "react-bootstrap"

const ModalFoto = ({
    fotoModal,
    setFotoModal
}: {
    fotoModal: string | null
    setFotoModal: any
}) => {
    return (
        <>
            <Modal
                show={!!fotoModal}
                onHide={() => setFotoModal(null)}
                centered
                size="lg"
            >
                <Modal.Body>
                    {fotoModal && (
                        <img
                            src={fotoModal}
                            alt="Foto immobile"
                            style={{ width: "100%" }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalFoto

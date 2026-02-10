import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import ReactDOM from "react-dom/client"
import type {CustomModalPromiseProps, CustomModalProps} from "@/utils/types";

const CustomModal: React.FC<CustomModalPromiseProps> = ({
    show,
    title,
    size,
    resolve,
    renderBody,
    isConfirm = false,
    confirmText = "Conferma",
    closeText = "Chiudi",
    callback,
    isDangerClose,
    type = "default",
    notClosing = false,
    disabledConfirm = false
}) => {
    const [confirmDisabled, setConfirmDisabled] = useState<boolean>(
        typeof disabledConfirm === "function"
            ? !!disabledConfirm()
            : !!disabledConfirm
    )

    useEffect(() => {
        const compute = () => {
            setConfirmDisabled(
                typeof disabledConfirm === "function"
                    ? !!disabledConfirm()
                    : !!disabledConfirm
            )
        }
        compute()
    }, [disabledConfirm])

    useEffect(() => {
        const handler = () => {
            if (typeof disabledConfirm === "function") {
                setConfirmDisabled(!!disabledConfirm())
            }
        }
        document.addEventListener("input", handler, true)
        document.addEventListener("change", handler, true)
        return () => {
            document.removeEventListener("input", handler, true)
            document.removeEventListener("change", handler, true)
        }
    }, [disabledConfirm])

    const handleConfirm = () => {
        if (callback) {
            callback(resolve)
        } else {
            resolve(true)
        }
    }

    const renderColor = () => {
        switch (type) {
            case "default":
                return "muted"
            case "info":
                return "primary"
            default:
                return type
        }
    }

    const renderIcon = () => {
        switch (type) {
            case "default":
                return "exclamation-circle-fill"
            case "info":
                return "info-circle-fill"
            case "danger":
                return "x-circle-fill"
            case "warning":
                return "exclamation-triangle-fill"
            case "success":
                return "check-circle-fill"
        }
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            centered
            size={(size as any) ?? "lg"}
        >
            <Modal.Header className="text-center d-flex justify-content-center mt-3 m-0 p-0">
                <strong
                    className={`w-100 fs-4 ${
                        renderBody ? "" : "mb-3"
                    } text-muted mt-1 pb-3`}
                >
                    <i
                        className={`bi bi-${renderIcon()} me-3 text-${renderColor()}`}
                    ></i>
                    {title}
                </strong>
            </Modal.Header>
            <Modal.Body className="text-center py-4">
                <div className="modal-body text-center pb-0 mb-0">
                    {renderBody && renderBody()}
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-1">
                {isConfirm && (
                    <Button
                        type="button"
                        variant="primary"
                        style={{ width: "10rem" }}
                        className="me-2"
                        disabled={confirmDisabled}
                        onClick={handleConfirm}
                    >
                        <i className="bi bi-check-circle-fill me-2"></i>
                        {confirmText ?? "Conferma"}
                    </Button>
                )}

                {isDangerClose ? (
                    <Button
                        type="button"
                        variant="outline-primary"
                        style={{ width: "10rem" }}
                        onClick={() => resolve(false)}
                    >
                        <i className="bi bi-x-circle-fill me-2"></i> Chiudi
                    </Button>
                ) : (
                    !notClosing && (
                        <Button
                            type="button"
                            variant={isConfirm ? "outline-primary" : "primary"}
                            style={{ width: "10rem" }}
                            onClick={() => resolve(false)}
                        >
                            <i className={`bi bi-x-circle-fill me-2`}></i>
                            {closeText ?? "Chiudi"}
                        </Button>
                    )
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal

export const openCustomModal = (args: CustomModalProps) => {
    const isModalPresent = !!document.querySelector(`#${args.type}-id`)
    if (isModalPresent) {
        return
    }
    let resolveFunction: (value: PromiseLike<boolean> | boolean) => void = () =>
        true

    const resultPromise = new Promise<boolean>((resolve, reject) => {
        resolveFunction = resolve
    })

    const modal = (
        <CustomModal
            type={args.type}
            size={args.size}
            disabledConfirm={args.disabledConfirm}
            show={true}
            title={args.title}
            resolve={resolveFunction}
            renderBody={args.renderBody}
            isConfirm={args.isConfirm}
            isDangerClose={args.isDangerClose}
            confirmText={args.confirmText}
            closeText={args.closeText}
            callback={args.callback}
            notClosing={args.notClosing}
        />
    )

    const container = document.createElement("div")
    container.id = `${args.type}-id`
    document.body.appendChild(container)

    const root = ReactDOM.createRoot(container)

    const closeAndUnmount = () => {
        root.unmount()
        document.body.removeChild(container)
    }

    root.render(modal)

    const cleanup = () => {
        closeAndUnmount()
    }

    resultPromise.then(cleanup, cleanup)

    return resultPromise
}

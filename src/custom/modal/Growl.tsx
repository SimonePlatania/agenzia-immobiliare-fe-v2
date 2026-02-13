import Toast from "react-bootstrap/Toast"
import {useDispatch, useSelector} from "react-redux"
import {setGrowl} from "@/store/slices/uiSlice";
import type {AppState} from "@/store/store";

const Growl = () => {
    const dispatch = useDispatch()
    const growl = useSelector((state: AppState) => state.ui.growl)

    const hideGrowl = () => {
        dispatch(setGrowl({show: false}))
    }

    return (
        <Toast
            className={"shadow-lg custom-toast " + (growl.style ? " border bg-white " + growl.style : "")}
            style={{
                position: "fixed",
                top: 60,
                right: 20,
                width: "350px",
                zIndex: 2000
            }}
            onClose={() => hideGrowl()}
            show={growl.show}
            delay={5000}
            autohide
        >
            <Toast.Header
                className={"border-bottom py-2 bg-opacity-10 bg-muted"}
                closeButton={false}>

                <i className={"ps-0 ms-0 " + (growl.style || "") + growl.icon}/>
                <strong className=" me-auto">{growl.header || ""}</strong>
            </Toast.Header>
            <Toast.Body className={"py-2"}>{growl.body || ""}</Toast.Body>
        </Toast>
    )
}
export default Growl

export const createGrowl = (header: string, body: string) => {
    return {
        show: true,
        style: "base ",
        icon: "bi bi-exclamation mr-2",
        header: header,
        body: body
    }
}
export const createInfoGrowl = (message: string) => {
    const successGrowl = createGrowl("Dettaglio", message || "Informazioni disponibili")
    successGrowl.icon = "bi bi-info-circle-fill mr-2 px-2 text-primary"
    successGrowl.style = " primary "
    return successGrowl
}

export const createSuccessGrowl = (message: string) => {
    const successGrowl = createGrowl(
        "Operazione completata",
        message || "Salvataggio effettuato con successo!"
    )
    successGrowl.icon = "bi bi-check-circle-fill mr-2 px-2 text-success"
    successGrowl.style = " success "
    return successGrowl
}
export const createErrorGrowl = (errore: string) => {
    const errorGrowl = createGrowl(
        "Attenzione",
        errore || "Si è verificato un errore"
    )
    errorGrowl.icon = "bi bi-x-circle-fill mr-2 px-2 text-danger"
    errorGrowl.style = " danger "
    return errorGrowl
}
export const createWarningGrowl = (errore: string) => {
    const warningGrowl = createGrowl(
        "Attenzione",
        errore || "Operazione non disponibile"
    )
    warningGrowl.icon = "bi bi-exclamation-triangle-fill mr-2 px-2 text-warning"
    warningGrowl.style = "warning "
    return warningGrowl
}

import type { ChangeEvent, Dispatch } from "react"
import type { UseFormReturn } from "react-hook-form"
import {
    addDangerMessage,
    addSuccessMessage,
    clearMessages
} from "@/store/slices/messagesSlice"
import { RicercaRequest, Tipologica } from "@/utils/types"
import { DATE, Sections } from "@/utils/constants/consts"
import { setSection } from "@/store/slices/sectionSlice"
import { format } from "date-fns"
import { AnyAction } from "@reduxjs/toolkit"

export const onFileSelected = (event: ChangeEvent<any>): Promise<any> => {
    return new Promise((resolve, reject) => {
        const file: File | undefined = event.target.files?.[0]

        if (!file) {
            reject(new Error("Nessun file selezionato"))
            return
        }
        const splittedName = file.name.split(/[.]/g)

        if (!/^(pdf|p7m|jpeg)$/.test(splittedName[splittedName.length - 1])) {
            reject(
                new Error(
                    "Formato non valido, selezionare un file PDF, P7M o JPEG"
                )
            )
            return
        }

        const reader: FileReader = new FileReader()

        reader.onload = (event) => {
            const base64String = event.target?.result?.toString().split(",")[1]
            const decodedData = base64String
                ? Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0))
                : new Uint8Array()
            resolve({ byteArray: base64String, nomeFile: file.name })
        }

        reader.readAsDataURL(file)
    })
}

export const scrollToTop = (offset?: number) => {
    window.scrollTo({
        top: offset ?? 200,
        behavior: "smooth"
    })
}

export const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
    })
}

export const cleanFiltri = (
    filtri: RicercaRequest
): Partial<RicercaRequest> => {
    return Object.fromEntries(
        Object.entries(filtri).filter(
            ([_, value]) =>
                value !== "" && value !== null && value !== undefined
        )
    ) as Partial<RicercaRequest>
}

export const handleFileSelect = (
    e: ChangeEvent<any>,
    dispatch: Dispatch<any>,
    form: UseFormReturn
) => {
    const file = e.target.files[0]

    if (file) {
        if (file.size > 20 * 1024 * 1024) {
            scrollToTop()
            dispatch(
                addDangerMessage({
                    text: "Dimensione massima consentita: 20 mb"
                })
            )
            return
        }
        onFileSelected(e)
            .then((r) => {
                form.setValue(e.target.id, r.byteArray, {
                    shouldValidate: true
                })
                form.setValue("nomeFile", r.nomeFile, {
                    shouldValidate: true
                })
                dispatch(
                    addSuccessMessage({
                        text: `Allegato caricato correttamente: ${r.nomeFile}`
                    })
                )
                scrollToTop()
            })
            .catch((err) => {
                e.target.value = ""
                // dispatch(setGrowl(createErrorGrowl(err.message)))
                dispatch(addDangerMessage({ text: err.message }))
                scrollToTop()
                form.setValue(e.target.id, "", { shouldValidate: true })
                form.setValue("nomeFile", "", {
                    shouldValidate: true
                })
            })
        dispatch(clearMessages())
    }
}

export const findByTipologica = (
    tipologica: Tipologica<number>[],
    key: number
) => {
    return tipologica.find((t: Tipologica<number>) => t.key == key)?.value
}

export const truncateString = (stringa: string): string => {
    return stringa.length > 10
        ? `${stringa.slice(0, 15)}...`
        : stringa ?? "Nessun risultato"
}

export const formatDateToDMYHHMM = (date: string | Date): string => {
    return format(new Date(date), DATE.GIORNO_MESE_ANNO_ORARIO)
}

export const formatDateToDMY = (date: string | Date): string => {
    return format(new Date(date), DATE.GIORNO_MESE_ANNO)
}

export const formatDateToHHMM = (date: string | Date): string => {
    return format(new Date(date), DATE.ORARIO)
}

export const navigateToSection = (
    section: Sections,
    dispatch: Dispatch<AnyAction>
) => {
    return dispatch(setSection(section))
}

export const getNumeroRisulati = (elementi: Array<any>): string => {
    if (elementi.length === 0) {
        return "Nessun risultato ottenuto"
    }

    return `Numero risultati: ${elementi.length}`
}

export const getUtente = (id: number | string): string => {
    return id === "0" ? "Utente anonimo" : "Utente registrato"
}


import type {ChangeEvent, Dispatch} from "react";
import type {UseFormReturn} from "react-hook-form";
import type {OptionList} from "./types.ts";
import type {StatoSelectSearch} from "./constants/consts.ts";
import type {BreadCrumbType} from "@/store/slices/breadCrumb-slice";
import {addDangerMessage, addSuccessMessage, clearMessages} from "@/store/slices/messagesSlice";
import {scrollToTop} from "@/utils/genericUtils";
import {AppPaths, pathLabels} from "@/utils/constants/routes";

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
                dispatch(addSuccessMessage({text:`Allegato caricato correttamente: ${r.nomeFile}`}))
                scrollToTop()
            })
            .catch((err) => {
                e.target.value = ""
                // dispatch(setGrowl(createErrorGrowl(err.message)))
                dispatch(addDangerMessage({text: err.message}))
                scrollToTop()
                form.setValue(e.target.id, "", { shouldValidate: true })
                form.setValue("nomeFile", "", {
                    shouldValidate: true
                })
            })
        dispatch(clearMessages())
    }
}

export interface CustomInputProps {
    field: string
    type: string
    descr?: string
    name?: string
    onChangeEvent?: (e: ChangeEvent<any>) => void
    onClickEvent?: (e: React.MouseEvent<HTMLElement>) => void
    onBlurEvent?: (e: any) => void
    form: UseFormReturn
    ariaLabel?: string
    classes?: string
    disabled?: boolean
    disabledCondition?: boolean
    readOnly?: boolean
    isRequired?: boolean
    options?: Array<OptionList>
    secondOptions?: Array<OptionList>
    placeholder?: string
    checked?: boolean
    submitValidation?: boolean
    onFocusEvent?: (e: any) => void
    submitButton?: boolean
    noOptionMessage?: string
    invalidCondition?: boolean
    statoSelect?: StatoSelectSearch | string
    changeActions?: (arg?: any) => void
    optionLabel?: (val: any) => string
    optionValue?: (val: any) => string
    filterOptions?: any
    rows?: number
    maxLength?: number
    maxDate?: string
    minDate?: string
    isSearch?: boolean
    callback?: () => any
    style?: any
    value?: any
    noLabel?: boolean
    autocompleteList?: string[]
    isLoading?: boolean
    noEmptyOption?: boolean
    minOrario?: string
    maxOrario?: string
    stepOrario?: string
    fileTypes?: string[]
    isDifferentPlaceholder?: boolean
    upField?: string
    isDecimalNumber?: boolean
    minHour?: string
    maxHour?: string
}

export interface CustomModalProps {
    title: string
    size?: "xl" | "lg" | "sm" | "md"
    renderBody?: (arg?: any) => React.JSX.Element
    isConfirm?: boolean
    confirmText?: string
    closeText?: string
    callback?: any
    isDangerClose?: boolean
    disabledConfirm?: boolean | (() => boolean)
    notClosing?: boolean
    type?: "default" | "info" | "warning" | "danger" | "success"
}

export interface CustomModalPromiseProps extends CustomModalProps {
    show: boolean
    resolve: (value: boolean) => void
}

export interface SelectSearchProps {
    form: UseFormReturn
    field: string
    disabled?: boolean
    isLoading?: boolean
    options: Array<any>
    noOptionMessage?: string
    placeholder?: string
    isInvalid: () => boolean
    invalidCondition?: boolean
    stato?: StatoSelectSearch | string
    changeActions?: (arg?: any) => void
    optionLabel?: (value: any) => string
    optionValue?: (value: any) => string
    descr?: string
    fieldToDesc: (field: string) => string
    isRequired?: boolean
    filterOptions?: (value: any) => boolean
    noEmptyOption?: boolean
}

export interface Option {
    value: string
    label: string
}

export interface PaginazioneProps {
    totalItems?: number
    allPages?: number
    currentPage: number
    onPageChange: (args?: any) => void
}

export const updatedBreadCrumbs = (
    path: string,
    breadcrumbs: Array<string>
) => {
    const index = breadcrumbs.indexOf(path)
    if (index < breadcrumbs.length - 1) {
        return breadcrumbs.slice(0, index + 1)
    }
}

export const previusPath = (breadcrumbs: Array<BreadCrumbType>): AppPaths => {
    if (breadcrumbs.length < 2) {
        return AppPaths.REDIRECT
    }
    if (breadcrumbs[breadcrumbs.length - 2].includes("risultati-ricerca")) {
        return breadcrumbs[breadcrumbs.length - 3]
    }
    return breadcrumbs[breadcrumbs.length - 2]
}

export const findLabel = (path: AppPaths) => {
    switch (true) {
        default:
            return pathLabels[path]
    }
}

export const pathToEsclude: AppPaths[] = [AppPaths.HOME]

export const isValidNavigation = (path: string): boolean => {
    switch (path) {
        default:
            return !pathToEsclude.some((p: AppPaths) => path?.includes(p))
    }
}

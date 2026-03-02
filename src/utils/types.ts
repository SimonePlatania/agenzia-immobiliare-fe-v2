import type { ChangeEvent } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { StatoSelectSearch } from "./constants/consts.ts"

//TIPOLOGICA
export interface Tipologica<T> {
    key: T | string
    value: string
}

export interface TipologicaDto<T> {
    codice: T
    descrizione: string
}

export interface ErrorMessage {
    data: {
        messaggio: string
    }
}

//ANNUNCIO
export interface Annuncio {
    id?: number
    dataPubblicazione?: Date | string
    cittaId: number
    utenteId: number
    tipologiaImmobileId: number
    tipologiaAnnuncioId: number
    titolo: string
    descrizione?: string
    speseAggiuntive: number
    prezzo: number
    zona: string
    mq: number
    numeroStanze: number
    piano: number
    esisteAscensore?: string
    esisteGarage?: string
    esistePostoAutoAssegnato?: string
    esisteTerrazzo?: string
    rimosso?: boolean
    numeroVisualizzazioni?: number
}

//UTENTE
export interface UtenteRequest {
    nome: string
    cognome: string
    email: string
    password: string
    telefono: string
    ruoloId: number
}

export interface UtenteResponse {
    id: string
    nome: string
    cognome: string
    email: string
    telefono: string
    ruoloId: number
}

//LOGIN
export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    id: string
    nome: string
    cognome: string
    email: string
    ruolo: string
}

//DOMANDA
export interface DomandaRequest {
    id?: number
    dataDomanda?: Date | string
    domanda: string
    annuncioId?: number | string
    utenteId?: number | string
}

export interface DomandaResponse {
    id: number
    titoloAnnuncio: string
    dataDomanda: Date | string
    domanda: string
    risposta: string
    annuncioId: number
    utenteId: number
    lettoDaUtente: string
}

//CAMBIO PASSWORD
export interface PasswordChangeRequest {
    vecchiaPassword: string
    nuovaPassword: string
}

//RICERCA
export interface RicercaRequest {
    tipologiaAnnuncioId?: string
    tipologiaImmobileId?: string
    prezzoDa?: string | number
    prezzoAl?: string | number
    dataDal?: Date | string
    dataAl?: Date | string
    mqMinimi?: string | number
    stanzeMinime?: string | number
    piano?: string | number
    citta?: string
    ascensore?: string | number
    garage?: string | number
    terrazzo?: string | number
    postoAuto?: string | number
    zona?: string
    speseAggiuntive?: string | number
    titolo?: string
}

export interface RicercaResponse {
    annunci: Array<Annuncio>
    paginazione: Paginazione
}

//PAGINAZIONE
export interface Paginazione {
    countElementi: number
    numPagina: number
    elementiPagina: number
    pagineTotali: number
}

export interface RispostaDTO {
    domandaId: number
    annuncioId: number
    utenteId: number
    risposta: string
    lettoDaUtente: string
}

//UTILITIES
export type OptionList = Tipologica<any> | TipologicaDto<any> | string

export interface TipologicheState {
    codice: string
    descrizione: string
    tipologicaProdMiscelatiList: Array<Tipologica<string>>
    tipologicaRuoli: Array<Tipologica<string>>
    tipologicaCitta: Array<Tipologica<string>>
    tipologicaImmobile: Array<Tipologica<string>>
    tipologicaAnnuncio: Array<Tipologica<string>>
    tipologicaClienti: Array<Tipologica<string>>
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

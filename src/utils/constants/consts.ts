export const TITLE_APP = "Agenzia immobiliare"
export const APP_NAME = "Miscelazione"
export const DICHIARAZIONE_ACCESSIBILITA = "Dichiarazione di accessibilità"
export const AGENZIA_DOGANE = "Agenzia delle dogane e dei Monopoli"

export const INTEGER_REGEX = /^[0-9]*$/
export const DOUBLE_REGEX = /^(\d+(\.\d+)?|)$/

export enum Session {
    TOTAL_SESSION_TIME = 30 * 60,
    SHOW_SESSION_MESSAGE_TIME = 5 * 60
}

export enum Constants {
    DATE_MAX = "2099-12-31",
    FORMAT_DATE_PATTERN = "yyyy-MM-dd",
    EMPTY_DATA = "Nessun risultato",
    URL_LOGOUT = "https://www.adm.gov.it/portale/c/portal/logout",
    URL_LOGOUT_VAL = "https://portaleunicoval.adm.gov.it/portale/c/portal/logout",
    URL_AREA_PROVENIENZA = "https://portaleunicosvil.adm.gov.it/portale/area-riservata-dogane",
    URL_ASSISTENZA = "https://portaleunicosvil.adm.gov.it/portale/contatti-e-assistenza",
    URL_INFO_ASSISTENZA = "https://www.adm.gov.it/portale/",
    FILENAME_CSV = "MAU ADM Pubblicazione.csv",
    ROWS_PAGE = 10,
    WINDOW_LIMIT = 1500
}

export enum DATE {
    GIORNO_MESE_ANNO_ORARIO = "dd/MM/yyyy HH:mm",
    GIORNO_MESE_ANNO = "dd/MM/yyyy",
    ORARIO = "HH:mm"
}

export enum InputTypes {
    TEXT = "text",
    PASSWORD = "password",
    NUMBER = "number",
    SELECT = "select",
    DATE = "date",
    DATE_TIME = "datetime-local",
    ORARIO = "orario",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    TEXT_BUTTON = "textButton",
    FILE = "file",
    SELECT_SEARCH = "selectSearch",
    TEXTAREA = "textarea",
    COD_DITTA_SELECT = "inputCodDittaSelect",
    HOUR_PICKER = "hourPicker"
}

export enum StatoSelectSearch {
    CARICAMENTO = "caricamento",
    COMPLETATO = "completato",
    MESSAGE_CARICAMENTO = "Caricamento in corso delle opzioni disponibili...",
    MESSAGE_DISABLED = "Opzioni disabilitate"
}

export const today = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}

export enum Errors {
    TYPE_REQUIRED = "Campo obbligatorio",
    EMPTY_PRODOTTI = "Aggiungere almeno un prodotto",
    TYPE_DATE = "Il campo deve contenere una data valida",
    MIN_TODAY = "La data non può essere antecedente alla data odierna",
    TYPE_ORARIO = "Il campo deve contenere un orario valido",
    TYPE_EMAIL = "Il campo deve contenere un indirizzo email valido",
    TYPE_NUMBER = "Il campo deve essere numerico",
    TYPE_POSITIVE = "Il campo deve contenere un numero positivo",
    TYPE_INTEGER = "Il campo deve contenere un numero intero",
    TYPE_MAX = "Il campo deve contenere massimo ${max} caratteri",
    TYPE_MIN = "Il campo deve contenere minimo ${min} caratteri",
    INTERNAL = "Errore interno. Riprovare più tardi.",
    TODAY_MAX = "Il campo non può essere successivo alla data odierna"
}

export enum Sections {
    ACQUISIZIONE = "acquisizione",
    MODIFICA = "modifica",
    IMPOSTAZIONI = "impostazioni",
    DETTAGLIO = "dettaglio",
    DETTAGLIO_UTENTE = "dettaglio-utente",
    RICERCA = "ricerca",
    DETTAGLIO_FROM_DOMANDA = "dettaglio-domanda",
    HOME = "home",
    REGISTRA_UTENTE = "registra-utente"
}

export enum Ruolo {
    AMMINISTRATORE = "AMMINISTRATORE",
    UTENTE = "UTENTE",
    CLIENTE = "CLIENTE"
}

export const initialStateRedux = {
    privato: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
            online: true,
            focused: true,
            middlewareRegistered: true,
            refetchOnFocus: false,
            refetchOnReconnect: false,
            refetchOnMountOrArgChange: false,
            keepUnusedDataFor: 0,
            reducerPath: "privato"
        }
    },
    ui: {
        cookieBar: false,
        sessionTime: 1800,
        showMessage: false,
        spinner: false,
        messageStatus: "",
        growl: {
            show: false,
            header: "",
            body: "",
            icon: "",
            style: ""
        },
        routeTo: "",
        navbar: []
    },
    messages: {
        successMessages: [],
        infoMessages: [],
        warningMessages: [],
        dangerMessages: [],
        messagesCount: 0
    },
    breadcrumb: ["/home"],
    breadcrumbSaved: ["/home"],
    tipologica: {
        codice: "",
        descrizione: "",
        tipologicaProdMiscelatiList: [],
        tipologicaRuoli: [],
        tipologicaCitta: [],
        tipologicaImmobile: [],
        tipologicaAnnuncio: [],
        tipologicaClienti: []
    },
    utente: {
        id: "",
        nome: "",
        cognome: "",
        email: "",
        ruolo: ""
    },
    section: "acquisizione",
    annuncio: {
        cittaId: 0,
        descrizione: "",
        esisteAscensore: "",
        esisteGarage: "",
        esistePostoAutoAssegnato: "",
        esisteTerrazzo: "",
        id: 0,
        mq: 0,
        numeroStanze: 0,
        numeroVisualizzazioni: 0,
        piano: 0,
        prezzo: 0,
        rimosso: false,
        speseAggiuntive: 0,
        tipologiaAnnuncioId: 0,
        tipologiaImmobileId: 0,
        titolo: "",
        utenteId: 0,
        zona: ""
    },
    ricerca: {
        tipologiaAnnuncioId: "",
        tipologiaImmobileId: "",
        prezzoDa: "",
        prezzoAl: "",
        dataDal: "",
        dataAl: "",
        mqMinimi: "",
        stanzeMinime: "",
        piano: "",
        citta: "",
        ascensore: "",
        garage: "",
        terrazzo: "",
        postoAuto: "",
        zona: "",
        speseAggiuntive: "",
        titolo: ""
    },
    listaAnnunci: []
}

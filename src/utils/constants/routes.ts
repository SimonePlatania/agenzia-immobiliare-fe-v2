export enum AppPaths {
    REDIRECT = "*",
    ERROR = "/error",
    DELEGANTI = "/",
    CODICE_DITTA = "/codiceDitta",
    MENU = "menu",
    HOME = "/home",
    RICERCA_MODIFICA = "/ricerca-modifica",
    NUOVA_COMUNICAZIONE_PREVENTIVA = "nuova-comunicazione-preventiva",
    COMUNICAZIONE_PREVENTIVA_DETAIL = "comunicazione-preventiva",
    COMUNICAZIONE_PREVENTIVA_ANNULLATA_DETAIL = "comunicazione-preventiva-annullata",
    COMUNICAZIONI_PREVENTIVE = "comunicazioni-preventive",
    //NOTE -> Nuove routes per agenzia
    LOGIN = "/login",
    REGISTER = "/registrazione",
    AGENZIA_IMMOBILIARE = "agenzia-immobiliare",
    CREA_ANNUNCIO = "/crea-annuncio",
    ANNUNCIO_DETTAGLIO = "/annuncio/dettaglio"
}

export const pathLabels: { [key in AppPaths]: string } = {
    [AppPaths.REDIRECT]: "Redirect",
    [AppPaths.ERROR]: "Errore",
    [AppPaths.DELEGANTI]: "Seleziona delegante",
    [AppPaths.CODICE_DITTA]: "Ricerca Codice Accisa",
    [AppPaths.MENU]: "Menu",
    [AppPaths.HOME]: "Home",
    [AppPaths.RICERCA_MODIFICA]: "Ricerca",
    [AppPaths.NUOVA_COMUNICAZIONE_PREVENTIVA]: "Nuova comunicazione preventiva",
    [AppPaths.COMUNICAZIONE_PREVENTIVA_DETAIL]: "Comunicazione preventiva",
    [AppPaths.COMUNICAZIONI_PREVENTIVE]: "Comunicazioni preventive",
    [AppPaths.COMUNICAZIONE_PREVENTIVA_ANNULLATA_DETAIL]:
        "Comunicazione preventiva annullata",
    [AppPaths.LOGIN]: "Login",
    [AppPaths.REGISTER]: "Registrazione",
    [AppPaths.AGENZIA_IMMOBILIARE]: "Agenzia immobiliare",
    [AppPaths.CREA_ANNUNCIO]: "Crea annuncio",
    [AppPaths.ANNUNCIO_DETTAGLIO]: "Dettaglio annuncio"
}

export const PATHS_NO_NAVBAR: Array<string | AppPaths> = [
    AppPaths.ERROR,
    AppPaths.DELEGANTI,
    AppPaths.CODICE_DITTA
]

export const PATHS_NO_SIDEBAR = [
    ...PATHS_NO_NAVBAR,
    AppPaths.HOME.replace("/", "")
]

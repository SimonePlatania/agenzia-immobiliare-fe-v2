export enum UtenteRest {
    UTENTE = `/utente`,
    REGISTRA_UTENTE = `/registra`,
    LOGIN_UTENTE = `/login`,
    LOGOUT_UTENTE = `/logout`,
    MODIFICA_PASSWORD = `/modifica-password`,
    MODIFICA_DATI_ANAGRAFICI = `/modifica`,
    LISTA_UTENTI = `/lista-utenti`
    // GET_UTENTE = ``,
}

export enum TipologicaRest {
    TIPOLOGICA = `/tipologica`,
    GET_CITTA = `/lista-citta`,
    GET_TIPO_IMMOBILI = `/lista-tipo-immobili`,
    GET_TIPO_ANNUNCI = `/lista-tipo-annunci`,
    GET_TIPO_RUOLO = `/lista-tipo-ruoli`,
    GET_CLIENTI = "/lista-clienti"
}

export enum RicercaRest {
    RICERCA = "/ricerca"
}

export enum AnnuncioRest {
    ANNUNCIO = `/annuncio`,
    REGISTRA_ANNUNCIO = `/registra`,
    RIMUOVI_ANNUNCIO = `/rimuovi`,
    IMPOSTA_TIPO_ANNUNCIO = `/tipo`,
    MODIFICA_ANNUNCIO = `/modifica`,
    // GET_ANNUNCIO = ``,
    GET_ALL_ANNUNCI = `/lista-annunci`,
    GET_ALL_ANNUNCI_PERSONALI = `/lista-annunci-personali`,
    GET_ANNUNCI_BY_CITTA = `/lista`,
    GET_UTENTE_BY_ANNUNCIO = `/dati-utente`,
    INSERISCI_DOMANDA = `/inserisci-domanda`,
    INSERISCI_RISPOSTA = `/inserisci-risposta`,
    GET_RISPOSTA_BY_ID = `/risposta`,
    GET_ALL_DOMANDE = `/lista-domande`,
    GET_ALL_DOMANDE_PERSONALI = `/lista-domande-personali`,
    DATI_UTENTE_ANNUNCIO = `/dati-utente-annuncio`,
    DATI_UTENTE_DOMANDA = `/dati-utente-domanda`
}

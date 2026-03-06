import * as yup from "yup"
import { ObjectSchema } from "yup"
import {
    Annuncio,
    LoginRequest,
    PasswordChangeRequest,
    UtenteRequest,
    UtenteResponse
} from "@/utils/types"
import { Errors } from "@/utils/constants/consts"

export const loginSchema: ObjectSchema<LoginRequest> = yup.object({
    email: yup
        .string()
        .email("Il formato dell'email non è valido")
        .required("L'email è obbligatoria"),
    password: yup
        .string()
        .max(70, "La password supera i caratteri massimi (70)")
        .required("La password è obbligatoria")
})

export const annuncioSchema: ObjectSchema<Annuncio> = yup.object({
    cittaId: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(1, Errors.TYPE_REQUIRED)
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    utenteId: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(1, Errors.TYPE_REQUIRED)
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    tipologiaImmobileId: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(1, Errors.TYPE_REQUIRED)
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    tipologiaAnnuncioId: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(1, Errors.TYPE_REQUIRED)
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    titolo: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .min(10, "Il titolo deve avere almeno 10 caratteri"),
    speseAggiuntive: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(0, "Le spese aggiuntive non posso essere inferiori a 0"),
    prezzo: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)
        .required(Errors.TYPE_REQUIRED)
        .min(1, "Il prezzo non può essere inferiore o uguale a 0"),
    zona: yup.string().required(Errors.TYPE_REQUIRED),
    mq: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(
            1,
            "Il valore dei metri quadri non può essere inferiore o uguale a 0"
        ),
    numeroStanze: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)

        .required(Errors.TYPE_REQUIRED)
        .min(1, "Il numero di stanze non può essere inferiore o uguale a 0"),
    piano: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)
        .required("Il piano è obbligatorio"),
    esisteAscensore: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .matches(/^(0|1)$/, Errors.VALUE_NOT_VALID),
    esisteGarage: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .matches(/^(0|1)$/, Errors.VALUE_NOT_VALID),
    esistePostoAutoAssegnato: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .matches(/^(0|1)$/, Errors.VALUE_NOT_VALID),
    esisteTerrazzo: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .matches(/^(0|1)$/, Errors.VALUE_NOT_VALID),
    dataPubblicazione: yup.date().typeError(Errors.TYPE_DATE),
    rimosso: yup.boolean(),
    id: yup.number().typeError(Errors.TYPE_NUMBER),
    descrizione: yup
        .string()
        .max(800, "La descrizione non può superare gli 800 caratteri"),
    numeroVisualizzazioni: yup.number().typeError(Errors.TYPE_NUMBER),
    foto: yup.string()
})

export const registrazioneSchema: ObjectSchema<UtenteRequest> = yup.object({
    nome: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(20, "Il campo non può superare i 20 caratteri"),
    cognome: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(30, "Il campo non può superare i 30 caratteri"),
    email: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .email("Il formato dell'email non è valido")
        .max(70, "Il campo non può superare i 70 caratteri"),
    password: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(70, "La password supera i caratteri massimi (70)"),
    telefono: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .matches(
            /^(\+39)?\s?[0-9]{10}$/,
            "Il numero di telefono non rispetta il formato standard richiesto"
        ),
    ruoloId: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)
        .required(Errors.TYPE_REQUIRED)
})

export const modificaUtenteSchema: ObjectSchema<UtenteResponse> = yup.object({
    id: yup.string().required(Errors.TYPE_REQUIRED),
    nome: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(20, "Il campo non può superare i 20 caratteri"),
    cognome: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(30, "Il campo non può superare i 30 caratteri"),
    email: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .email("Il formato dell'email non è valido")
        .max(70, "Il campo non può superare i 70 caratteri"),
    telefono: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .matches(
            /^(\+39)?\s?[0-9]{10}$/,
            "Il numero di telefono non rispetta il formato standard richiesto"
        ),
    ruoloId: yup
        .number()
        .typeError(Errors.TYPE_NUMBER)
        .required(Errors.TYPE_REQUIRED)
})

export const modificaPasswordSchema: ObjectSchema<PasswordChangeRequest> =
    yup.object({
        vecchiaPassword: yup
            .string()
            .required(Errors.TYPE_REQUIRED)
            .max(70, "Il campo non può superare i 70 caratteri"),
        nuovaPassword: yup
            .string()
            .required(Errors.TYPE_REQUIRED)
            .max(70, "Il campo non può superare i 70 caratteri")
    })

export const rispostaSchema = yup.object({
    risposta: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(500, "La risposta non può superare i 500 caratteri")
})

export const domandaSchema = yup.object({
    domanda: yup
        .string()
        .required(Errors.TYPE_REQUIRED)
        .max(500, "La domanda non può superare i 500 caratteri")
})

import * as yup from "yup"
import { ObjectSchema } from "yup"
import { Annuncio, LoginRequest } from "@/utils/types"

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
        .required("Il campo è obbligatorio")
        .min(1, "Il campo è obbligatorio")
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    utenteId: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(1, "Il campo è obbligatorio")
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    tipologiaImmobileId: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(1, "Il campo è obbligatorio")
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    tipologiaAnnuncioId: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(1, "Il campo è obbligatorio")
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    titolo: yup
        .string()
        .required("Il campo è obbligatorio")
        .min(10, "Il titolo deve avere almeno 10 caratteri"),
    speseAggiuntive: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(0, "Le spese aggiuntive non posso essere inferiori a 0"),
    prezzo: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(1, "Il prezzo non può essere inferiore o uguale a 0"),
    zona: yup.string().required("Il campo è obbligatorio"),
    mq: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(
            1,
            "Il valore dei metri quadri non può essere inferiore o uguale a 0"
        ),
    numeroStanze: yup
        .number()
        .required("Il campo è obbligatorio")
        .min(1, "Il numero di stanze non può essere inferiore o uguale a 0"),
    piano: yup.number().required("Il piano è obbligatorio"),
    esisteAscensore: yup
        .string()
        .required("Il campo è obbligatorio")
        .matches(/^(0|1)$/, "Valore non valido"),
    esisteGarage: yup
        .string()
        .required("Il campo è obbligatorio")
        .matches(/^(0|1)$/, "Valore non valido"),
    esistePostoAutoAssegnato: yup
        .string()
        .required("Il campo è obbligatorio")
        .matches(/^(0|1)$/, "Valore non valido"),
    esisteTerrazzo: yup
        .string()
        .required("Il campo è obbligatorio")
        .matches(/^(0|1)$/, "Valore non valido"),
    dataPubblicazione: yup.date(),
    rimosso: yup.boolean(),
    id: yup.number(),
    descrizione: yup
        .string()
        .max(800, "La descrizione non può superare gli 800 caratteri"),
    numeroVisualizzazioni: yup.number()
})

// export const registrazioneSchema: ObjectSchema<UtenteRequest> = yup.object({
//     nome: yup.string().required("Il campo è obbligatorio"),
//     cognome: yup.string().required("Il campo è obbligatorio"),
//     email: yup.string().required("Il campo è obbligatorio"),
//     password: yup.string().required("Il campo è obbligatorio"),
//     telefono: yup.string().required("Il campo è obbligatorio"),
//     ruoloId: yup.string().required("Il campo è obbligatorio")
// })

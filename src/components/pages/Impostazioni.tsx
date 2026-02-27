import { useSelector } from "react-redux"
import { Ruolo } from "@/utils/constants/consts"
import { AppState } from "@/store/store"

export const Impostazioni = () => {
    const { nome, cognome, ruolo } = useSelector(
        (state: AppState) => state.utente
    )
    const descrizione: string = `Hey ${nome} ${cognome}.`
    const isAdmin = ruolo === Ruolo.AMMINISTRATORE

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Impostazioni</legend>

                <p>{descrizione}</p>
                {isAdmin && (
                    <i>
                        In questa sezione puoi accedere e gestire tutte le
                        principali funzionalità dell’area amministrativa.
                        <br></br>
                        <br></br>
                        Dalla dashboard puoi avere una panoramica generale del
                        sistema, creare e ricercare annunci, gestire quelli
                        esistenti e aggiornare i dati anagrafici dei clienti.
                        <br></br>
                        Inoltre, è possibile registrare nuovi utenti e
                        modificare la propria password personale in modo
                        semplice e sicuro.
                    </i>
                )}
            </fieldset>
        </>
    )
}

export default Impostazioni

import { useSelector } from "react-redux"
import { Ruolo } from "@/utils/constants/consts"
import { AppState } from "@/store/store"
import DomandeUtente from "@/components/pages/DomandeUtente"
import { GestioneAnnunci } from "@/components/pages/GestioneAnnunci"

export const Impostazioni = () => {
    const { nome, cognome, ruolo } = useSelector(
        (state: AppState) => state.utente
    )
    const descrizione: string = `Hey ${nome} ${cognome}.`
    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE
    const isUtente: boolean = ruolo === Ruolo.UTENTE

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Impostazioni</legend>

                <p>{descrizione}</p>
                {isAdmin && (
                    <>
                        <i>
                            In questa sezione puoi accedere e gestire tutte le
                            principali funzionalità dell’area amministrativa.
                            <br></br>
                            <br></br>
                            Dalla dashboard puoi avere una panoramica generale
                            del sistema, creare e ricercare annunci, gestire
                            quelli esistenti e aggiornare i dati anagrafici dei
                            clienti.
                            <br></br>
                            Inoltre, è possibile registrare nuovi utenti e
                            modificare la propria password personale in modo
                            semplice e sicuro.
                        </i>
                        <GestioneAnnunci />
                    </>
                )}

                {isUtente && <DomandeUtente />}
            </fieldset>
        </>
    )
}

export default Impostazioni

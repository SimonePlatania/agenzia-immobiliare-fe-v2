import { useSelector } from "react-redux"
import { Ruolo, Sections } from "@/utils/constants/consts"
import { AppState } from "@/store/store"
import DomandeUtente from "@/components/pages/DomandeUtente"
import SchedaUtente from "@/components/pages/SchedaUtente"
import GestioneAnnunci from "@/components/pages/GestioneAnnunci"
import Registrazione from "@/components/pages/Registrazione"
import ListaUtenti from "@/components/pages/ListaUtenti"
import ModificaPassword from "@/components/pages/ModificaPassword"

export const Impostazioni = () => {
    const { nome, cognome, ruolo } = useSelector(
        (state: AppState) => state.utente
    )
    const section = useSelector((state: AppState) => state.section)
    const descrizione: string = `Hey ${nome} ${cognome}.`
    const isAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE
    const isUtente: boolean = ruolo === Ruolo.UTENTE

    return (
        <>
            <fieldset className="fieldset-bordered fieldset-main mt-5">
                <legend>Impostazioni</legend>
                <p>{descrizione}</p>
                <>
                    {isAdmin && (
                        <>
                            {(section === Sections.DETTAGLIO_UTENTE ||
                                section === Sections.MODIFICA_UTENTE) && (
                                <SchedaUtente />
                            )}
                            {section === Sections.IMPOSTAZIONI && (
                                <GestioneAnnunci />
                            )}
                            {section === Sections.REGISTRA_UTENTE && (
                                <Registrazione />
                            )}
                            {section === Sections.LISTA_UTENTI && (
                                <ListaUtenti />
                            )}
                            {section === Sections.MODIFICA_PASSWORD && (
                                <ModificaPassword />
                            )}
                        </>
                    )}
                </>

                {isUtente && (
                    <>
                        {section === Sections.IMPOSTAZIONI && <DomandeUtente />}
                        {section === Sections.MODIFICA_PASSWORD && (
                            <ModificaPassword />
                        )}
                    </>
                )}
            </fieldset>
        </>
    )
}

export default Impostazioni

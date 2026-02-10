import { useSelector } from "react-redux"
import type {AppState} from "@/store/store";
import type {Message} from "@/store/slices/messagesSlice";

const Messages = () => {
    const {
        successMessages,
        dangerMessages,
        infoMessages,
        warningMessages,
        messagesCount
    } = useSelector((state: AppState) => state.messages)

    return (
        <div className={"mt-0 pt-0"}>
            {successMessages?.length != 0 &&
                successMessages.map((s: Message, index: number) => (
                    <div
                        hidden={!s.text}
                        key={`${index}-${s.text}`}
                        className="alert alert-success d-flex pb-0"
                        role="alert"
                    >
                        <p className="alert-content">{s.text}</p>
                    </div>
                ))}
            {dangerMessages?.length != 0 &&
                dangerMessages.map((s: Message, index: number) => (
                    <div
                        key={`${index}-${s.text}`}
                        className="alert alert-danger d-flex pb-0"
                        role="alert"
                    >
                        <p className="alert-content">{s?.text || "Si è verificato un errore"}</p>
                    </div>
                ))}
            {infoMessages?.length != 0 &&
                infoMessages.map((s: Message, index: number) => (
                    <div
                        hidden={!s.text}
                        key={`${index}-${s.text}`}
                        className="alert alert-info d-flex pb-0"
                        role="alert"
                    >
                        <p className="alert-content">{s.text}</p>
                    </div>
                ))}
            {warningMessages?.length != 0 &&
                warningMessages.map((s: Message, index: number) => (
                    <div
                        hidden={!s.text}
                        key={`${index}-${s.text}`}
                        className="alert alert-warning d-flex pb-0"
                        role="alert"
                    >
                        <p className="alert-content">{s.text}</p>
                    </div>
                ))}
        </div>
    )
}
export default Messages

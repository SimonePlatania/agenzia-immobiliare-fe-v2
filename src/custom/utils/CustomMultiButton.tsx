
interface ButtonProps {
    type?: "button" | "submit" | "reset"
    className?: string
    descr?: string
    icon?: string
    id: string
    flexNextEnd?: boolean
    flexThisEnd?: boolean
    onClick?: any
    disabled?: boolean
    notRendered?: boolean
    style?: any
}

interface MultiButton {
    buttons: Array<ButtonProps>
    parentClasses?: string
}

const CustomMultiButton = ({ buttons, parentClasses }: MultiButton) => {
    return (
        <ul className={`action-bar ${parentClasses ?? ""}`}>
            {buttons?.map((button: ButtonProps, i: Number) => (
                <li
                    key={`${button.id}-${i}`}
                    hidden={button.notRendered ?? false}
                    className={`${button.flexNextEnd ? "me-md-auto" : ""} ${
                        button.flexThisEnd ? "ms-md-auto" : ""
                    }`}
                >
                    <button
                        type={button.type ?? "button"}
                        id={button.id}
                        onClick={button.onClick ?? undefined}
                        className={`${button.className} `}
                        disabled={button.disabled ?? false}
                        style={button.style ?? {}}
                    >
                        <i
                            hidden={!button.icon}
                            className={`${button.icon} me-2`}
                        />
                        {button.descr ?? ""}
                    </button>
                </li>
            ))}
        </ul>
    )
}
export default CustomMultiButton

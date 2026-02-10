import {useState} from "react";

const CustomTooltip = ({ text, children }: any) => {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && (
                <h6
                    style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "5px",
                        borderRadius: "5px",
                        position: "absolute",
                        zIndex: "999",
                        top: "90%",
                        left: "50%",
                        transform: "translate(-50%, 5px)",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        width: "22rem",
                        textAlign: "center"
                    }}
                >
                    {text}
                </h6>
            )}
        </div>
    )
}

export default CustomTooltip

import { useSelector } from "react-redux"
import MiniSpinner from "./MiniSpinner"
import type {AppState} from "../../store/store.ts";
import {useEffect, useState} from "react";

const Spinner = () => {
    const spinner = useSelector((state: AppState) => state.ui.spinner)
    const [visible, setVisible] = useState(spinner)

    useEffect(() => {
        if (spinner) {
            setVisible(spinner)
        } else {
            const timer = setTimeout(() => {
                setVisible(false)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [spinner])

    return (
        <>
            {visible &&
                <div className="spinner">
                    <MiniSpinner />
                </div>
            }
        </>
    )
}

export default Spinner

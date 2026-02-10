import clsx from "clsx"

const MiniSpinner = ({ classColor = "text-white", size = 50 }: any) => {
    return (
        <div className="spinner spinner text-center" role="status">
            <div className={clsx(classColor, "spinner-border")} style={{ height: size, width: size }}></div>
            <span className="visually-hidden">Caricamento in corso...</span>
        </div>
    )
}

export default MiniSpinner

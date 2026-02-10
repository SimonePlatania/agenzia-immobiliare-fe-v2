import { useDispatch } from "react-redux"
import type {UseFormReturn} from "react-hook-form";

interface CustomHourPickerProps {
    descr: string
    field: string
    form: UseFormReturn<any>
    onBlurEvent?: (e: React.FocusEvent<HTMLInputElement>) => void
    readOnly?: boolean
    disabled?: boolean
    hidden?: boolean
    placeholder?: string
    extraClass?: string
    isRequired?: boolean
    forceShowError?: boolean
}

const CustomHourPicker: React.FC<CustomHourPickerProps> = (props) => {
    const {
        descr,
        field,
        form,
        onBlurEvent,
        readOnly,
        disabled,
        hidden,
        placeholder,
        extraClass = ""
    } = props

    const errors = form.formState.errors as any
    const touched = form.formState.touchedFields as any
    const dispatch = useDispatch()
    const rawValue: string = form.watch(field) || "0:00"
    const [oraRaw, minutiRaw] = rawValue.split(":")
    const ora = oraRaw ?? "0"
    const minuti = minutiRaw ?? "00"

    const isInvalid = !!errors[field]
    // Extract potential per-part (hour/minute) error messages from RHF/Yup
    const fieldError: any = errors[field]
    const errorTypes: any = fieldError?.types || {}
    const hourMessage: string | undefined =
        errorTypes["ore-valide"] ||
        errorTypes.hour ||
        errorTypes.ore ||
        fieldError?.hour ||
        fieldError?.ore
    const minuteMessage: string | undefined =
        errorTypes["minuti-validi"] ||
        errorTypes.minute ||
        errorTypes.minuti ||
        errorTypes.min ||
        fieldError?.minute ||
        fieldError?.minuti
    const showHourError = !!hourMessage
    const showMinuteError = !!minuteMessage

    const classes =
        (isInvalid ? "form-group is-invalid " : "") +
        "inputFormCustom " +
        extraClass

    const updateValue = (newOra: string, newMinuti: string) => {
        const hh = newOra.padStart(1, "0")
        const mm = newMinuti.padStart(2, "0")
        form.setValue(field, `${hh}:${mm}`, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    return (
        <div className={classes} hidden={hidden}>
            <label className={`form-label ${isInvalid ? "is-invalid" : ""}`}>
                {descr}:
            </label>
            <div className="d-flex justify-content-start align-items-center">
                <span style={{ marginRight: "0.5rem" }}>HH:</span>
                <input
                    type="number"
                    min={0}
                    max={24}
                    className={`form-control ${
                        showHourError ||
                        (isInvalid && !showHourError && !showMinuteError)
                            ? "is-invalid"
                            : ""
                    }`}
                    style={{
                        maxWidth: "5.5rem",
                        height: "42px",
                        marginRight: "0.5rem"
                    }}
                    aria-label={"ore"}
                    placeholder={placeholder || "--"}
                    value={ora}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement
                        const val = parseInt(target.value || "0", 10)

                        // if (val < 0 || val > 24) {
                        //     dispatch(
                        //         setGrowl(
                        //             createErrorGrowl(
                        //                 "Le ore devono essere tra 0 e 24"
                        //             )
                        //         )
                        //     )
                        //     target.value = Math.min(
                        //         Math.max(val, 0),
                        //         24
                        //     ).toString()
                        // }

                        updateValue(target.value, minuti)
                    }}
                    readOnly={readOnly}
                    disabled={!!disabled}
                    onChange={(e) => updateValue(e.target.value, minuti)}
                    onBlur={onBlurEvent}
                />
                <span style={{ marginRight: "0.5rem" }}>MM:</span>
                <input
                    type="number"
                    min={0}
                    max={59}
                    className={`form-control ${
                        showMinuteError ||
                        (isInvalid && !showHourError && !showMinuteError)
                            ? "is-invalid"
                            : ""
                    }`}
                    style={{
                        maxWidth: "5.5rem",
                        height: "42px",
                        marginRight: "0.5rem"
                    }}
                    aria-label={"minuti"}
                    placeholder={placeholder || "--"}
                    value={minuti}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement
                        const val = parseInt(target.value || "0", 10)

                        // if (val < 0 || val > 59) {
                        //     dispatch(
                        //         setGrowl(
                        //             createErrorGrowl(
                        //                 "I minuti devono essere tra 0 e 59"
                        //             )
                        //         )
                        //     )
                        //     target.value = Math.min(
                        //         Math.max(val, 0),
                        //         59
                        //     ).toString()
                        // }

                        updateValue(ora, target.value)
                    }}
                    readOnly={readOnly}
                    disabled={!!disabled}
                    onChange={(e) => updateValue(ora, e.target.value)}
                    onBlur={onBlurEvent}
                />
            </div>
            {(showHourError || showMinuteError || isInvalid) && (
                <div>
                    {(showHourError ||
                        (isInvalid && !showMinuteError && !showHourError)) && (
                        <p className="text-start text-danger mb-0">
                            {showHourError
                                ? hourMessage
                                : errors[field]?.message}
                        </p>
                    )}
                    {showMinuteError && (
                        <p className="text-start text-danger mb-0">
                            {minuteMessage}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default CustomHourPicker

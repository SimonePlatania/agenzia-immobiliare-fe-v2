import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { get } from "lodash"
import { useDispatch } from "react-redux"
import type {CustomInputProps, OptionList, Tipologica} from "@/utils/types";
import {InputTypes, StatoSelectSearch} from "@/utils/constants/consts";
import {type ChangeEvent, useState} from "react";
import {handleFileSelect} from "@/utils/genericUtils";
import CustomSelectSearch from "@/custom/utils/CustomSelectSearch";

const CustomInput = ({
    field,
    type,
    descr,
    onChangeEvent,
    onClickEvent,
    onBlurEvent,
    onFocusEvent,
    form,
    classes,
    disabled,
    fileTypes,
    disabledCondition,
    readOnly,
    isRequired,
    options,
    noOptionMessage,
    placeholder,
    checked,
    submitButton,
    invalidCondition,
    statoSelect,
    changeActions,
    optionLabel,
    optionValue,
    filterOptions,
    rows,
    maxLength,
    maxDate,
    minDate,
    isSearch,
    callback,
    style,
    value,
    noLabel,
    ariaLabel,
    autocompleteList,
    isLoading,
    noEmptyOption,
    minOrario,
    maxOrario,
    stepOrario = "900",
    isDifferentPlaceholder,
    upField,
    isDecimalNumber,
    minHour,
    maxHour,
    submitValidation
}: CustomInputProps): React.JSX.Element => {
    const dispatch = useDispatch()

    const formField = upField ? `${upField}.${field}` : field

    let formValue = upField
        ? form.watch(`${upField}.${field}`)?.toString()
        : form.watch(field)?.toString()

    const fieldToDesc = (field: string): string => {
        if (field?.includes(".")) {
            field = field?.split(".")?.pop() ?? ""
        }
        let formattedStr = field?.replace(/([A-Z])/g, " $1")
        formattedStr = formattedStr?.trim()

        return formattedStr?.charAt(0)?.toUpperCase() + formattedStr?.slice(1)
    }

    const isInvalid = (): boolean => {
        const isError = (!!get(form.formState.errors, formField) || false)
        // const isTouched = get(form.formState.touchedFields, formField, false)
        return submitValidation ? isError &&  form.formState.isSubmitted : isError
    }

    const renderInput = (): React.JSX.Element => {
        switch (type) {
            case InputTypes.TEXT:
                return renderInputText()
            case InputTypes.PASSWORD:
                return renderInputPassword()
            case InputTypes.NUMBER:
                return renderInputNumber()
            case InputTypes.SELECT:
                return renderSelect()
            case InputTypes.DATE:
                return renderInputDate()
            case InputTypes.DATE_TIME:
                return renderInputDate()
            case InputTypes.ORARIO:
                return renderInputOrario()
            case InputTypes.TEXT_BUTTON:
                return renderInputButton()
            case InputTypes.CHECKBOX:
                return renderCheckBox()
            case InputTypes.FILE:
                return renderFileInput()
            case InputTypes.SELECT_SEARCH:
                return renderSelectSearch()
            case InputTypes.TEXTAREA:
                return renderTextarea()
            case InputTypes.COD_DITTA_SELECT:
                return renderCodDittaSelect()
            case InputTypes.RADIO:
                return renderRadio()
            case InputTypes.HOUR_PICKER:
                return renderHourPicker()

            default:
                return <></>
        }
    }

    const genericChange = (e: ChangeEvent<any>) => {
        form.setValue(formField, e.target.value)
    }

    const renderInputText = (): React.JSX.Element => {
        return (
            <>
                <input
                    type={type}
                    id={field}
                    name={field}
                    value={(value ? value : formValue) || ""}
                    aria-label={ariaLabel ?? field}
                    onChange={async (e: ChangeEvent<any>) => {
                        onChangeEvent ? onChangeEvent(e) : genericChange(e)
                        await form.trigger(formField)
                    }}
                    onBlur={async (e: any) => {
                        onBlurEvent ? onBlurEvent(e) : ""
                        await form.trigger(formField)
                    }}
                    className={`form-control ${
                        isInvalid() ? "is-invalid" : ""
                    }`}
                    disabled={disabled ?? false}
                    readOnly={readOnly ?? false}
                    placeholder={placeholder ?? ""}
                    style={style}
                />
            </>
        )
    }

    const blurDecimalNumber = () => {
        if (!formValue) {
            form.setValue(formField, "")
            return
        }

        let value = formValue?.trim() ?? ""
        let finalValue = value

        if (!value) {
            finalValue = ""
        } else {
            value = value?.replace(/,/g, ".")

            const firstDot = value?.indexOf(".")
            if (firstDot !== -1) {
                value =
                    value?.slice(0, firstDot + 1) +
                    value?.slice(firstDot + 1)?.replace(/\./g, "")
            }

            const num = Number(value)

            if (!isNaN(num)) {
                finalValue = num?.toFixed(3)
            } else if (value?.trim() === ".") {
                finalValue = "0.000"
            } else if (value?.includes(".")) {
                const [intPart, decPart = ""] = value?.split(".") ?? []
                const paddedDec = decPart?.padEnd(3, "0")?.slice(0, 3)
                finalValue = `${intPart}.${paddedDec}`
            }
        }

        form.setValue(formField, finalValue)
    }

    const getViewDecimalNumber = () => {
        if ((disabled || readOnly) && formValue && isDecimalNumber) {
            formValue = Number(formValue)?.toFixed(3).toString()
        }
        return formValue
            ? isDecimalNumber && formValue?.includes(".")
                ? formValue?.replace(".", ",")
                : formValue
            : ""
    }

    const renderInputNumber = (): React.JSX.Element => {
        return (
            <>
                <input
                    type={"text"}
                    id={field}
                    title={"Inserire valori numerici"}
                    aria-label={ariaLabel ?? field}
                    value={
                        value
                            ? value
                            : getViewDecimalNumber() ??
                              (readOnly
                                  ? // "Non presente"
                                    ""
                                  : "")
                    }
                    name={field}
                    onChange={async (e: ChangeEvent<any>) => {
                        onChangeEvent ? onChangeEvent(e) : genericChange(e)
                        await form.trigger(formField)
                    }}
                    onBlur={async (e: any) => {
                        onBlurEvent ? onBlurEvent(e) : ""
                        if (isDecimalNumber) {
                            blurDecimalNumber()
                        }
                        await form.trigger(formField)
                    }}
                    onFocus={async (e: any) => {
                        onFocusEvent ? onFocusEvent(e) : ""
                    }}
                    onKeyDown={(e) => {
                        if (
                            !/[0-9.,]/?.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight" &&
                            e.key !== "Tab"
                        ) {
                            // dispatch(
                            //     setGrowl(
                            //         createWarningGrowl(
                            //             `Sono consentiti solo valori numerici nel campo "${
                            //                 descr ?? fieldToDesc(field)
                            //             }"`
                            //         )
                            //     )
                            // )
                            e.preventDefault()
                        }
                    }}
                    className={`form-control ${
                        isInvalid() ? "is-invalid" : ""
                    }`}
                    disabled={disabled ? disabled : false}
                    readOnly={readOnly ? readOnly : false}
                    placeholder={
                        placeholder ? placeholder : ""
                        // : "Inserire un valore numerico"
                    }
                    style={style}
                />
            </>
        )
    }

    const [showPassword, setShowPassword] = useState(false)
    const renderInputPassword = (): React.JSX.Element => {
        return (
            <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    id={field}
                    value={
                        value
                            ? value
                            : formValue ??
                              (readOnly
                                  ? // "Non presente"
                                    ""
                                  : "")
                    }
                    name={field}
                    aria-label={ariaLabel ?? field}
                    onChange={async (e: ChangeEvent<any>) => {
                        onChangeEvent ? onChangeEvent(e) : genericChange(e)
                        await form.trigger(formField)
                    }}
                    onBlur={async (e: any) => {
                        onBlurEvent ? onBlurEvent(e) : ""
                        await form.trigger(formField)
                    }}
                    onFocus={async (e: any) => {
                        onFocusEvent ? onFocusEvent(e) : ""
                        // await form.trigger(formField)
                    }}
                    className={`form-control ${
                        isInvalid() ? "is-invalid" : ""
                    }`}
                    disabled={disabled ? disabled : false}
                    readOnly={readOnly ? readOnly : false}
                    placeholder={placeholder ? placeholder : ""}
                    style={style}
                />
                <button
                    className={`btn btn-outline-primary  ${
                        isInvalid()
                            ? "is-invalid passwordClassError"
                            : "text-secondary passwordClass"
                    }`}
                    style={{ borderColor: "#ced4da" }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <i
                        className={`bi ${
                            showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                    ></i>
                </button>
            </div>
        )
    }

    const getSelectPlaceholder = (): string => {
        switch (true) {
            case isDifferentPlaceholder:
                return fieldToDesc(field)?.toLowerCase() ?? "elemento"
            default:
                return descr?.toLowerCase() ?? fieldToDesc(field)?.toLowerCase()
        }
    }

    const renderSelect = (): React.JSX.Element => {
        const selectWidth = (
            document.querySelector(`#${field}`) as HTMLSelectElement
        )?.clientWidth

        const truncateText = (text: string): string => {
            if (!text || !selectWidth) return text

            const avgCharWidth = 8
            const maxChars = Math.floor(selectWidth / avgCharWidth) - 3

            if (text.length <= maxChars) return text
            return text.substring(0, maxChars) + "..."
        }

        return (
            <>
                <select
                    id={field}
                    value={(value ? value : formValue) || ""}
                    name={field}
                    aria-label={ariaLabel ?? field}
                    onChange={async (e: ChangeEvent<any>) => {
                        onChangeEvent ? onChangeEvent(e) : genericChange(e)
                        await form.trigger(formField)
                    }}
                    onBlur={async (e: any) => {
                        onBlurEvent ? onBlurEvent(e) : ""
                        await form.trigger(formField)
                    }}
                    className={`form-select ${
                        isInvalid() ? "is-invalid" : ""
                    } ${readOnly ? "readonly-select" : ""}`}
                    disabled={isLoading || (readOnly ?? disabled ?? false)}
                    style={style}
                >
                    {!disabled && isLoading ? (
                        <option value="">{`Caricamento...`}</option>
                    ) : (
                        <option value="" hidden={noEmptyOption}>
                            {placeholder
                                ? placeholder
                                : disabled
                                ? ""
                                : `- Seleziona ${getSelectPlaceholder()} -`}
                        </option>
                    )}
                    {(options ?? []).map(
                        (option: OptionList, index: number) => {
                            const optionValue =
                                (option as Tipologica<any>)?.value ??
                                (option as string)
                            return (
                                <option
                                    key={`${field}-${index}-${
                                        (option as Tipologica<any>)?.key ??
                                        (option as string)
                                    }`}
                                    value={
                                        (option as Tipologica<any>)?.key ??
                                        (option as string)
                                    }
                                    title={optionValue}
                                >
                                    {truncateText(optionValue)}
                                </option>
                            )
                        }
                    )}
                </select>
            </>
        )
    }
    const renderSelectSearch = (): React.JSX.Element => {
        return (
            <div title={"Ricerca elemento"}>
                <CustomSelectSearch
                    form={form}
                    field={field}
                    disabled={disabled}
                    options={options ?? []}
                    noOptionMessage={
                        noOptionMessage || "Nessun elemento trovato"
                    }
                    placeholder={placeholder}
                    isInvalid={isInvalid}
                    invalidCondition={invalidCondition}
                    stato={statoSelect ?? StatoSelectSearch.COMPLETATO}
                    isLoading={isLoading}
                    changeActions={changeActions}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    fieldToDesc={fieldToDesc}
                    isRequired={isRequired}
                    filterOptions={filterOptions}
                    descr={descr ?? fieldToDesc(field)}
                    noEmptyOption={noEmptyOption}
                />
            </div>
        )
    }

    const renderInputDate = (): React.JSX.Element => {
        return (
            <>
                <>
                    <Form.Control
                        type={type}
                        id={field}
                        name={field}
                        value={value ?? form.watch(formField)}
                        onChange={async (e: ChangeEvent<any>) => {
                            onChangeEvent ? onChangeEvent(e) : genericChange(e)
                            await form.trigger(formField)
                        }}
                        aria-label={ariaLabel ?? field}
                        onBlur={async (e: any) => {
                            onBlurEvent ? onBlurEvent(e) : ""
                            await form.trigger(formField)
                        }}
                        className={`${classes} ${
                            isInvalid() ? "is-invalid" : ""
                        }`}
                        // style={{ borderColor: isInvalid() ? "#dc3545" : "" }}
                        min={minDate}
                        max={maxDate}
                        disabled={disabled ?? false}
                        readOnly={readOnly ?? false}
                    />
                </>
            </>
        )
    }

    const renderInputOrario = (): React.JSX.Element => {
        return (
            <>
                <div>
                    <input
                        type="time"
                        id={field}
                        name={field}
                        value={value ? value : formValue ?? ""}
                        min={minOrario}
                        max={maxOrario}
                        step={stepOrario}
                        onChange={async (e: ChangeEvent<any>) => {
                            onChangeEvent ? onChangeEvent(e) : genericChange(e)
                            await form.trigger(formField)
                        }}
                        aria-label={ariaLabel ?? field}
                        onBlur={async (e: any) => {
                            onBlurEvent ? onBlurEvent(e) : ""
                            await form.trigger(formField)
                        }}
                        onFocus={async (e: any) => {
                            onFocusEvent ? onFocusEvent(e) : ""
                            // await form.trigger(formField)
                        }}
                        // style={{ borderColor: isInvalid() ? "#dc3545" : "" }}
                        className={`form-control ${classes} ${
                            isInvalid() ? "is-invalid" : ""
                        }`}
                        disabled={disabled ? disabled : false}
                        readOnly={readOnly ? readOnly : false}
                    />
                </div>
            </>
        )
    }

    const renderInputButton = (): React.JSX.Element => {
        return (
            <>
                <InputGroup className="mb-3">
                    <Form.Control
                        id={field}
                        name={field}
                        value={value ? value : formValue ?? ""}
                        onChange={async (e: ChangeEvent<any>) => {
                            onChangeEvent ? onChangeEvent(e) : genericChange(e)
                            await form.trigger(formField)
                        }}
                        placeholder={placeholder ? placeholder : ""}
                        aria-label={ariaLabel ?? field}
                        aria-describedby="basic-addon2"
                        // style={{ borderColor: isInvalid() ? "#dc3545" : "" }}
                        className={`${classes} ${
                            isInvalid() ? "is-invalid" : ""
                        }`}
                        onBlur={async (e: any) => {
                            onBlurEvent ? onBlurEvent(e) : ""
                            await form.trigger(formField)
                        }}
                        disabled={disabled ? disabled : false}
                        readOnly={readOnly ? readOnly : false}
                    />
                    <Button
                        type={submitButton ? "submit" : "button"}
                        onClick={(e: React.MouseEvent<HTMLElement>) =>
                            onClickEvent ? onClickEvent(e) : () => {}
                        }
                        variant={`outline-${
                            isInvalid() ? "danger" : "primary"
                        }`}
                        id={`${field}-button`}
                    >
                        Button
                    </Button>
                </InputGroup>
            </>
        )
    }

    const renderCheckBox = (): React.JSX.Element => {
        return (
            <Row>
                <Col md={12} xs={12}>
                    <input
                        type={type}
                        id={field}
                        name={field}
                        disabled={disabled ? disabled : false}
                        checked={checked ? checked : form.watch(field)}
                        aria-labelledby={`${field}-label`}
                        className="form-check-input"
                        onChange={(e: ChangeEvent<any>) =>
                            onChangeEvent
                                ? onChangeEvent(e)
                                : form.setValue(field, e.target.checked, {
                                    shouldValidate: true
                                })
                        }
                        onBlur={async (e: any) => {
                            onBlurEvent ? onBlurEvent(e) : ""
                            await form.trigger(field)
                        }}
                        onFocus={async (e: any) => {
                            onFocusEvent ? onFocusEvent(e) : ""
                            await form.trigger(field)
                        }}
                    />
                    <span className={"ms-2"} id={`${field}-label`}>{descr}</span>
                </Col>
            </Row>
        )
    }

    const renderRadio = (): React.JSX.Element => {
        return (
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={field}
                    value={value ? value : formValue ?? ""}
                    id={field}
                    aria-label={ariaLabel ?? field}
                    checked={checked}
                />
                <label className="form-check-label" htmlFor={field}>
                    {descr}
                </label>
            </div>
        )
    }

    const renderHourPicker = (): React.JSX.Element => {
        return (
            <input
                type="time"
                id={field}
                name={field}
                value={value ?? formValue}
                onChange={async (e: ChangeEvent<any>) => {
                    onChangeEvent ? onChangeEvent(e) : genericChange(e)
                    await form.trigger(formField)
                }}
                aria-label={ariaLabel ?? field}
                className={`form-control ${isInvalid() ? "is-invalid" : ""}`}
                style={{
                    ...(style ?? {}),
                    color: "black!important"
                    //width: "50%"
                }}
                readOnly={readOnly ? readOnly : false}
                disabled={disabled ? disabled : false}
                min={minHour}
                max={maxHour}
            />
        )
    }

    const renderFileInput = (): React.JSX.Element => {
        return (
            <div>
                <Form.Group className="mb-3" style={style ?? {}}>
                    <Form.Control
                        type="file"
                        id={field}
                        onBlur={async (e: any) => {
                            onBlurEvent ? onBlurEvent(e) : ""
                            await form.trigger(formField)
                        }}
                        onChange={async (e: ChangeEvent<any>) => {
                            if (callback) {
                                callback()
                            }
                            handleFileSelect(e, dispatch, form)
                            await form.trigger(formField)
                        }}
                        aria-label={ariaLabel ?? field}
                        title={
                            form.watch("nomeFile") || "Nessun file selezionato"
                        }
                        disabled={disabled ? disabled : false}
                        accept={fileTypes ? fileTypes.join(", ") : "*/*"}
                        // style={{ borderColor: isInvalid() ? "#dc3545" : "" }}
                        className={`${classes} ${
                            isInvalid() ? "is-invalid" : ""
                        }`}
                    ></Form.Control>
                </Form.Group>
            </div>
        )
    }

    const renderTextarea = (): React.JSX.Element => {
        return (
            <textarea
                className={`form-control ${classes} ${
                    isInvalid() ? "is-invalid" : ""
                }`}
                id={field}
                name={field}
                value={value ? value : formValue ?? ""}
                placeholder={placeholder ? placeholder : ""}
                onBlur={async (e: any) => {
                    onBlurEvent ? onBlurEvent(e) : ""
                    await form.trigger(formField)
                }}
                aria-label={ariaLabel ?? field}
                onChange={async (e: ChangeEvent<any>) => {
                    onChangeEvent ? onChangeEvent(e) : genericChange(e)
                    await form.trigger(formField)
                }}
                disabled={disabled ? disabled : false}
                readOnly={readOnly ? readOnly : false}
                // style={{ borderColor: isInvalid() ? "#dc3545" : "" }}
                rows={rows}
                maxLength={maxLength}
            />
        )
    }

    const renderCodDittaSelect = () => {
        return (
            <div>
                <div className="input-group">
                    <span
                        className={`input-group-text ${
                            isInvalid() ? "border-danger" : ""
                        }`}
                    >
                        IT00
                    </span>
                    <select
                        className={`${
                            disabled || readOnly
                                ? "form-control"
                                : "form-select"
                        } ${isInvalid() ? "is-invalid" : ""}`}
                        style={
                            isSearch
                                ? {}
                                : readOnly
                                ? { backgroundColor: "#f8f9fa" }
                                : {
                                      borderTopRightRadius: "0.375rem",
                                      borderBottomRightRadius: "0.375rem"
                                  }
                        }
                        aria-label={ariaLabel ?? field}
                        disabled={(disabled || readOnly) ?? false}
                        name={field}
                        value={(value ? value : formValue) || ""}
                        id={field}
                        onChange={async (e: ChangeEvent<any>) => {
                            onChangeEvent ? onChangeEvent(e) : genericChange(e)
                            await form.trigger(formField)
                        }}
                        onBlur={async (e: any) => {
                            onBlurEvent ? onBlurEvent(e) : ""
                            await form.trigger(formField)
                        }}
                    >
                        {!disabled && isLoading ? (
                            <option value="">{`Caricamento...`}</option>
                        ) : (
                            <option value="" hidden={noEmptyOption}>
                                {placeholder
                                    ? placeholder
                                    : disabled
                                    ? ""
                                    : `- Seleziona ${getSelectPlaceholder()} -`}
                            </option>
                        )}
                        {(options ?? []).map(
                            (option: OptionList, index: number) => (
                                <option
                                    key={`${field}-${index}-${
                                        (option as Tipologica<any>)?.key ??
                                        (option as string)
                                    }`}
                                    value={
                                        (option as Tipologica<any>)?.key ??
                                        (option as string)
                                    }
                                >
                                    {(option as Tipologica<any>)?.value ??
                                        (option as string)}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
        )
    }

    const selectLoading = () => {
        switch (true) {
            case type == InputTypes.SELECT && !disabled && isLoading:
            case (type == InputTypes.SELECT_SEARCH &&
                !disabled &&
                (statoSelect ?? StatoSelectSearch.COMPLETATO) ==
                    StatoSelectSearch.CARICAMENTO) ||
                isLoading:
                return true
            default:
                return false
        }
    }

    const withoutLabel = (): boolean => {
        return [InputTypes.CHECKBOX, InputTypes.RADIO].includes(
            type as InputTypes
        )
    }

    const renderLabel = (): React.JSX.Element => {
        return (
            <>
                <label
                    style={
                        withoutLabel() || noLabel
                            ? { display: "none", visibility: "hidden" }
                            : {}
                    }
                    className={`text-start col-12 px-2 testo form-label mb-0 `}
                    htmlFor={field}
                    title={`${descr ?? fieldToDesc(field)}: ${
                        isRequired ? "*" : ""
                    }`}
                >
                    <div>
                        {selectLoading() && (
                            <div
                                className={"text-primary spinner-border me-2"}
                                style={{
                                    position: "initial",
                                    height: "15px",
                                    width: "15px"
                                }}
                            />
                        )}
                        {`${descr ?? fieldToDesc(field)}: ${
                            isRequired ? "*" : ""
                        }`}
                    </div>
                </label>
            </>
        )
    }

    const findError = (): React.JSX.Element => {
        return (
            <div
                className={`text-danger mb-2 `}
                role={"alert"}
                style={{
                    visibility: isInvalid() ? "visible" : "hidden"
                }}
            >
                {`${
                    isInvalid()
                        ? get(form.formState.errors, formField)?.message
                        : "Errore"
                }`}
            </div>
        )
    }

    const renderError = (): React.JSX.Element => {
        const charsLeft: number = (maxLength ?? 0) - (formValue?.length || 0)
        switch (type) {
            case InputTypes.TEXTAREA:
                return (
                    <div
                        className={`d-flex ${
                            isInvalid()
                                ? "justify-content-between"
                                : "justify-content-end"
                        }`}
                    >
                        {findError()}
                        {maxLength && (
                            <p
                                className={`d-flex mt-3 fs-6  ${
                                    charsLeft < 5
                                        ? "text-danger"
                                        : charsLeft < 10
                                        ? "text-warning"
                                        : ""
                                }`}
                            >
                                {" "}
                                <span
                                    className={
                                        "small d-flex justify-content-end"
                                    }
                                    style={{ width: "100%" }}
                                >{`${charsLeft} caratteri rimanenti`}</span>
                            </p>
                        )}
                    </div>
                )
            case InputTypes.CHECKBOX:
            case InputTypes.RADIO:
                return <></>
            default:
                return findError()
        }
    }

    return (
        <div className={`${classes ? classes : ""}`}>
            <div className={`form-group`}>
                {renderLabel()}
                {renderInput()}
            </div>
            {renderError()}
        </div>
    )
}
export default CustomInput

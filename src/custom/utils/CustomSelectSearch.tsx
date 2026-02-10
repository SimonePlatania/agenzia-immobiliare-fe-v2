import type {Option, SelectSearchProps} from "@/utils/types";
import Select from "react-select/base";
import type {InputActionMeta, SingleValue} from "react-select";
import {StatoSelectSearch} from "@/utils/constants/consts";

const CustomSelectSearch = ({
                                form,
                                field,
                                disabled,
                                options,
                                noOptionMessage = "Nessuna opzione",
                                isInvalid,
                                isLoading,
                                invalidCondition,
                                stato,
                                changeActions,
                                optionLabel,
                                optionValue,
                                descr,
                                placeholder = `- Seleziona ${descr ?? "un elemento"} -`,
                                filterOptions,
                                noEmptyOption
                            }: SelectSearchProps) => {
    const filteredOptions = filterOptions
        ? options.filter(filterOptions)
        : options

    const mappedOptions: Option[] = filteredOptions.map((opt: any) => ({
        value: optionValue ? optionValue(opt) : opt,
        label: optionLabel ? optionLabel(opt) : opt
    }))

    const placeholderOption: Option = {value: "", label: placeholder}

    const menuOptions = noEmptyOption
        ? mappedOptions
        : [placeholderOption, ...mappedOptions]

    const currentValue =
        menuOptions.find((o) => o.value === form.getValues()[field]) ||
        placeholderOption

    const changeValue = (value: string) => {
        form.setValue(field, value, {shouldValidate: true})
        if (changeActions) changeActions(value)
    }

    const bootstrapStyles = {
        control: (base: any, state: any) => ({
            ...base,
            border:
                isInvalid() || invalidCondition
                    ? "1px solid #d9364f"
                    : state.isFocused
                        ? "1px solid #86b7fe"
                        : "1px solid #ced4da",
            borderRadius: "0.375rem",
            minHeight: "38px",
            boxShadow: state.isFocused
                ? "0 0 0 0.25rem rgba(13,110,253,.25)"
                : "none",
            "&:hover": {
                borderColor: state.isFocused ? "#86b7fe" : "#ced4da"
            }
        }),
        placeholder: (base: any) => ({...base, color: "#6c757d"}),
        singleValue: (base: any) => ({...base, color: "#212529"}),
        input: (base: any) => ({...base, color: "#212529"}),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: "#6c757d",
            "&:hover": {color: "#212529"}
        }),
        // indicatorSeparator: () => ({ display: "none" }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "#0b5ed7"
                : state.isFocused
                    ? "#e9ecef"
                    : "white",
            color: state.isSelected ? "white" : "#212529",
            cursor: "pointer"
        })
    }

    return (
        <div className="mb-3">
            <Select
                id={field}
                styles={bootstrapStyles}
                options={menuOptions}
                value={currentValue}
                onChange={(selected: SingleValue<Option>) => changeValue(selected?.value || "")}
                isSearchable
                noOptionsMessage={() => noOptionMessage}
                isDisabled={disabled}
                placeholder={<div
                    style={{
                        color: stato == StatoSelectSearch.CARICAMENTO ||
                        form.getValues()[field] == ""
                            ? "grey"
                            : "black",
                        marginLeft: "0.5%"
                    }}
                >
                    {" "}
                    {stato == StatoSelectSearch.CARICAMENTO || isLoading
                        ? StatoSelectSearch.MESSAGE_CARICAMENTO
                        : disabled
                            ? StatoSelectSearch.MESSAGE_DISABLED
                            : placeholderOption.label}
                </div>} inputValue={""} onInputChange={function (newValue: string, actionMeta: InputActionMeta): void {
                throw new Error("Function not implemented.");
            }} onMenuOpen={function (): void {
                throw new Error("Function not implemented.");
            }} onMenuClose={function (): void {
                throw new Error("Function not implemented.");
            }}            />
        </div>
    )
}

export default CustomSelectSearch

import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface Message {
    text: string
}

export interface MessageState {
    successMessages: Array<Message>
    infoMessages: Array<Message>
    warningMessages: Array<Message>
    dangerMessages: Array<Message>
    messagesCount: number
}

const initialState: MessageState = {
    successMessages: [],
    infoMessages: [],
    warningMessages: [],
    dangerMessages: [],
    messagesCount: 0
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addSuccessMessage(state: MessageState, action: PayloadAction<Message>) {
            state.dangerMessages = []
            state.successMessages = [
                ...state.successMessages
                    .filter((m: Message) => m.text != action.payload.text)
                    .filter((m: Message) => m.text != ""),
                action.payload
            ]
            state.messagesCount += 1
        },
        addInfoMessage(state: MessageState, action: PayloadAction<Message>) {
            state.dangerMessages = []
            state.successMessages = []
            state.infoMessages = [...state.infoMessages, action.payload]
            state.messagesCount += 1
        },
        addWarningMessage(state: MessageState, action: PayloadAction<Message>) {
            state.dangerMessages = []
            state.warningMessages = [
                ...state.warningMessages
                    .filter((m: Message) => m.text != action.payload.text)
                    .filter((m: Message) => m.text != ""),
                action.payload
            ]
            state.messagesCount += 1
        },
        addDangerMessage(state: MessageState, action: PayloadAction<Message>) {
            state.successMessages = []
            state.warningMessages = []
            state.dangerMessages = [
                ...state.dangerMessages
                    .filter((m: Message) => m.text != action.payload.text)
                    .filter((m: Message) => m.text != ""),
                action.payload
            ]
            state.messagesCount += 1
        },
        resetDangerMessage(state: MessageState) {
            state.dangerMessages = []
        },
        resetSuccessMessage(state: MessageState) {
            state.successMessages = []
        },
        clearMessages(state: MessageState) {
            state.successMessages = []
            state.infoMessages = []
            state.warningMessages = []
            state.dangerMessages = []
            state.messagesCount = 0
        }
    }
})

export const {
    addSuccessMessage,
    addInfoMessage,
    addWarningMessage,
    addDangerMessage,
    clearMessages,
    resetDangerMessage,
    resetSuccessMessage
} = messagesSlice.actions
export default messagesSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'
import SearchResponse from '@/types/SearchResponse'

interface ChatState {
    prompt: string
    messages: ChatMessage[]
    conversations: ChatConversation[]
    search: SearchResponse
}

const initialState: ChatState = {
    messages: [],
    conversations: [],
    prompt: "",
    search: {}
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setPrompt: (state, action: PayloadAction<string>) => {
            state.prompt = action.payload;
        },
        setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages = [
                ...state.messages,
                action.payload,
            ]
        },
        setConversations: (state, action: PayloadAction<ChatConversation[]>) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action: PayloadAction<ChatConversation>) => {
            state.conversations = [
                ...state.conversations,
                action.payload,
            ]
        },
        setSearch: (state, action: PayloadAction<SearchResponse>) => {
            state.search = action.payload;
        },
    },
})

export const {
    setPrompt,
    setMessages,
    addMessage,
    setConversations,
    addConversation,
    setSearch,
} = chatSlice.actions;

export const selectPrompt = (state: RootState) => state.chat.prompt;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectConversations = (state: RootState) => state.chat.conversations;
export const selectSearch = (state: RootState) => state.chat.search;

export default chatSlice.reducer;

import React, { useEffect, useRef, useState } from 'react';
import Textarea from "react-textarea-autosize";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, selectMessages, selectPrompt, setPrompt, addConversation, selectConversations, setSearch, selectSearch } from "@/redux/reducers/chatSlice";
import Link from 'next/link';

const ChatTextarea = () => {
    const dispatch = useDispatch();
    const prompt = useSelector(selectPrompt);
    const messages = useSelector(selectMessages);
    const search = useSelector(selectSearch);
    // const conversations = useSelector(selectConversations);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (textAreaRef.current === null) return;
        textAreaRef.current.focus();
    }, []);

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    const sendMessage = () => {
        if (isLoading) return;
        if (prompt.trim() === '') return;

        setIsLoading(true);
        dispatch(addMessage({
            role: 'user',
            content: prompt
        }));

        axios.post('/api/chat', {
            prompt,
            messages
        })
            .then(response => response.data)
            .then((res) => {
                setIsLoading(false);
                res.data.map((message: any) => dispatch(addMessage(message)));

                // if (messages.length <= 0) {
                //     axios.post(`http://localhost:5000/api/conversations`,
                //         {
                //             title: prompt,
                //             initialMessage: prompt,
                //             userId: "12345"
                //         }
                //     )
                //         .then(response => response.data)
                //         .then(res => {
                //             console.log(`/conversations: `, res);
                //             dispatch(addConversation({
                //                 title: res.title,
                //                 userId: res.title,
                //                 createdAt: new Date()
                //             }));
                //             console.log(`conversations: `, conversations);
                //         })
                //         .catch(error => {
                //             console.log(`Error! /conversations: `, error)
                //         });
                // }

                // if (!(!!messages && messages.length > 0)) {
                //     handleSearch(prompt);
                // }
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });

        handleSearch(prompt);

        dispatch(setPrompt(''));
    }

    const handleSearch = async (prompt: string) => {
        // const apiKey = process.env.OPENAI_API_KEY;
        // const contextKey = process.env.GOOGLE_SEARCH_CONTEXT_KEY;

        const apiKey = 'AIzaSyCowoCFfofBowDAIZQiz8hpeKqKn9NjQII';
        const contextKey = 'c61bc1d50378f4a62';

        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${contextKey}&q=${encodeURIComponent(prompt)}`;
        try {
            const result = await axios.get(url);
            // console.log(`search: `, result);
            dispatch(setSearch(result?.data ?? []));
        } catch (error) {
            console.error('Error communicating with Google search API:', error);
        }
    };

    return (
        <div className="mt-1 relative rounded-md shadow-sm flex">
            <div className='block w-full relative'>
                <Textarea
                    ref={textAreaRef}
                    rows={1}
                    name="comment"
                    id="comment"
                    className="px-4 py-3 bg-accents-1 focus:outline-none block w-full text-white rounded-md resize-none"
                    placeholder="Type your message here..."
                    value={prompt}
                    onKeyDown={handleKeyDown}
                    onInput={(e) => dispatch(setPrompt(e.currentTarget.value))}
                />
                {isLoading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>

            {isLoading ?
                (<button type="button" className="text-white/90 bg-blue-700/90 hover:bg-blue-800/90 focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 ml-1 me-2 !outline-none cursor-not-allowed w-[72px] !h-[48px]" disabled onClick={sendMessage}>Send</button>) :
                (<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 ml-1 me-2 !outline-none !h-[48px]" onClick={sendMessage}>Send</button>)
            }

            {messages.length > 0 && (
                <>
                    <div className="w-[3px] bg-white/80 rounded-md me-2 !h-[48px]"></div>
                    {isLoading ?
                        (<button type='button' className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 !outline-none cursor-not-allowed !h-[48px]">Exercise</button>) :
                        (<Link href={'/quiz'} className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 !outline-none !h-[48px]">Exercise</Link>)
                    }
                </>
            )}

        </div>
    );
};

export default ChatTextarea;

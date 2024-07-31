import React from 'react';
import UserMessage from "@/components/chat/UserMessage";
import SystemMessage from "@/components/chat/SystemMessage";
import NoSSR from "@/components/NoSSR";
import { useSelector } from "react-redux";
import { selectSearch } from "@/redux/reducers/chatSlice";
import SearchResponse from '@/types/SearchResponse';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SearchContent = () => {
    const router = useRouter();
    const search = useSelector(selectSearch);

    return (
        router.asPath.includes('/chat') ?
            (<>
                <hr className='my-2 border-gray-700' />
                <span className="font-medium text-gray-400 text-sm px-2 pt-3 mb-1">Search(es)</span>
                <div className="relative h-full">
                    <NoSSR>
                        {search.items && search.items.slice(0, 5).map((item, index) => (
                            <div key={index} className='border-b border-gray-800 flex flex-col gap-2 px-1.5 py-2 mx-0.5 my-1 hover:bg-[#16181c] rounded-sm'>
                                <a href={item.link} className='text-foreground' target="_blank" rel="noopener noreferrer">
                                    <h3 className='text-sm font-semibold'>{item.title}</h3>
                                </a>
                                <div className='flex flex-col gap-2'>
                                    {item.pagemap && item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail.length > 0 && (
                                        <img src={item.pagemap.cse_thumbnail[0].src} alt={item.title} className='w-full max-h-[60px] object-cover rounded-md shadow-md' />
                                    )}
                                    <div style={{ lineHeight: '10px' }}>
                                        <p className='text-xs text-muted-foreground text-gray-300'>{item.snippet}</p>
                                        <a href={item.link} className='text-xs text-foreground font-medium'>{item.displayLink}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </NoSSR>
                </div>
            </>) :
            (null)
    );
};

export default SearchContent;

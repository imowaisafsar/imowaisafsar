import React, { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectMessages, selectSearch } from '@/redux/reducers/chatSlice';

const TemplateCard = ({ href, title, description, width }: TemplateCard) => {

    const router = useRouter();
    const messages = useSelector(selectMessages);
    const search = useSelector(selectSearch);

    const handleNavigate = (href: string) => {
        let toHref = href;

        if (href == '/quiz' && (!messages || messages.length === 0)) {
            toHref = '/chat';
        }
        else if (href == '/search' && (!search || !search.items || search.items?.length === 0)) {
            toHref = '/chat';
        }

        router.push(toHref);
    }

    return (
        <div className={`mx-2 my-3 ${width == 'full' ? 'col-span-2' : ''}`}>
            <button type='button' onClick={() => handleNavigate(href)} className={`flex flex-col w-full px-8 py-5 transition border border-transparent border-accents-3 bg-[#16181c] rounded-lg hover:border-gray-500`}>
                <h3 className="font-medium text-center w-full">{title}</h3>
                <p className="text-gray-400 text-center w-full">{description}</p>
            </button>
        </div>
    );
};

export default TemplateCard;

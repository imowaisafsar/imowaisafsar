import React from 'react';
import Link from "next/link";

const TemplateCard = ({ href, title, description, width }: TemplateCard) => {
    return (
        <div className={`mx-2 my-3 ${width == 'full' ? 'col-span-2' : ''}`}>
            <Link href={href} className={`flex flex-col w-full h-[100px] px-5 py-4 transition border border-transparent border-accents-3 bg-[#16181c] rounded-lg hover:border-gray-500`}>
                <h3 className="font-medium">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </Link>
        </div>
    );
};

export default TemplateCard;

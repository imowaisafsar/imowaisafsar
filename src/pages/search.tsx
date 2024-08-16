import Layout from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import SearchContent from "@/components/search/SearchContent";
import { selectSearch } from "@/redux/reducers/chatSlice";
import React from "react";
import { useSelector } from "react-redux";

const SearchPage: React.FC = () => {
    const search = useSelector(selectSearch);

    return (
        <Layout title="Search">

            <div className="relative h-screen !max-h-screen">
                <h3 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-white ml-3 my-4">Search(es)</h3>
                <div className="grid grid-cols-3">
                    {search.items && search.items.map((item, index) => (
                        <div key={index} className='col-span-1 border-b border-gray-800 flex flex-col gap-2 px-1.5 py-2 mx-0.5 my-1 hover:bg-[#16181c] rounded-sm'>
                            <div className='flex flex-col gap-2'>
                                {item.pagemap && item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail.length > 0 && (
                                    <img src={item.pagemap.cse_thumbnail[0].src} alt={item.title} className='w-full max-h-[120px] object-cover rounded-md shadow-md' />
                                )}
                                <div style={{ lineHeight: '10px' }}>
                                    <a href={item.link} className='text-foreground' target="_blank" rel="noopener noreferrer">
                                        <h3 className='text-sm font-semibold'>{item.title}</h3>
                                    </a>
                                    <p className='text-xs text-muted-foreground text-gray-300'>{item.snippet}</p>
                                    <a href={item.link} className='text-xs text-foreground font-medium'>{item.displayLink}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default SearchPage;

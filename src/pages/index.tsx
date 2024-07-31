import Layout from "@/components/Layout";
import TemplateCard from "@/components/home/TemplateCard";
import { templateCards } from "@/data/templateCards";

export default function Home() {
    return (
        <Layout title="Home">
            <div className="w-full h-full flex flex-col items-center justify-center px-4 lg:px-32">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">Welcome to<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">AI Study Assistant</span></h1>
                <div className="w-full mt-8 text-center grid grid-cols-2">
                    {templateCards.map((card, index) => (
                        <TemplateCard
                            key={index}
                            href={card.href}
                            title={card.title}
                            description={card.description}
                            width={card.width}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

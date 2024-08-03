import Layout from "@/components/Layout";
import TemplateCard from "@/components/home/TemplateCard";
import { templateCards } from "@/data/templateCards";
import SignIn from "./sign-in";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
    const { user } = useUser();

    return (
        <Layout title="Home">
            <div className="w-full h-full flex flex-col items-center justify-center px-4 lg:px-32">
                <div className="text-center block">
                    <h3 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-white">Hello <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{user?.firstName}!</span></h3>
                    <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">Welcome to<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">AI Study Assistant</span></h1>
                </div>
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

import { ChatBubbleOvalLeftEllipsisIcon, LanguageIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Navigation = {
    name: string
    href: string
    icon: any
}

export const navigation: Navigation[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Chat', href: '/chat', icon: ChatBubbleOvalLeftEllipsisIcon },
    // { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
    // { name: 'Translate', href: '/translate', icon: LanguageIcon },
]
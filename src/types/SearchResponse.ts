export default interface SearchResponse {
    searchInformation?: {
        totalResults: string;
        formattedSearchTime: string;
    };
    items?: {
        link: string;
        displayLink: string;
        formattedUrl: string;
        htmlFormattedUrl: string;
        snippet: string;
        htmlSnippet: string;
        title: string;
        htmlTitle: string;
        kind: string;
        pagemap?: {
            cse_thumbnail?: Thumbnail[];
        };
    }[];
}

export interface DataState {
    prompt: string;
}

export interface Thumbnail {
    src: string;
    width: string;
    height: string;
}
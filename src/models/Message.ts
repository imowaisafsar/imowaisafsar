
export class Message {
    constructor(
        public conversationId: string,
        public role: string,
        public content: number,
        public aiResponse: string,
        public createdAt: Date
    ) { }
}

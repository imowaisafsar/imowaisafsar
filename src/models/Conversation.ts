
export class Conversation {
    constructor(
        public title: string,
        public initialMessage: string,
        public userId: string,
        public createdAt: Date
    ) { }
}

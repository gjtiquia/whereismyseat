export type EventData = {
    eventSlug: string,
    guests: GuestData[],
    tables: TableData[],
}

export type GuestData = {
    displayName: string,
    aliases: string[],
    tableId: string,
};

export type TableData = {
    tableId: string,
}

export const MOCK_EVENT: EventData = {
    "eventSlug": "wedding",
    "guests": [
        {
            displayName: "Apple",
            aliases: ["the pretty one"],
            tableId: "1",
        },
        {
            displayName: "Barry",
            aliases: ["a cool kid"],
            tableId: "2",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "🎤",
            aliases: ["michael", "microphone", "mic@gmail.com"],
            tableId: "4",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
        {
            displayName: "Charlie",
            aliases: [],
            tableId: "3",
        },
    ],
    "tables": [
        { "tableId": "1" },
        { "tableId": "2" },
        { "tableId": "3" },
        { "tableId": "4" },
        { "tableId": "5" },
        { "tableId": "6" },
    ]
}

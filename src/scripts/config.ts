export type GlobalData = {
    invites: InviteData[],
}

export type InviteData = {
    inviteCode: string,
    eventSlug: string,
}

export type EventData = {
    eventSlug: string,
    guests: GuestData[],
    tables: TableData[],
    seatingPlanImageUrl: string,
}

export type GuestData = {
    displayName: string,
    aliases: string[],
    tableId: string,
};

export type TableData = {
    tableId: string,
    tableSlug: string,
    tableDisplayName: string,
    imageUrl: string,
}

export const MOCK_GLOBAL: GlobalData = {
    "invites": [
        {
            "inviteCode": "TEST25",
            "eventSlug": "test-event"
        }
    ]
}

export const MOCK_EVENT: EventData = {
    "eventSlug": "wedding",
    "seatingPlanImageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png",
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
        { "tableId": "1", "tableSlug": "table-1", "tableDisplayName": "Table 1", "imageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png" },
        { "tableId": "2", "tableSlug": "table-2", "tableDisplayName": "Table 2", "imageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png" },
        { "tableId": "3", "tableSlug": "table-3", "tableDisplayName": "Table 3", "imageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png" },
        { "tableId": "4", "tableSlug": "table-4", "tableDisplayName": "Table 4", "imageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png" },
        { "tableId": "5", "tableSlug": "table-5", "tableDisplayName": "Table 5", "imageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png" },
        { "tableId": "6", "tableSlug": "table-6", "tableDisplayName": "Table 6", "imageUrl": "https://f005.backblazeb2.com/file/img-gjt-io/mew+wallpaper.png" },
    ]
}

import type { EventData, GlobalData } from "./config";

export async function tryGetGlobalDataAsync(): Promise<GlobalData | null> {
    const url = `https://f005.backblazeb2.com/file/s3-gjt-io/whereismyseat/global.json`;
    const response = await fetch(url);
    if (!response.ok) {
        console.log("cannot find global");
        return null;
    }

    const globalData: GlobalData = await response.json();
    return globalData;
}

export async function tryGetEventDataAsync(eventSlug: string): Promise<EventData | null> {
    const url = `https://f005.backblazeb2.com/file/s3-gjt-io/whereismyseat/${eventSlug}.json`;

    const response = await fetch(url);
    if (!response.ok) {
        console.log("cannot find event", eventSlug);
        return null;
    }

    const event: EventData = await response.json();
    return event;
} 

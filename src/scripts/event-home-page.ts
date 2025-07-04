import type { GuestData, TableData } from "./config";

main();
function main() {
    const eventHomePage = document.querySelector(
        "[data-event-home-page]",
    ) as HTMLElement;

    if (eventHomePage == null) {
        console.error("cannot find data-event-home-page")
        return;
    }

    const eventSlug = eventHomePage.dataset.eventSlug as string;
    const tables: TableData[] = JSON.parse(eventHomePage.dataset.tables as string);

    const guestInput = eventHomePage.querySelector(
        "[data-guest-name-input]",
    ) as HTMLInputElement;

    const clearButton = eventHomePage.querySelector(
        "[data-clear-input-button]",
    ) as HTMLButtonElement;

    const buttonList = eventHomePage.querySelector(
        "[data-guest-name-button-list]",
    ) as HTMLElement;

    const buttonListHint = eventHomePage.querySelector(
        "[data-guest-name-button-list-hint]",
    ) as HTMLParagraphElement

    const searchButton = eventHomePage.querySelector(
        "[data-search-button]"
    ) as HTMLButtonElement;

    const buttonElements: HTMLButtonElement[] = Array.from(
        buttonList.querySelectorAll("[data-guest-name-button]"),
    );

    const buttons = buttonElements.map((element) => {
        const guest: GuestData = JSON.parse(
            element.dataset.guest as string,
        );
        return { ...guest, element };
    });

    buttons.forEach((button) => {
        button.element.addEventListener("click", () => {
            guestInput.value = button.displayName;
            refreshButtonList();
            // searchButton.click();
        });
    });

    // Note: this only fires AFTER guest stops focus on element
    guestInput.addEventListener("change", refreshButtonList);
    // Note: this fires on EACH key up
    guestInput.addEventListener("keyup", refreshButtonList);

    clearButton.addEventListener("click", () => {
        guestInput.value = "";
        refreshButtonList();
        guestInput.focus();
    });

    searchButton.addEventListener("click", () => {
        const guestName = guestInput.value;

        const guestButtons = buttons.filter(x => x.displayName == guestName);
        if (guestButtons.length == 0) return;

        const tableId = guestButtons[0].tableId;
        const filteredTables = tables.filter(t => t.tableId === tableId);
        if (filteredTables.length == 0 || filteredTables.length > 1) {
            console.error(`Cannot find table with id ${tableId}`);
            return;
        }

        const targetTable = filteredTables[0];
        window.location.href = `/e/${eventSlug}/t/${targetTable.tableSlug}?guestName=${guestName}`
    })

    function refreshButtonList() {
        const inputValue = guestInput.value;
        const lowercaseFilter = inputValue.toLowerCase();

        // Show/hide clear button based on input value
        clearButton.hidden = inputValue === "";

        let shownElementCount = 0;
        let isInputValue = false;
        for (const button of buttons) {
            const li = button.element
                .parentElement as HTMLLIElement;

            // ensures all li has no border-t by default
            li.classList.remove("border-t");

            const showElement = matchFilter(
                [button.displayName, ...button.aliases],
                lowercaseFilter,
            );

            if (showElement) {
                shownElementCount++;

                if (button.displayName == inputValue)
                    isInputValue = true;

                li.hidden = false;

                // this trick is necessary because tailwind first: still treats hidden children as children
                li.classList.add("border-t");
                if (shownElementCount == 1)
                    li.classList.remove("border-t");
            } else {
                li.hidden = true;
            }
        }

        const noSearchResults = shownElementCount == 0;
        const foundExactMatch = isInputValue;

        buttonListHint.textContent = "👇 Find and click your name below 👇"
        if (inputValue == "") buttonListHint.textContent = "👇 ...or find and click your name below 👇"
        if (noSearchResults) buttonListHint.textContent = "Sorry I can't find your name🥺 Can you type again?🙏"
        if (foundExactMatch) buttonListHint.textContent = "👇 Click the button below to find your seat! 👇"

        buttonList.hidden = noSearchResults || foundExactMatch;
        searchButton.hidden = !foundExactMatch;
    }

    // refresh on load to update the border-t
    refreshButtonList();
}

function matchFilter(
    strings: string[],
    lowercaseFilter: string,
): boolean {
    for (const targetString of strings) {
        if (
            targetString
                .toLowerCase()
                .indexOf(lowercaseFilter) > -1
        )
            return true;
    }
    return false;
}

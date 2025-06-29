import { isRenderInstance } from "astro/runtime/server/render/common.js";
import type { UserData } from "./UserData";

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

    const userInput = eventHomePage.querySelector(
        "[data-user-name-input]",
    ) as HTMLInputElement;

    const buttonList = eventHomePage.querySelector(
        "[data-user-name-button-list]",
    ) as HTMLElement;

    const buttonListHint = eventHomePage.querySelector(
        "[data-user-name-button-list-hint]",
    ) as HTMLParagraphElement

    const buttonListBottomHint = eventHomePage.querySelector(
        "[data-user-name-button-list-bottom-hint]",
    ) as HTMLParagraphElement

    const searchButton = eventHomePage.querySelector(
        "[data-search-button]"
    ) as HTMLButtonElement;

    const buttonElements: HTMLButtonElement[] = Array.from(
        buttonList.querySelectorAll("[data-user-name-button]"),
    );

    const buttons = buttonElements.map((element) => {
        const user: UserData = JSON.parse(
            element.dataset.user as string,
        );
        return { ...user, element };
    });

    buttons.forEach((button) => {
        button.element.addEventListener("click", () => {
            userInput.value = button.userName;
            refreshButtonList();
        });
    });

    // Note: this only fires AFTER user stops focus on element
    userInput.addEventListener("change", refreshButtonList);
    // Note: this fires on EACH key up
    userInput.addEventListener("keyup", refreshButtonList);

    searchButton.addEventListener("click", () => {
        const userName = userInput.value;

        const userButtons = buttons.filter(x => x.userName == userName);
        if (userButtons.length == 0) return;

        const tableSlug = userButtons[0].tableId;
        window.location.href = `/e/${eventSlug}/t/${tableSlug}?userName=${userName}`
    })

    function refreshButtonList() {
        const inputValue = userInput.value;
        const lowercaseFilter = inputValue.toLowerCase();

        let shownElementCount = 0;
        let isInputValue = false;
        for (const button of buttons) {
            const li = button.element
                .parentElement as HTMLLIElement;

            // ensures all li has no border-t by default
            li.classList.remove("border-t");

            const showElement = matchFilter(
                [button.userName, ...button.aliases],
                lowercaseFilter,
            );

            if (showElement) {
                shownElementCount++;

                if (button.userName == inputValue)
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
        const foundExactMatch = shownElementCount == 1 && isInputValue;

        buttonListHint.textContent = "👇 Find and click your name below 👇"
        if (inputValue == "") buttonListHint.textContent = "👇 ...or find and click your name below 👇"
        if (noSearchResults) buttonListHint.textContent = "Sorry I couldn't find your name🥺 Can you type again?🙏"
        if (foundExactMatch) buttonListHint.textContent = "👇 Click the button below to find your seat! 👇"

        buttonList.hidden = noSearchResults || foundExactMatch;
        searchButton.hidden = !foundExactMatch;
        buttonListBottomHint.hidden = noSearchResults || foundExactMatch || shownElementCount < 10;
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

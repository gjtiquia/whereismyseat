main();
function main() {
    const eventHomePage = document.querySelector(
        "[data-event-home-page]",
    );

    if (eventHomePage == null) {
        console.error("cannot find data-event-home-page")
        return;
    }

    const userInput = eventHomePage.querySelector(
        "[data-user-name-input]",
    ) as HTMLInputElement;

    const ul = eventHomePage.querySelector(
        "[data-user-name-button-list]",
    ) as HTMLUListElement;

    const cannotFindUserHint = eventHomePage.querySelector(
        "[data-cannot-find-user-hint]",
    ) as HTMLElement;

    const buttonElements: HTMLButtonElement[] = Array.from(
        ul.querySelectorAll("[data-user-name-button]"),
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

    function refreshButtonList() {
        const inputValue = userInput.value;
        const lowercaseFilter = inputValue.toLowerCase();

        let hasFirstElementRendered = false;
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
                li.hidden = false;

                // this trick is necessary because tailwind first: still treats hidden children as children
                li.classList.add("border-t");
                if (!hasFirstElementRendered) {
                    hasFirstElementRendered = true;
                    li.classList.remove("border-t");
                }
            } else {
                li.hidden = true;
            }
        }

        ul.hidden = !hasFirstElementRendered;
        cannotFindUserHint.hidden = hasFirstElementRendered;
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

    // refresh on load to update the border-t
    refreshButtonList();

}

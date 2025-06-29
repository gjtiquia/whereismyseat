# where is my seat

## commands

```bash
# starts local dev server at `localhost:4321`
pnpm dev

# installs dependencies
pnpm install

# build your production site to `./dist/`
pnpm build

# preview your build locally, before deploying
pnpm preview

# run CLI commands like `astro add`, `astro check`
pnpm astro ...

# get help using the Astro CLI
pnpm astro -- --help`
```

## resources

deploying to railway
- https://docs.railway.com/guides/astro

fix "packages field missing or empty" on railway
- https://github.com/pnpm/pnpm/issues/8968

using frontmatter variables in script tags
- (do know that you may forfeit typescript goodies if using inline scripting)
- https://docs.astro.build/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts
- https://docs.astro.build/en/reference/directives-reference/#definevars

vanilla js scripting best practices (from Hypermedia Systems book)
- https://hypermedia.systems/client-side-scripting/

search and filter example
- https://www.w3schools.com/howto/howto_js_filter_lists.asp

convert NodeList to Array
- https://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array

fix astro dev server not running on termux proot ubuntu
- https://github.com/termux/termux-packages/issues/10868#issuecomment-2716706060

get image url from public shared photo in Google Photos
- https://www.reddit.com/r/ObsidianMD/comments/13n20uh/comment/mh473mg
- (but you will get rate limited, unstable)

## todo

config file
- for simplicity, everything can just be put in a single json config file for each event
- no need for complicated queries and joins anyways
- can define a schema so can hv auto complete
- kinda like configuring neovim lmao
- at least dun need to think about db stuff, or at least just hv it like, super minimal, even for ppl writing the config
- config stuff
    - each event has config
    - each guest has config
        - display name
        - aliases
        - table number
    - each table has config
        - picture url (top flexibility of where the photos are stored)
        - bg color (overrides event bg color)

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

## todo

config file
- for simplicity, everything can just be put in a single json config file for each event
- no need for complicated queries and joins anyways
- can define a schema so can hv auto complete
- kinda like configuring neovim lmao
- at least dun need to think about db stuff, or at least just hv it like, super minimal, even for ppl writing the config

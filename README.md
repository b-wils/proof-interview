# proof-editor

A simple file editor. See it in action at https://proof-editor-bwilson.herokuapp.com/#/

## Project setup

Requires git, node and mongodb to be installed

```
git clone https://github.com/scramblor/proof-interview.git
cd proof-interview
npm install
copy .env.sample .env
```

Update .env with your local files

### Compile and run api server/built vue files
```
npm run build
npm run dev
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Improvements

* Add vuex for state management
* Separate into smaller components
* Separate display from business logic
* Support file renames
* Prompt to save unsaved files
* Improve layout/styling

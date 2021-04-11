# Pathfinding Visualizer in 2021 React TypeScript

Live Demo at Github Pages: https://kenfj.github.io/pathfinding-visualizer-react/

* This app is a React App as of 2021 using followings
  - TypeScript
  - Functional Component and custom Hooks
  - Material-UI and makeStyles (not App.css)
* Responsive Web Design (compatible with smartphones)
* Auto deploy to GitHub Pages by GitHub Actions

## Initial Setup

```bash
npx create-react-app pathfinding-visualizer-react --template typescript --use-npm
cd pathfinding-visualizer-react

# https://material-ui.com/getting-started/installation/
# https://material-ui.com/guides/typescript/
npm install @material-ui/core @material-ui/icons @material-ui/lab

# add Roboto Font to public/index.html in the line before manifest
```

## Development and Test

```bash
BROWSER=none npm start
open http://localhost:3000/pathfinding-visualizer-react

npm test
```

## Deploy

* auto deploy by GitHub Actions
  - [.github/workflows/deploy_gh_pages.yml](.github/workflows/deploy_gh_pages.yml)

```bash
# manual deploy to GitHub Pages
npm run deploy

# c.f. https://create-react-app.dev/docs/deployment/#github-pages
```

## Reference

* Pathfinding Visualizer Tutorial
 - https://www.youtube.com/watch?v=msttfIHHkak
* Path Finding Visualizer Tutorial
  - https://www.youtube.com/watch?v=zRRPYKhBe8I
* React Tutorial
  - https://www.youtube.com/watch?v=8o4ng90Uqso

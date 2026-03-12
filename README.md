# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploy to Render

To deploy this Vite app on Render as a Static Site:

- Create a new **Static Site** on Render and connect your repository.
- Set the **Build Command** to: `npm run build:render`
- Set the **Publish Directory** to: `dist`
- The `build:render` script installs development dependencies (needed for Vite & Sass) and then runs the production build. The project also sets the Node engine to `18.x` via `package.json`.

If you prefer not to use the `build:render` script, you can set the Build Command directly to:

```
npm install --include=dev && npm run build
```

This ensures devDependencies (like `vite` and `sass-embedded`) are available during the build on Render.

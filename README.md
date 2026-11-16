# Muntaha Shafique — React Portfolio

This is a frontend-only React portfolio. It reuses the existing CSS, images, motion effects, and page content to preserve the current design. There is no database, admin login, or server-side code. The contact form opens the visitor’s email app with a draft; the visitor sends it from there.

## Run during development

1. Open this folder in a terminal.
2. Run `npm install` once.
3. Run `npm run dev` and open the local address printed by Vite.

## Deploy to Vercel

1. Push this project to a GitHub repository and import it in Vercel.
2. Vercel will build the React app into `dist` using `vercel.json`.
3. Create a free form at Web3Forms using the inbox where you want messages delivered, then copy its access key.
4. In Vercel, open Project Settings → Environment Variables and add `VITE_WEB3FORMS_ACCESS_KEY` with that access key. Redeploy after saving it.
5. After deployment, Vercel assigns a `*.vercel.app` address to the project.

The React form sends submissions through Web3Forms and displays success or error feedback. If the access key is not configured, it falls back to opening the visitor’s email app. Keep the access key in your local `.env.local` file when developing; `.env.example` shows its name. The Web3Forms access key is designed to be public in a client-side form.

## Run locally with XAMPP

Run `npm install`, then `npm run build:xampp`. Open `http://localhost/Portfolio/` with Apache running in XAMPP. The `.htaccess` file serves the built React page from `dist`.

For Vite development, use `npm run dev` and open the local address printed by Vite.

# Muntaha Shafique — React Portfolio

This is a React portfolio with a Gemini-powered assistant served through a Vercel Function. The assistant answers from Muntaha’s published portfolio details, while the Gemini API key stays server-side. The contact form opens the visitor’s email app with a draft; the visitor sends it from there.

## Run during development

1. Open this folder in a terminal.
2. Run `npm install` once.
3. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` there.
4. Run `npx vercel dev` to use the chat API locally. `npm run dev` starts only the Vite frontend.

## Deploy to Vercel

1. Push this project to a GitHub repository and import it in Vercel.
2. Vercel will build the React app into `dist` using `vercel.json`.
3. Create a free form at Web3Forms using the inbox where you want messages delivered, then copy its access key.
4. In Vercel, open Project Settings → Environment Variables and add `VITE_WEB3FORMS_ACCESS_KEY` with the form key and `GEMINI_API_KEY` with the Gemini key. Redeploy after saving them.
5. After deployment, Vercel assigns a `*.vercel.app` address to the project.

The React form sends submissions through Web3Forms and displays success or error feedback. If the form key is not configured, it falls back to opening the visitor’s email app. Keep `GEMINI_API_KEY` in `.env.local` for local serverless development and in Vercel Environment Variables for production; never use a `VITE_` prefix for it because that would expose it in the browser. `.env.example` shows the required variable names.

## Run locally with XAMPP

Run `npm install`, then `npm run build:xampp`. Open `http://localhost/Portfolio/` with Apache running in XAMPP. The `.htaccess` file serves the built React page from `dist`.

For Vite-only frontend development, use `npm run dev`. To exercise the Gemini function locally, use `npx vercel dev` instead.

# DM Study Hub

Interactive Discrete Mathematics study app (MA 2013, KIIT) built with Next.js App Router.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production Validation

Run these before deployment:

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, click New Project and import the repository.
3. Keep framework preset as Next.js.
4. Keep default build settings:
	- Build command: `next build`
	- Output: `.next`
5. Deploy.

No environment variables are required for the current app.

## Route Notes

- Invalid topic/quiz/PYQ URLs return proper Next.js 404 responses via `notFound()`.

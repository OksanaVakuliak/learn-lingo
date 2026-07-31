# LearnLingo

An app for a company offering online language tutors. Visitors browse the tutor catalog, narrow it down by language, level and price, keep the ones they like in favorites, and book a trial lesson.

## Features

- **Home** — what the company offers and a way into the catalog.
- **Teachers** — the list is read from the database and revealed four cards at a time. Filters by teaching language, student level and price per hour combine with each other; "Read more" expands a card with the tutor's background and student reviews.
- **Favorites** — a private page with the saved tutors. The picks are kept per user and survive a reload.
- **Authentication** — sign up, log in and log out through Firebase. A guest who taps the heart is invited to log in first.
- **Booking** — a "Book trial lesson" modal with every field validated.
- **Palettes** — the five color themes from the mockup, switched in the header; the choice is remembered.

## Built with

- React 19, Vite 8, React Router 7
- Firebase: Authentication and Realtime Database
- react-hook-form + yup for forms and validation
- CSS Modules over custom tokens, mobile-first
- ESLint + Prettier

## Running it

Node.js 20 or newer.

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the keys of your own Firebase project:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

The Realtime Database needs a `teachers` collection — seed it from the `teachers.json` that comes with the task.

Then:

```bash
npm run dev      # local server
npm run build    # production build into dist
npm run preview  # serve the build
npm run lint     # ESLint
npm run format   # Prettier
```

## Layout

```
src/
  components/  reusable pieces of the interface
  context/     auth, favorites and theme providers
  hooks/       access to those contexts
  pages/       Home, Teachers, Favorites, NotFound
  services/    Firebase, database reads, local storage
  styles/      tokens and global styles
  utils/       validation schemas and filtering
```

## Links

- Mockup: [Figma](https://www.figma.com/file/LAEgTVs6alDJYLrQVDdk5b)
- Repository: [github.com/OksanaVakuliak/learn-lingo](https://github.com/OksanaVakuliak/learn-lingo)

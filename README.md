# TrustBank Landing Page (Angular)

Single-page, vertically scrollable Angular landing page for the TrustBank
Bank Database Management System project.

## Structure

- `src/app/components/` — section components: navbar, hero, about, services, faq, contact, footer
- `src/app/pages/landing/` — assembles all section components into the single-page layout
- `src/app/pages/login/` and `src/app/pages/register/` — standalone routed pages
- `src/app/app.routes.ts` — routing: `/` (landing), `/login`, `/register`
- `src/styles.scss` — global design tokens (color palette, typography, shared classes)

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Notes

- Navbar links (Home/About/Services/FAQ/Contact) use Angular Router fragments
  to scroll smoothly to sections on the landing page, and will navigate back
  to `/` first if you're on the Login or Register page.
- Login and Register are separate routed pages; all other navigation stays
  on the single landing page.
- Contact form and Login/Register forms are wired up with local component
  state (`onSubmit()`) — connect these to your backend/API as needed.

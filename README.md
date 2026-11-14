# Sweet-lana

Independent Next.js website. Based on a reusable layout and CMS architecture.

## Local development
```bash
npm ci
npm run dev
```

## Production
Deployed from `main` to Railway. The public website is a temporary multilingual coming-soon page. Search indexing is disabled until the business content is approved.

## Data isolation
Configure new, independent MongoDB and R2 credentials before enabling the admin CMS or gallery. Do not reuse credentials, database names, analytics IDs, or customer data from the previous site.

## Content
The original site's reviews, screenshots, public photographs, translations, contact details and branding have been cleared from the current working tree. Keep them out of new commits.

# Yanyi Pu — Academic website

Personal academic website: [yanyipu.github.io](https://yanyipu.github.io/).

## Pages

- `index.html`: About, News and Selected Publications.
- `publications/index.html`: full publication list and citations.
- `activities/index.html`: teaching, presentation materials and research resources.
- `privacy/index.html`: privacy information and analytics choices.
- `assets/style.css`: shared desktop and mobile styling.
- `assets/analytics.js` and `assets/analytics.css`: optional GA4 and consent controls.
- `assets/portrait-github.png`: Yanyi's GitHub profile photograph.
- `files/Yanyi_Pu_CV_Public.pdf`: watermarked public CV.
- `files/publications.bib`: downloadable bibliography.
- `googleda5504b39972d375.html`: Google Search Console ownership verification. Keep this file in place after verification.

## Maintenance

The site uses static HTML and CSS, with no build dependencies or JavaScript required for navigation. GitHub Pages publishes the root of the `codex/website` branch. The `.nojekyll` file preserves the static files as supplied.

When editing shared profile details, apply the same change to all three pages and `404.html`. Keep both publication lists and the bibliography consistent. Update the public CV separately when needed. The public contact address deliberately uses a surname formula.

Only website files belong in this repository. Keep private working documents and original CV source files outside it.

## Optional analytics

Google Analytics 4 loads only on the production HTTPS hostname and only after analytics consent. Rejection sends no analytics requests. Visitors can change their choice using the footer's Analytics settings control; withdrawal disables analytics, clears accessible GA cookies, and reloads the page. Choices and GA cookies expire after at most 180 days. Advertising consent stays denied; Google signals and ad personalisation are disabled in the tag. Page URLs and referrers omit query strings and fragments.

Use GA4 enhanced measurement for page views, scrolls, outbound clicks, and file-download clicks. Keep automatic site search, form interactions, video measurement, and history-based page changes off for this static site. A file-download event measures a link click, not completed delivery of a file. Never add a second Google tag or bypass the consent loader.

The measurement ID appears in the local script tag on each page and is a public identifier, not a secret. Preview hosts never load Google Analytics. Data starts after installation and consent; it does not reconstruct earlier visits.

## Content

Copyright 2026 Yanyi Pu. Linked papers and other third-party material retain their respective rights.

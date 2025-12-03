# Personal Academic Website — Gabriel Saco Alvarado

This repository contains a lightweight, easy-to-maintain academic personal website built with plain HTML, CSS and a small amount of vanilla JavaScript. It is ready to be hosted on GitHub Pages.

## Structure

- `index.html` — Home page
- `research.html` — Research overview, working papers (placeholders)
- `teaching.html` — Teaching activities and TA details
- `projects.html` — Projects & Software (placeholders for repos)
- `coursework.html` — Coursework & certifications
- `cv.html` — Curriculum Vitae layout and download button (placeholder)
- `contact.html` — Contact information and static contact form
- `assets/css/style.css` — Main stylesheet
- `assets/js/main.js` — JS for dark-mode toggle and small behaviors

## Customize content

- Edit the HTML files directly to update text, add links, or insert new sections. The pages are intentionally simple so you can edit them with any text editor.
- To add a downloadable CV PDF, add the file to the repository (e.g. `assets/Gabriel_Saco_Alvarado_CV.pdf`) and update the `href` of the "Download PDF CV" button in `cv.html`.
- Replace placeholder project links and social links on `projects.html` and `contact.html` with your real URLs.

## Dark mode

The site supports light and dark themes. Click the moon icon in the top nav to toggle themes — your preference is stored in `localStorage`.

## Deploy to GitHub Pages

1. Push the repository to GitHub (if not already):

```bash
git add .
git commit -m "Add website scaffold"
git push origin main
```

2. On GitHub, go to the repository Settings → Pages and set the source to the `main` branch and the root (`/`). The site will be available at `https://<your-username>.github.io/<repo-name>/` or your custom domain if configured.

## Local preview

You can preview the site locally by opening any of the `.html` files in a browser. For a simple local server (recommended), run:

```bash
# from the repository root
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Notes & next steps

- Add your actual PDF CV and update the `cv.html` link.
- Replace placeholder social links with your GitHub, LinkedIn, and Google Scholar URLs.
- If you want automated builds or a site generator later, consider migrating to a static site generator, but this plain setup is ideal for GitHub Pages and easy editing.

If you'd like, I can commit these changes, or help add a CI workflow or a nicer PDF download flow.
# Lumen

A monochrome, Notion-inspired notepad delivered as a single HTML page. Built for Integral Web Development, Evidence 4: Test and Release a Web App.

- **Live site:** `https://<your-user>.github.io/<repo-name>/` (replace with your URL)
- **Stack:** plain HTML, CSS and JavaScript (ES modules), Node.js test runner, GitHub Actions, GitHub Pages

## Project layout

```
index.html              the app (single page)
js/notes.js             pure note logic, tested without a browser
test/notes.test.js      unit tests (16 cases: normal, edge and invalid)
docs/DEPLOYMENT.md      before / deploy / verify / roll back / record
docs/DEVLOG.md          dated development log
.github/workflows/      ci.yml (tests on every PR), deploy.yml (publish on main)
```

## Requirements

- Node.js 20 or newer
- npm (ships with Node)
- A modern browser (Chrome, Firefox, Safari)

## Install

```bash
git clone https://github.com/<your-user>/<repo-name>.git
cd <repo-name>
npm install   # no runtime dependencies; this only sets up the project
```

## Run

Open `index.html` in a browser, or serve the folder locally:

```bash
npx --yes serve .
```

Then visit the URL it prints (usually `http://localhost:3000`).

## Test

```bash
npm test
```

The tests use Node's built-in runner (`node --test`), so no extra packages are needed. CI runs the same command on every pull request.

## Deploy

Merging to `main` runs `.github/workflows/deploy.yml`: it runs the tests and, if they pass, publishes the site to GitHub Pages. The full phases (before, deploy, verify, roll back, record) are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Branch protection

`main` is protected: changes arrive through pull requests, one approval is required, and the `Unit tests` check must pass before merging.

## Secrets

This project uses no passwords, tokens or API keys. Do not commit any. If a deploy secret is ever needed, store it in GitHub Actions secrets.

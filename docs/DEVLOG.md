# Development log

Each entry: date, what was done, why, evidence (commit link or screenshot), and problems with their fixes.

> **Before submitting:** every entry must describe work that actually happened. Replace the bracketed placeholders with your real dates, commit links and screenshots, and replace the example problems below with the problems you actually hit.

---

### Entry 1: [YYYY-MM-DD]: Repository setup

- **What:** created the GitHub repository, added README skeleton, enabled branch protection on `main`.
- **Why:** the brief requires main to be protected before any feature work.
- **Evidence:** [commit link] / [screenshot of branch protection settings]
- **Problems and fixes:** [describe, or delete this line if none]

### Entry 2: [YYYY-MM-DD]: Made the helpers testable

- **What:** marked the pure helper functions in `index.html` with `@core` comments and wrote a loader (`test/helpers.js`) that evaluates them in Node.
- **Why:** the app must stay a single HTML file, but the tests need to run its real code.
- **Evidence:** [commit link]
- **Problems and fixes:** [example: the script runs inside one closure, so only DOM-free helpers were marked for extraction]

### Entry 3: [YYYY-MM-DD]: First unit tests

- **What:** added `test/notes.test.js` with normal, edge, and invalid cases; `npm test` runs locally.
- **Why:** the brief requires at least five meaningful unit tests.
- **Evidence:** [commit link] / [screenshot of `npm test` output with 15 passing]
- **Problems and fixes:** [example: `localStorage` is not defined in Node, fixed by injecting a storage object into `loadNotes` and `saveNotes`]

### Entry 4: [YYYY-MM-DD]: CI on pull requests

- **What:** added `.github/workflows/ci.yml`, which runs `npm test` on every pull request.
- **Why:** tests must run automatically before a merge.
- **Evidence:** [link to the green check on a pull request]
- **Problems and fixes:** [describe]

### Entry 5: [YYYY-MM-DD]: Blocked pull request

- **What:** opened a pull request that deliberately breaks one test (expects an empty title to save). CI failed and the merge button was blocked.
- **Why:** the brief requires one pull request documented as blocked by a failing test.
- **Evidence:** [link to the blocked PR] / [screenshot of the failing check]
- **Problems and fixes:** [describe]

### Entry 6: [YYYY-MM-DD]: Fixed and merged the blocked pull request

- **What:** corrected the test expectation, pushed to the same branch, got an approval, and merged once CI was green.
- **Why:** to show the full merge rule cycle.
- **Evidence:** [link to the merged PR]
- **Problems and fixes:** [describe]

### Entry 7: [YYYY-MM-DD]: Deployment workflow

- **What:** added `.github/workflows/deploy.yml` and `docs/DEPLOYMENT.md`, and enabled GitHub Pages with Actions as the source.
- **Why:** the brief requires a working deploy path and written phases.
- **Evidence:** [link to the successful deploy run] / [live URL]
- **Problems and fixes:** [example: the Pages source was still set to a branch, changed it to GitHub Actions]

### Entry 8: [YYYY-MM-DD]: Verification and rollback rehearsal

- **What:** ran the verify checklist on the live URL, then rehearsed a revert on a throwaway branch.
- **Why:** the deployment doc must be tested, not just written.
- **Evidence:** [screenshot of verification] / [link to the revert commit]
- **Problems and fixes:** [describe]

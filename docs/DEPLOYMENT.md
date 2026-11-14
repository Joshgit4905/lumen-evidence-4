# Deployment process

Lumen is a static site published with GitHub Pages. Each step below can be followed by a teammate with no prior context.

## 1. Before

- [ ] Pull the latest `main` and confirm `npm test` passes locally.
- [ ] Confirm the pull request has one approval and the `Unit tests` check is green.
- [ ] Note the commit SHA that is currently live (`git rev-parse origin/main` before merging). You need it for rollback.
- [ ] Confirm that GitHub Pages is set to **Source: GitHub Actions** in repository settings.

## 2. Deploy

1. Merge the approved pull request into `main` (squash or merge commit; do not force-push `main`).
2. The `Deploy to GitHub Pages` workflow starts automatically. It runs the tests again, then publishes.
3. Watch the run under the **Actions** tab. Deployment is finished when the `deploy` job shows a green check and prints the page URL.

## 3. Verify

- [ ] Open the live URL in a private/incognito window.
- [ ] Open the browser console and confirm there are no errors on load.
- [ ] Create a note, edit it, search for it, and delete it.
- [ ] Reload the page and confirm the note list persisted.
- [ ] Check the page on a phone (iPhone Safari) for layout and animation smoothness.
- [ ] If any check fails, go to step 4 before anything else.

## 4. Roll back

Use this if verification fails and the fix is not obvious within a few minutes.

1. Find the merge commit that caused the problem: `git log --oneline main`.
2. Create a revert branch and open a pull request: `git switch -c revert/<short-sha> && git revert -m 1 <merge-commit-sha>`.
3. Get the revert approved and merged. The deploy workflow publishes the reverted code automatically.
4. Re-run verification (step 3) on the live URL.

For an emergency, the previous SHA recorded in step 1 can be redeployed by re-running the deploy workflow from that commit under **Actions → Deploy to GitHub Pages → Run workflow**.

## 5. Record

Add an entry to [docs/DEVLOG.md](DEVLOG.md) with:

- the date and time of the deploy,
- the commit SHA that is live,
- the verification result,
- any rollback performed and why.

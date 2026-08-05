# ato-e2e-static-spa

Purpose-built STATIC fixture for the `ato-staging-capsule-lifecycle-e2e`
suite. Zero dependencies, no external requests, no secrets, no state.
`npm run build` copies `src/` to `dist/`. Two immutable commits are the
test canon: v1 (`STATIC_FIXTURE_V1`) and v2 (`STATIC_FIXTURE_V2`, adds a
second deep-link route). Do not force-push; the E2E suite pins these SHAs.

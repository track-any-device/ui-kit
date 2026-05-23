/** @type {import('semantic-release').GlobalConfig} */
export default {
    branches: ['main'],
    plugins: [
        // 1. Analyse commits to decide patch / minor / major bump.
        //    Conventional Commits format is required (see docs below).
        '@semantic-release/commit-analyzer',

        // 2. Build the human-readable release notes from those commits.
        '@semantic-release/release-notes-generator',

        // 3. Prepend release notes to CHANGELOG.md.
        ['@semantic-release/changelog', {
            changelogFile: 'CHANGELOG.md',
        }],

        // 4. Bump version in package.json and publish to npm.
        ['@semantic-release/npm', {
            // Set to true to skip publishing (changelog + GitHub release only).
            npmPublish: true,
        }],

        // 5. Commit the updated CHANGELOG.md and package.json back to main.
        ['@semantic-release/git', {
            assets: ['CHANGELOG.md', 'package.json'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        }],

        // 6. Create the GitHub release and attach release notes.
        '@semantic-release/github',
    ],
};

/*
 * Commit message convention (Conventional Commits):
 *
 *   fix: correct label alignment           → patch  (0.1.0 → 0.1.1)
 *   feat: add DarkModeToggle component     → minor  (0.1.1 → 0.2.0)
 *   feat!: rename Button variants          → major  (0.2.0 → 1.0.0)
 *   BREAKING CHANGE: in footer of commit  → major
 *
 *   chore/docs/style/refactor/test/ci      → no release
 *
 * Refs: https://www.conventionalcommits.org
 */

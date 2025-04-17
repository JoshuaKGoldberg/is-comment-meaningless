<h1 align="center">Is Comment Meaningless</h1>

<p align="center">
	Determines whether the text of a comment doesn't add anything to the conversation.
	😶
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/is-comment-meaningless/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/is-comment-meaningless" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/is-comment-meaningless?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/is-comment-meaningless/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/is-comment-meaningless" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/is-comment-meaningless?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

Use the exported `isCommentMeaningless` function to test whether a string seems to be a definite _"+1"_-style comment.

```shell
npm i is-comment-meaningless
```

```ts
import { isCommentMeaningless } from "is-comment-meaningless";

// true
isCommentMeaningless("+1");

// false
isCommentMeaningless("mmh, yes, indeed, a fine point, thank you 🧐");
```

### How It Works

`isCommentMeaningless` only returns `true` for a set list of known "meaningless" comments.
It first normalizes text by:

1. Replacing all non-alphabet characters
2. Removing any instances of the word _"please"_
3. Lower-casing the text

You can see the list of phrases in [src/index.ts](./src/index.ts) and example test cases in [src/index.test.ts](./src/index.test.ts).

> Want a new phrase to be added?
> Great!
> [File a new phrase request issue](https://github.com/JoshuaKGoldberg/is-comment-meaningless/issues/new?template=00-.phrase.yml)

## Why?

This utility will be used in [JoshuaKGoldberg/hublint](https://github.com/JoshuaKGoldberg/hublint), a linter for GitHub repository activity.
That bot will be able to automatically post a friendly reply to seemingly meaningless comments with resources to help the commenter understand why posting them is not helpful.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/is-comment-meaningless/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/is-comment-meaningless/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).

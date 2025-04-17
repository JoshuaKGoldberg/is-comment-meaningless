import { describe, expect, it } from "vitest";

import { isCommentMeaningless } from "./index.js";

describe(isCommentMeaningless, () => {
	describe("meaningful", () => {
		it.each([
			"accepting PRs! ❤️",
			"arbitrary other words",
			"lgtm",
			"please fill out the template",
			"what do you mean?",
		])("%j", (text) => {
			expect(isCommentMeaningless(text)).toBe(false);
		});
	});

	describe("meaningless", () => {
		it.each([
			" ",
			"-1",
			"",
			"\t",
			"\t\n \n \r\n ",
			"+1",
			"any update please?",
			"any update please",
			"any update?",
			"any update",
			"help please",
			"help",
			"is this fixed?",
			"is this fixed",
			"minus one",
			"please help",
			"please, is this fixed?",
			"plus one",
			"PLUS ONE",
			"PlUs OnE",
		])("%j", (text) => {
			expect(isCommentMeaningless(text)).toBe(true);
		});
	});
});

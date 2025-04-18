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
		describe("blank", () => {
			it.each([
				" ",
				"\t",
				"\n",
				"...",
				"wat",
				"what?",
				"wut",
				"WUT",
				"\t\n \n \r\n ",
				"",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("blank");
			});
		});

		describe("help", () => {
			it.each([
				"did anybody get this to work?",
				"did anybody get this to work",
				"help me please",
				"help me",
				"help please",
				"help",
				"please help",
				"pls help",
				"plz help",
				"PlZ HeLp",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("help");
			});
		});

		describe("sentiment", () => {
			it.each([
				"- 1",
				"- 2",
				"-",
				"-1!",
				"-1",
				"-2!",
				"-2",
				"-9000!",
				"-9001!",
				"+ !",
				"+ 1!",
				"+!",
				"+",
				"+1 !",
				"+1!",
				"+1",
				"+2!",
				"+2",
				"+9000!",
				"+9001!",
				"ditto",
				"im also seeing this",
				"i am also seeing this",
				"I'm also seeing this",
				"me too",
				"minus one",
				"plus one!",
				"plus one",
				"PLUS ONE",
				"same here",
				"same",
				"us too",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("sentiment");
			});
		});

		describe("update", () => {
			it.each([
				"any update",
				"any update?",
				"any update?!",
				"any update on this",
				"bump",
				"is this broken?",
				"is this still broken?",
				"is this fixed?",
				"is this fixed",
				"is this still not fixed",
				"looking forward to it",
				"looking forward to this",
				"up",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("update");
			});
		});
	});
});

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
				"???",
				"?",
				"...",
				"",
				"\n",
				"\t",
				"\t\n \n \r\n ",
				"¯\\_(ツ)_/¯",
				"wat",
				"what?",
				"wut",
				"WUT",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("blank");
			});
		});

		describe("help", () => {
			it.each([
				"any idea",
				"did anybody get this to work?",
				"did anybody get this to work",
				"help me please",
				"help me",
				"help please",
				"help",
				"i m stuck",
				"im stuck",
				"need help",
				"please help",
				"pls help",
				"plz help",
				"PlZ HeLp",
				"stuck",
				"what do i do",
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
				"👀",
				"👍",
				"👍🏾",
				"👎",
				"💩",
				"💯",
				"🖕",
				"🙏",
				"100%",
				"and for me",
				"and for us",
				"ditto",
				"followed",
				"following",
				"i am also seeing this",
				"I'm also seeing this",
				"im also seeing this",
				"just came here to say this",
				"me too",
				"minus one",
				"plus one!",
				"plus one",
				"PLUS ONE",
				"same here",
				"same issue",
				"same",
				"subscribe",
				"subscribed",
				"this",
				"us too",
				"yes",
				"yes please",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("sentiment");
			});
		});

		describe("update", () => {
			it.each([
				"anyone else",
				"anyone",
				"any news",
				"any progress",
				"any update on the bug",
				"any update on this bug",
				"any update on this",
				"any update?!",
				"any update?",
				"any update",
				"bump",
				"ETA?",
				"eta",
				"is there a timeline for this",
				"is there any timeline for this",
				"is there any timeline",
				"is there any news",
				"is there any progress",
				"is there any update",
				"is this broken?",
				"is this fixed?",
				"is this fixed",
				"is this still broken?",
				"is this still not fixed",
				"looking forward to it",
				"looking forward to this",
				"ping",
				"please update 🙏",
				"please update 🙏🏻",
				"please update!",
				"please update",
				"up",
				"update",
				"wondering if there's any news on this",
			])("%j", (text) => {
				expect(isCommentMeaningless(text)).toBe("update");
			});
		});
	});
});

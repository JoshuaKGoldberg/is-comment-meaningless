import { areDocsInformative } from "are-docs-informative";

export type MeaninglessReason = "blank" | "help" | "sentiment" | "update";

// Words that don't add meaning to a comment on their own
const uselessWords = [
	"a",
	"an",
	"and",
	"i",
	"in",
	"of",
	"on",
	"please",
	"pls",
	"plz",
	"re",
	"s",
	"the",
];

const knownMeaninglessPhrases = {
	blank: new Set(["", "wat", "what", "wut"]),
	help: new Set([
		"any idea",
		"did anybody get this to work",
		"help",
		"help me",
		"im stuck",
		"i m stuck",
		"need help",
		"stuck",
		"what do i do",
	]),
	sentiment: new Set([
		"",
		"- 1",
		"-1",
		"+ 1",
		"+1",
		"100%",
		"+",
		"+ !",
		"-",
		"- !",
		"👀",
		"👍",
		"👎",
		"💩",
		"💯",
		"🖕",
		"🙏",
		"and for me",
		"and for us",
		"ditto",
		"followed",
		"following",
		"i am also seeing this",
		"i m also seeing this",
		"im also seeing this",
		"just came here to say this",
		"me too",
		"minus one",
		"plus one",
		"same",
		"same here",
		"same issue",
		"subscribe",
		"subscribed",
		"this",
		"us too",
		"yes",
	]),
	update: new Set([
		"any news",
		"anyone",
		"anyone else",
		"any progress",
		"any update",
		"any update on the bug",
		"any update on this",
		"any update on this bug",
		"bump",
		"eta",
		"is there any news",
		"is there any progress",
		"is there any timeline",
		"is there any timeline for this",
		"is there any update",
		"is there a timeline for this",
		"is this broken",
		"is this fixed",
		"is this still broken",
		"is this still not fixed",
		"looking forward to it",
		"looking forward to this",
		"ping",
		"up",
		"update",
		"wondering if there's any news on this",
	]),
} as const satisfies Record<MeaninglessReason, Set<string>>;

export function isCommentMeaningless(raw: string) {
	const trimmed = raw
		.trim()
		// We don't factor emoji skin tone modifiers, so they're trimmed too
		.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, "");
	for (const [reason, phrases] of Object.entries(knownMeaninglessPhrases)) {
		if (phrases.has(trimmed)) {
			return reason as MeaninglessReason;
		}
	}

	// Collapsing numbers into 1 lets "+9001!" match the same as "+1"
	const normalized = raw
		.replaceAll(/[^a-z1\-+]+/gi, " ")
		.toLowerCase()
		.trim();

	if (normalized !== trimmed) {
		for (const [reason, phrases] of Object.entries(knownMeaninglessPhrases)) {
			if (phrases.has(normalized)) {
				return reason as MeaninglessReason;
			}
		}
	}

	// Finally, a comment is meaningless if it contains only words from a known
	// meaningless phrase, ignoring any useless words like "a" and "please"
	// (lowercased first, as are-docs-informative splits "HeLp" into "he lp")
	const lowercased = trimmed.toLowerCase();
	for (const [reason, phrases] of Object.entries(knownMeaninglessPhrases)) {
		for (const phrase of phrases) {
			if (
				!areDocsInformative(lowercased, phrase, { aliases: {}, uselessWords })
			) {
				return reason as MeaninglessReason;
			}
		}
	}

	return false;
}

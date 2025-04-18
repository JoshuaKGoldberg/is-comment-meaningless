export type MeaninglessReason = "blank" | "help" | "sentiment" | "update";

const knownMeaninglessPhrases = {
	blank: new Set(["", "wat", "what", "wut"]),
	help: new Set(["did anybody get this to work", "help", "help me"]),
	sentiment: new Set([
		"",
		"- 1",
		"-1",
		"+ 1",
		"+1",
		"+",
		"+ !",
		"-",
		"- !",
		"ditto",
		"i am also seeing this",
		"i m also seeing this",
		"im also seeing this",
		"me too",
		"minus one",
		"plus one",
		"same",
		"same here",
		"us too",
	]),
	update: new Set([
		"any update",
		"any update on this",
		"bump",
		"is this broken",
		"is this fixed",
		"is this still broken",
		"is this still not fixed",
		"looking forward to it",
		"looking forward to this",
		"up",
	]),
} as const satisfies Record<MeaninglessReason, Set<string>>;

export function isCommentMeaningless(raw: string) {
	const normalized = raw
		.replaceAll(/[^a-z1\-+]+/gi, " ")
		.toLowerCase()
		.replaceAll(/\s*(?:please|pls|plz)\s*/g, "")
		.trim();

	for (const [reason, phrases] of Object.entries(knownMeaninglessPhrases)) {
		if (phrases.has(normalized)) {
			return reason as MeaninglessReason;
		}
	}

	return false;
}

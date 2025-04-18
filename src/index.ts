export type MeaninglessReason = "blank" | "help" | "sentiment" | "update";

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

	const normalized = raw
		.replaceAll(/[^a-z1\-+]+/gi, " ")
		.toLowerCase()
		.replaceAll(/\s*(?:please|pls|plz)\s*/g, "")
		.trim();

	if (normalized !== trimmed) {
		for (const [reason, phrases] of Object.entries(knownMeaninglessPhrases)) {
			if (phrases.has(normalized) || phrases.has(trimmed)) {
				return reason as MeaninglessReason;
			}
		}
	}

	return false;
}

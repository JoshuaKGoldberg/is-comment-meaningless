const knownMeaninglessPhrases = new Set([
	"",
	"-1",
	"+1",
	"any update",
	"any update on this",
	"help",
	"is this fixed",
	"minus one",
	"plus one",
]);

export function isCommentMeaningless(raw: string) {
	return knownMeaninglessPhrases.has(
		raw
			.replaceAll(/[^a-z]+/gi, " ")
			.replaceAll(/\s*please\s*/g, "")
			.trim()
			.toLowerCase(),
	);
}

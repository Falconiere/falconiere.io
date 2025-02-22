import { fromMarkdown } from "mdast-util-from-markdown";
import { toString as toStringUtil } from "mdast-util-to-string";
import calculateReadingTime from "reading-time";

export const getReadingTime = (
	text: string | undefined,
): string | undefined => {
	if (!text || !text.length) return undefined;
	try {
		const { minutes } = calculateReadingTime(toStringUtil(fromMarkdown(text)));
		if (minutes && minutes > 0) {
			return `${Math.ceil(minutes)} min read`;
		}
		return undefined;
	} catch (e) {
		return undefined;
	}
};

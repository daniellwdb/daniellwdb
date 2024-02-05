import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import type { Node } from "unist";
import type { VFile } from "vfile";
import type { MarkdownAstroData } from "@astrojs/markdown-remark";

export function remarkReadingTime() {
  return function (tree: Node, file: VFile) {
    const markdownFile = file as unknown as {
      data: { astro: MarkdownAstroData };
    };

    if (markdownFile.data.astro.frontmatter) {
      const textOnPage = toString(tree);
      const readingTime = getReadingTime(textOnPage);

      markdownFile.data.astro.frontmatter.minutesRead = readingTime.text;
    }
  };
}

import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import type { Node } from "unist";
import type { VFile } from "vfile";

export function remarkReadingTime() {
  return function (tree: Node, file: VFile) {
    if (file.data.astro?.frontmatter) {
      const textOnPage = toString(tree);
      const readingTime = getReadingTime(textOnPage);

      file.data.astro.frontmatter.minutesRead = readingTime.text;
    }
  };
}

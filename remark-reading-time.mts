import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import type { Node } from "@astrojs/markdown-remark";

type DataMap = {
  data: {
    astro?: {
      frontmatter?: Record<string, any>;
    };
  };
};

export function remarkReadingTime() {
  return function (tree: Node, { data }: DataMap) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    data.astro!.frontmatter!.minutesRead = readingTime.text;
  };
}

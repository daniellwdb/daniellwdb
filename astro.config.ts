import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import tailwind from "@astrojs/tailwind";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HEADING_LINK_ANCHOR, SITE_URL } from "./src/consts";
import robotsTxt from "astro-robots-txt";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap(), tailwind(), robotsTxt()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [HEADING_LINK_ANCHOR],
          },
        },
      ],
    ],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "min-light",
      wrap: true,
    },
  },
  image: {
    domains: ["res.cloudinary", "i.scdn.co"],
  },
  output: "hybrid",
  adapter: vercel({
    isr: true,
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
});

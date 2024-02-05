import { type UserConfig } from "@commitlint/types";

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-case": [2, "always", ["lower-case", "upper-case"]],
    "header-max-length": [2, "always", 120],
  },
} satisfies UserConfig;

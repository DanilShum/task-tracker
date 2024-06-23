module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "plugin:@intlify/vue-i18n/recommended",
  ],

  plugins: ["import", "react"],

  settings: {
    "vue-i18n": {
      localeDir: {
        pattern: "./locales/*.{yaml,yml}",
        localeKey: "file",
      },
      messageSyntaxVersion: "^9.0.0",
    },
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/ban-ts-comment": "off",

    //JS
    "@typescript-eslint/array-type": [
      "error",
      { default: "array-simple", readonly: "array-simple" },
    ],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "error",

    // JSX
    "react/jsx-max-props-per-line": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: false,
        multiline: "ignore",
        ignoreCase: false,
        reservedFirst: ["key", "ref"],
      },
    ],

    // sort
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: false },
        distinctGroup: true,
        "newlines-between": "always",
        groups: [
          "builtin",
          "object",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
        ],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: "{.,..,./..,@,~}/**/*.{css,module.css,jpg,png,svg}",
            group: "index",
          },
        ],
      },
    ],

    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["all", "multiple", "single", "none"],
        allowSeparatedGroups: true,
      },
    ],

    // locals
    "@intlify/vue-i18n/no-raw-text": [
      "error",
      {
        attributes: { "/.+/": ["caption", "label", "title"] },
        ignorePattern: "^[A-Za-z-\\u2013\\u2014#.,;:()&%!?”‘'\"\\/|\\s]+$",
      },
    ],
    "@intlify/vue-i18n/no-missing-keys": "error",
    "@intlify/vue-i18n/key-format-style": ["warn", "kebab-case"],
    "@intlify/vue-i18n/no-duplicate-keys-in-locale": "error",
    "@intlify/vue-i18n/no-missing-keys-in-other-locales": [
      "error",
      { ignoreLocales: ["ru"] },
    ],
    "@intlify/vue-i18n/no-unused-keys": [
      "warn",
      {
        src: "./",
        extensions: [".ts", ".tsx"],
        ignores: ["/\\d/", "/accusative-case/", "/genitive-case/"],
        enableFix: false,
      },
    ],
  },
};

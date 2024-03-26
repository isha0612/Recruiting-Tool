module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: ["standard-with-typescript", "prettier"],
    overrides: [],
    parserOptions: {
      ecmaVersion: "latest",
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
    },
    globals: {
      prisma: "readonly",
      config: "readonly",
      casbinAdapter: "readonly",
      redis: "readonly",
    },
    rules: {
      "max-len": [
        "error",
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true, // "comments": 80
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
    },
  };
  
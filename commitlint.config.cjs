/*
 * To test the configuration:
 * - should be valid: echo "feat(TASK-123): subject" | ./node_modules/.bin/commitlint
 * - should be fail: echo "toto(other-123): subject" | ./node_modules/.bin/commitlint
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [0, "always"],
    "type-empty": [0, "always"],
    "subject-case": [0, "always"],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(TASK)-[A-Za-z0-9]{1,5}: (.*)$/,
      headerCorrespondence: ["subject"],
    },
  },
};

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [0],
    "scope-case": [2, "always", "upper-case"],
    "scope-pattern": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "scope-pattern": ({ scope }) => {
          const isValid = /^(TASK)-\d{1,5}$/.test(scope);
          return [isValid, 'Scope must match "TASK-xxxx" where "xxxx" is up to 5 numeric digits'];
        },
      },
    },
  ],
};

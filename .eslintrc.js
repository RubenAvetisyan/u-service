module.exports = {
  root: true,
  overrides: [
    {
      files: [
        '*.vue',
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: [
        '*.json',
        '*.json5',
      ],
      parser: 'jsonc-eslint-parser',
      rules: {
        'quotes': [
          'error',
          'double',
        ],
        'quote-props': [
          'error',
          'always',
        ],
        'comma-dangle': [
          'error',
          'never',
        ],
      },
    },
    {
      files: [
        '*.yaml',
        '*.yml',
      ],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': 'off',
      },
    },
    {
      files: [
        'package.json',
      ],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'name',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'keywords',
              'license',
              'author',
              'repository',
              'funding',
              'main',
              'module',
              'types',
              'unpkg',
              'jsdelivr',
              'exports',
              'files',
              'bin',
              'sideEffects',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'husky',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: {
              type: 'asc',
            },
          },
        ],
      },
    },
    {
      files: [
        '*.d.ts',
      ],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: [
        '*.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: [
        'scripts/**/*.*',
        'cli.*',
      ],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: [
        '*.test.ts',
        '*.test.js',
        '*.spec.ts',
        '*.spec.js',
      ],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: [
        '**/*.md/*.*',
      ],
      rules: {
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
  extends: [
    '@antfu/eslint-config-ts',
    '@antfu/eslint-config-basic',
    'standard',
  ],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-setup-props-destructure': 'off',
    'import/named': 'off',
    '@typescript-eslint/semi': [
      'error',
      'never',
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
        },
      },
    ],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {},
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': [
      'error',
      'interface',
    ],
    '@typescript-eslint/consistent-indexed-object-style': [
      'error',
      'record',
    ],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    'no-useless-constructor': 'off',
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
      },
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
    'brace-style': [
      'error',
      'stroustrup',
      {
        allowSingleLine: true,
      },
    ],
    '@typescript-eslint/brace-style': [
      'error',
      'stroustrup',
      {
        allowSingleLine: true,
      },
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    '@typescript-eslint/comma-dangle': [
      'error',
      'always-multiline',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    '@typescript-eslint/object-curly-spacing': [
      'error',
      'always',
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'semi': [
      'error',
      'never',
    ],
    'curly': [
      'error',
      'multi-or-nest',
      'consistent',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'quote-props': [
      'error',
      'consistent-as-needed',
    ],
    'no-param-reassign': 'off',
    'array-bracket-spacing': [
      'error',
      'never',
    ],
    'block-spacing': [
      'error',
      'always',
    ],
    'camelcase': 'off',
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': [
      'error',
      'last',
    ],
    'no-constant-condition': 'warn',
    'no-debugger': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'warn',
          'error',
        ],
      },
    ],
    'no-cond-assign': [
      'error',
      'always',
    ],
    'func-call-spacing': [
      'off',
      'never',
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-return-await': 'off',
    'space-before-function-paren': [
      'error',
      'never',
    ],
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],
    'generator-star-spacing': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: [
            '/',
          ],
          exceptions: [
            '/',
            '#',
          ],
        },
        block: {
          markers: [
            '!',
          ],
          exceptions: [
            '*',
          ],
          balanced: true,
        },
      },
    ],
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'consistent-return': 'off',
    'complexity': [
      'off',
      11,
    ],
    'eqeqeq': [
      'error',
      'smart',
    ],
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',
    'no-useless-escape': 'off',
    'vars-on-top': 'error',
    'require-await': 'off',
    'no-return-assign': 'off',
    'operator-linebreak': [
      'error',
      'before',
    ],
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-unsafe-regex': 'off',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-exponentiation-operator': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-text-content': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/throw-new-error': 'error',
    'eslint-comments/disable-enable-pair': 'off',
    'import/no-named-as-default-member': 'off',
    'n/no-callback-literal': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [
          'none',
          'all',
          'multiple',
          'single',
        ],
        allowSeparatedGroups: false,
      },
    ],
    'yml/quotes': [
      'error',
      {
        prefer: 'single',
        avoidEscape: false,
      },
    ],
    'yml/no-empty-document': 'off',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ignorePatterns: [
    '*.min.*',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.mjs',
          '.ts',
          '.d.ts',
        ],
      },
    },
  },
}

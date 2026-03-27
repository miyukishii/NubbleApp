module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/typescript',
    'prettier',
    'plugin:@tanstack/query/recommended'
  ],
  plugins: ['@typescript-eslint', 'import', 'react', '@tanstack/query'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
      project: './tsconfig.json',
      alwaysTryTypes: true,
    },
  },
  },
  rules: {
    indent: ['warn', 2, {
      SwitchCase: 1,
    }],

    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-var-requires': 'off',
    'space-before-function-paren': ['warn', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
    }],
    'import/no-unresolved': 'off',
    'import/no-commonjs': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react-native/no-inline-styles': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never'
    }],
    'react/jsx-curly-spacing': ['warn', {
      when: 'never',
      children: true
    }],

    'space-before-function-paren': ['warn', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'space-in-parens': ['warn', 'never'],
    'array-bracket-spacing': ['warn', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    'space-before-blocks': ['warn', 'always'],
    'no-multi-spaces': 'warn',
    'no-trailing-spaces': 'warn',
    'key-spacing': ['warn', {
      beforeColon: false,
      afterColon: true
    }],
    'comma-spacing': ['warn', {
      before: false,
      after: true
    }],
    'no-spaced-func': 'warn',
    'space-infix-ops': 'warn',
    'space-unary-ops': ['warn', {
      words: true,
      nonwords: false
    }],
    'no-whitespace-before-property': 'warn',

    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'warn',
    'no-unused-expressions': 'warn',
    'import/order': ['warn', {
    groups: [
      'builtin',
      'external',
      'internal',
      'parent',
      'sibling',
      'index',
      'object',
      'type'
    ],
    'newlines-between': 'always',
    alphabetize: {
      order: 'asc',
      caseInsensitive: true
    },
    pathGroups: [
      {
        pattern: 'react',
        group: 'external',
        position: 'before'
      },
      {
        pattern: '@react-native/**',
        group: 'external',
        position: 'before'
      },
      {
        pattern: '@react-navigation/**',
        group: 'external',
        position: 'before'
      },
      {
        pattern: '@tanstack/**',
        group: 'external',
        position: 'before'
      },
      {
        pattern: 'src/**',
        group: 'internal',
        position: 'after'
      }
    ],
    pathGroupsExcludedImportTypes: ['react', 'react-native'],
    distinctGroup: false
  }],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    '*.config.js',
    'coverage/',
    'metro.config.js',
    'index.js',
  ],

};

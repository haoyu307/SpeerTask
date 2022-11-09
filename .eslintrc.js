module.exports = {
  root: true,
  extends: [
    '@react-native-community/eslint-config', // Default RN config
    'standard-with-typescript', // Installed in step 2
    'eslint-config-prettier', // Installed in step 3
  ],
  parser: '@typescript-eslint/parser', // Installed in step 2
  plugins: [
    '@typescript-eslint', // Installed in step 2
    'react', // Installed in step 1
    'react-native', // Installed in step 1
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Required for Standard plugin
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    // 'prettier/prettier': 'error',
    'react-native/no-unused-styles': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/no-raw-text': [
      'warn',
      {
        skip: ['CustomText'],
      },
    ],
    'react-native/no-single-element-style-arrays': 'warn',
    'object-curly-spacing': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],
    'react/jsx-curly-spacing': [
      'off',
      {
        when: 'never',
        allowMultiline: true,
        children: {
          when: 'always',
        },
      },
    ],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    semi: [2, 'always'],
    // Indent with 2 spaces
    indent: ['off', 2],
    // Indent JSX with 2 spaces
    'react/jsx-indent': ['off', 2],
    // Indent props with 2 spaces
    'react/jsx-indent-props': ['off', 2],
  },
};

// .prettierrc.js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  jsxSingleQuote: true,
  bracketSameLine: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'always'
      }
    },
    {
      files: '*.json',
      options: {
        printWidth: 80
      }
    },
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false
      }
    }
  ]
}

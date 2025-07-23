module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  embeddedLanguageFormatting: 'off',
  overrides: [
    {
      files: [
        'utils/migrateProjectLabelSortIndex.js',
        'utils/migrateSitemapPageBlocksInRuntime.js',
        'utils/migrateSitemapPageSortIndex.js',
        'utils/migrateWorkspaceLabelSortIndex.js',
        'utils/migrateWireframePrimitives/index.js',
      ],
      options: {
        printWidth: 1000,
      },
    },
  ],
}

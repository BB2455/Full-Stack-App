module.exports = {
  env: {
    amd   : true,
    es2021: true,
    mocha : true,
    mongo : true,
    node  : true,
  },
  extends: [
    'canonical'
  ],
  globals: {
    reply  : 'writeable',
    req    : 'writeable',
    request: 'writeable',
    res    : 'writeable',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@babel/object-curly-spacing'      : 'off',
    '@babel/semi'                      : 'off',
    'arrow-body-style'                 : 'off',
    'canonical/filename-match-exported': 'off',
    'canonical/filename-match-regex'   : 'off',
    'canonical/id-match'               : 'off',
    'comma-dangle'                     : 'off',
    'consistent-return'                : 'off',
    curly                              : 'off',
    'filenames/match-exported'         : 'off',
    'filenames/match-regex'            : 'off',
    'id-match'                         : 'off',
    'import/extensions'                : 'off',
    'import/max-dependencies'          : 'off',
    'import/no-commonjs'               : 'off',
    'import/unambiguous'               : 'off',
    'key-spacing'                      : 'off',
    'no-console'                       : [
      'error',
      { allow:
        [
          'info',
          'warn',
          'error'
        ]
      }
    ],
    'no-multi-spaces'                 : 'off',
    'no-unused-vars'                  : 'warn',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline'            : 'off',
    'object-property-newline'         : 'off',
    semi                              : [
      'error',
      'never'
    ],
    'sort-keys-fix/sort-keys-fix'     : 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prevent-abbreviations'   : 'off',
  },
}

/** =============================================================
 *
 * Symbols, whitespaces, strings and identifiers
 *
 * Identifiers may begin with a digit but, can consist solely of digits only if quoted.
 *
 * https://mariadb.com/kb/en/library/sql-language-structure/
 * https://mariadb.com/kb/en/library/operators/
 */

export default {
  /**
   * Whitespaces, also expect SQL comments
   */
  WS: { match: /(?:\s+|#.*|-- +.*|\/\*(?:[\s\S])*?\*\/)+/, lineBreaks: true },
  S_EQUAL: '=',
  S_LPARENS: '(',
  S_RPARENS: ')',
  S_COMMA: ',',
  S_SEMICOLON: ';',

  /**
   * Used to represent a bit datatype.
   */
  S_BIT_FORMAT: { match: /b'[01]+'|0b[01]+/ },

  /**
   * Used to represent a bit datatype.
   */
  S_HEXA_FORMAT: { match: /[Xx]'[0-9a-fA-F]+'|0x[0-9a-fA-F]+/ },

  /**
   * Double-quoted strings (kept for compatibility with existing tests).
   */
  S_DQUOTE_STRING: {
    match: /""|"(?:(?:"")|[^"\\]|\\.)*"/,
    value: (v: string) =>
      v
        .substr(1, v.length - 2)
        .replace(/\\"/g, '"')
        .replace(/""/g, '"'),
  },

  S_SQUOTE_STRING: {
    match: /''|'(?:(?:'')|[^'\\]|\\.)*'/,
    value: (v: string) =>
      v
        .substr(1, v.length - 2)
        .replace(/\\'/g, "'")
        .replace(/''/g, "'"),
  },

  S_NUMBER: { match: /[+-]?(?:\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)/, value: Number },

  /**
   * Quoted identifiers (PostgreSQL uses double quotes; we also accept backticks for legacy tests).
   */
  S_IDENTIFIER_QUOTED: {
    match: /`(?:(?:``)|[^`\\])*`|"(?:(?:"")|[^"\\])*"/,
    value: (v: string) => {
      if (v.startsWith('`')) {
        return v.substr(1, v.length - 2).replace(/``/g, '`');
      }
      return v.substr(1, v.length - 2).replace(/""/g, '"');
    },
  },
  S_IDENTIFIER_UNQUOTED: { match: /[0-9a-zA-Z$_]+/ },

  /**
   * Fallback wildcard match.
   */
  S_UNKNOWN: { match: /.+/ },
};

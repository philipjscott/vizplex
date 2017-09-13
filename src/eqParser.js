import XRegExp from 'xregexp'

export default function eqParser (eq) {
  return XRegExp.matchRecursive(eq, 'n\(', '\)', g)
}



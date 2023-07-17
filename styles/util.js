
let CACHE = new Map();
let EXACT_CACHE = new Map();

// Turn `foo.bar` into `.syntax--foo.syntax--bar`. Will split on commas. Will
// convert each scope segment to a class selector in a way that does not care
// about ordering. Something scoped as `foo.bar.baz` will be treated as
// equivalent to something scoped `baz.bar.foo`.
function makeScopeSelector(scope) {
  if (scope.value) scope = scope.value;
  if (CACHE.has(scope)) {
    return CACHE.get(scope);
  }
  let results = [];
  let scopes = scope.split(/,\s*/);
  for (let s of scopes) {
    let converted = s.split(/\./).map(p => `.syntax--${p}`);
    results.push(converted.join(''));
  }
  let output = results.join(', ');
  CACHE.set(scope.value, output);
  return output;
}

// Enforce exact ordering of scope segments. `entity.bar.baz` will only match
// when a scope name starts with `entity`, then contains the `bar` and `baz`
// segments in succession without anything in between.
//
// Use this when styling the major sections. For instance, styling on `string`
// exactly will target anything that starts with `string` and avoid things like
// `constant.language.string.wtf`.
function makeExactScopeSelector (scope) {
  if (scope.value) scope = scope.value;
  if (EXACT_CACHE.has(scope)) {
    return EXACT_CACHE.get(scope);
  }
  let results = [];
  let scopes = scope.split(/,\s*/);
  for (let s of scopes) {
    let converted = s.split(/\./).map(p => `syntax--${p}`);
    results.push(converted.join(' '));
  }
  let output = results.map(value => {
    return `*[class^='${value} '], *[class='${value}']`;
  });
  output = output.join(', ');
  EXACT_CACHE.set(scope.value, output);
  return output;
}

module.exports = {
  install: function(less, pluginManager, functions) {
    functions.add('makeScopeSelector', makeScopeSelector);
    functions.add('makeExactScopeSelector', makeExactScopeSelector);
  }
};

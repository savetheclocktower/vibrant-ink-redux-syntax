const {
  writeConfigFile,
  configFileExists
} = require('./helpers/write-config-file');
const dedent = require('dedent');
const { CompositeDisposable } = require('atom');
const fs = require('fs');

function kebabize (str) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (m, ofs) => {
    return (ofs ? '-' : '') + m.toLowerCase();
  });
}

function interpretBoolean (value) {
  // There's no `false` keyword in LESS; everything is falsy except the
  // constant `true`.
  return (value === true) ? 'true' : '0';
}

function buildConfigFile (config) {
  let importStrings = [];
  let settingStrings = [];
  for (let key in config) {
    if (typeof config[key] !== 'boolean') { continue; }
    let value = interpretBoolean(config[key]);
    settingStrings.push(`@setting-${kebabize(key)}: ${value};`);
  }
  if (config.manageEditorScrollbars) {
    importStrings.push(`@import "optional/scrollbars.less";`);
  }
  if (config.useBracketMatcherStyles) {
    importStrings.push(`@import "optional/bracket-matcher.less";`);
  }
  if (config.useLinterStyles) {
    importStrings.push(`@import "optional/linter.less";`);
  }

  let settingSource = settingStrings.join("\n");
  let importSource = importStrings.join("\n");
  let contents = dedent`
    ${settingSource}

    ${importSource}
  `;
  console.log('[vibrant-ink-redux-syntax] CONTENTS:', contents);
  return contents;
}

function rewriteConfigFile (config) {
  // Only instantly reload if we're not in dev mode. In dev mode we'll be
  // reloading anyway upon file change, so we don't want to trigger an
  // infinite loop.
  let src = buildConfigFile(config);
  return writeConfigFile(src, !atom.inDevMode());
}

module.exports = {
  activate () {
    if (!configFileExists()) {
      console.warn(`[vibrant-ink-redux-syntax] No settings file found. Generating…`);
      rewriteConfigFile(
        atom.config.get('vibrant-ink-redux-syntax')
      );
    }
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(
      atom.config.onDidChange('vibrant-ink-redux-syntax', (config) => {
        return rewriteConfigFile(config.newValue);
      })
    );
  },

  deactivate () {
    this.subscriptions.dispose();
  }
};

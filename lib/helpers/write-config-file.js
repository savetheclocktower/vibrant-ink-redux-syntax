const { promises: fs } = require('fs');
const oldFs = require('fs');
const lockfile = require('proper-lockfile');
const Path = require('path');

let reloadedRecently = false;

const SETTINGS_FILE = Path.resolve(
  Path.join(__dirname, '..', '..', 'styles', 'user-settings.less')
);

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms, true))
}

async function writeConfigFile (content, reload = false) {
  if (!content) { throw new Error('No content given'); }

  if (!configFileExists()) {
    console.warn(`[vibrant-ink-redux-syntax] Config file does not exist! Writing…`);
    await fs.writeFile(SETTINGS_FILE, content, 'utf8');
    if (reload) reloadPackage();
    return;
  }

  lockfile.lock(SETTINGS_FILE)
    .then((release) => {
      console.log('[vibrant-ink-redux-syntax] Writing config file…');
      let result = fs.writeFile(SETTINGS_FILE, content, 'utf8');
      // Don't release the lock immediately, or else another window will try to
      // re-rewrite the config file.
      result.then(() => wait(2000)).then(() => release());
      return result;
    })
    .catch((err) => {
      // Some other window is writing the file, so let's just wait a couple
      // seconds. That should be more than enough time.
      console.warn(`[vibrant-ink-redux-syntax] File locked. Waiting...`);
      return wait(2000)
    })
    .then(() => {
      if (reload) reloadPackage();
    });
}

function configFileExists () {
  return oldFs.existsSync(SETTINGS_FILE);
}

function reloadPackage () {
  let pkg = atom.packages.getLoadedPackage('vibrant-ink-redux-syntax');
  if (pkg && !reloadedRecently) {
    pkg.deactivate();
    reloadedRecently = true;
    setImmediate(() => pkg.activate());
    setTimeout(() => (reloadedRecently = false), 500);
  }
}

module.exports = {
  writeConfigFile,
  configFileExists
};

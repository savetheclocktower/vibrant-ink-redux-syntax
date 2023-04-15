const { promises: fs } = require('fs');

let reloadedRecently = false;
async function writeConfigFile (content, reload = false) {
  if (atom.inDevMode()) { console.log('writeConfigFile'); }
  if (!content) { throw new Error('No content given'); }

  try {
    await fs.writeFile(`${__dirname}/../../styles/user-settings.less`, content, 'utf8');
  } catch (error) {
    throw new Error(`Couldn't write settings file.`);
    console.error(error);
    return;
  }

  if (reload) {
    let pkg = atom.packages.getLoadedPackage('vibrant-ink-redux-syntax');
    if (pkg && !reloadedRecently) {
      pkg.deactivate();
      reloadedRecently = true;
      setImmediate(() => pkg.activate());
      setTimeout(() => (reloadedRecently = false), 500);
    }
  }
}

module.exports = writeConfigFile;

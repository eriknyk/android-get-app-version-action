const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /versionCode\s*=\s*"(\d+(?:\.\d)*)"/mg;
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /versionName\s*=\s*"(\d+(?:\.\d+)*)"/mg;

try {
    const manifestPath = core.getInput('manifestPath');
    
    core.info(`Manifest Path: ${manifestPath}`);
    
    let fileContents = fs.readFileSync(manifestPath).toString();

    const [, currentVersionName] = versionNameRegexPattern.exec(fileContents);
    const [, currentVersionCode] = versionCodeRegexPattern.exec(fileContents);

    if (!currentVersionName) {
        core.setFailed(`Version Code has no value: ${versionCode}`);
        process.exit(1);
    }
    if (!currentVersionCode) {
        core.setFailed(`Cannot read versionCode value.`);
        process.exit(1);
    }

    const nextversionCode = `${Number.parseInt(currentVersionCode) + 1}`

    core.info('versionName = ' + currentVersionName)
    core.info('versionCode = ' + currentVersionCode)
    core.info('nextversionCode = ' + nextversionCode)

    core.setOutput("versionName", currentVersionName);
    core.setOutput("versionCode", currentVersionCode);
    core.setOutput("nextversionCode", nextversionCode);
} catch (error) {
    core.setFailed(error.message);
}
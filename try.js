const listContent = require('list-github-dir-content');
const fs = require('fs');
const path = require('path');

const myToken = fs.readFileSync(".token"); // https://github.com/settings/tokens, only need read permission
const output = "collect";

// They have the same output
async function zz(user, repo) {
    const filesArray = await listContent.viaTreesApi({
            user: user,
            repository: repo,
            directory: '/',
            token: myToken
    });
    if (!fs.existsSync(path.join(output, user))) {
        fs.mkdirSync(path.join(output, user), { recursive: true });
    }
    fs.writeFileSync(path.join(output, user, repo + ".txt"), filesArray.join('\n'));
}
zz("microsoft", "vscode");

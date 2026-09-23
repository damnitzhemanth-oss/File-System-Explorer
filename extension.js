const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const tree = require('tree-node-cli');
const ignore = require('ignore');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('File System Explorer is now active!');

    // Command 1: File Structure
    let disposable1 = vscode.commands.registerCommand('fileSystemExplorer.showFileStructure', async function () {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const treeString = tree(rootPath, {
            allFiles: true,
            exclude: [/node_modules/, /\.git/],
            maxDepth: 10,
        });

        const doc = await vscode.workspace.openTextDocument({
            content: treeString,
            language: 'plaintext'
        });
        await vscode.window.showTextDocument(doc);
    });

    // Command 2: Entire File System
    let disposable2 = vscode.commands.registerCommand('fileSystemExplorer.showEntireFileSystem', async function () {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const ig = ignore();

        // Load .gitignore if it exists
        const gitignorePath = path.join(rootPath, '.gitignore');
        if (fs.existsSync(gitignorePath)) {
            ig.add(fs.readFileSync(gitignorePath).toString());
        }
        // Always ignore node_modules and .git
        ig.add(['node_modules', '.git']);

        const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
        let output = '';

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);

            // Check if the file is ignored
            if (ig.ignores(relativePath)) {
                continue;
            }

            const fileContent = fs.readFileSync(file.fsPath, 'utf8');
            output += `/* ${relativePath} */\n${fileContent}\n\n`;
        }

        const doc = await vscode.workspace.openTextDocument({
            content: output,
            language: 'plaintext'
        });
        await vscode.window.showTextDocument(doc);
    });

    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
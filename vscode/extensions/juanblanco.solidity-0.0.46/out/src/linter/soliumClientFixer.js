"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solium_1 = require("./solium");
const vscode = require("vscode");
function lintAndfixCurrentDocument() {
    let linterType = vscode.workspace.getConfiguration('solidity').get('linter');
    if (linterType === 'solium') {
        const soliumRules = vscode.workspace.getConfiguration('solidity').get('soliumRules');
        const linter = new solium_1.default(soliumRules, null);
        let editor = vscode.window.activeTextEditor;
        let sourceCode = editor.document.getText();
        const fullRange = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(sourceCode.length));
        const result = linter.lintAndFix(sourceCode);
        const edit = new vscode.WorkspaceEdit();
        edit.replace(editor.document.uri, fullRange, result.fixedSourceCode);
        return vscode.workspace.applyEdit(edit);
    }
}
exports.lintAndfixCurrentDocument = lintAndfixCurrentDocument;
//# sourceMappingURL=soliumClientFixer.js.map
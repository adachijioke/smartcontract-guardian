const vscode = require('vscode');

function activate(context) {
  console.log('SmartContract Guardian is now active');
  
  let analyzeCommand = vscode.commands.registerCommand('smartcontract-guardian.analyzeContract', function() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No file open');
      return;
    }
    
    const document = editor.document;
    const contractCode = document.getText();
    
    // Simulate AI analysis (for demo purposes)
    vscode.window.showInformationMessage('Analyzing contract...');
    
    setTimeout(() => {
      // Create a new panel to show results
      const panel = vscode.window.createWebviewPanel(
        'contractAnalysis',
        'Smart Contract Analysis',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      
      // Set HTML content
      panel.webview.html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contract Analysis</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .issue { margin-bottom: 15px; padding: 10px; border-radius: 5px; }
          .critical { background-color: #ffebee; border-left: 5px solid #f44336; }
          .warning { background-color: #fff8e1; border-left: 5px solid #ffc107; }
          h1 { border-bottom: 1px solid #eee; padding-bottom: 10px; }
        </style>
      </head>
      <body>
        <h1>Smart Contract Analysis Results</h1>
        
        <h2>Security Analysis</h2>
        <div class="issue critical">
          <h3>Potential Authorization Bypass</h3>
          <p>The multi-signature implementation could be vulnerable if the contract does not properly validate that the required number of unique signatures are present.</p>
          <p><strong>Recommendation:</strong> Ensure that the vote-counting mechanism checks for unique votes only.</p>
        </div>
        
        <div class="issue warning">
          <h3>Withdrawal Controls</h3>
          <p>The withdrawal function should verify that the proper vote threshold has been met.</p>
          <p><strong>Recommendation:</strong> Add additional validation in the withdraw function.</p>
        </div>
        
        <h2>Generated Test Cases</h2>
        <pre>
;; Test: Successful Withdrawal
(test-scenario "Successful withdrawal after vote threshold met"
  (block
    (tx 'user1 start (list 'user1 'user2 'user3) u2)
    (tx 'user1 deposit u1000)
    (tx 'user1 vote 'user3 true)
    (tx 'user2 vote 'user3 true)
    (tx 'user3 withdraw)
    (assert (is-eq (stx-get-balance 'user3) u1000))
  )
)</pre>
      </body>
      </html>`;
    }, 2000);
  });
  
  context.subscriptions.push(analyzeCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
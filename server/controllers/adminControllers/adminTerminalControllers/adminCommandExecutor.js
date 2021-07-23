//adminCommandExecutor
const shell = require('shelljs');

module.exports = async (req, res) => {
    const command = req.body.command;
    const executeCommand = shell.exec(command)
    res.json({response: await executeCommand.stdout})
    res.end()
}
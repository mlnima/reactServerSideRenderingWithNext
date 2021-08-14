//adminCommandExecutor
const shell = require('shelljs');

module.exports = async (req, res) => {
    const command = req.body.command;
    if (command && command.includes(' ; ')) {
        const splitCommands = command.split(';')
        const commandPromises = splitCommands.map(async singleCommand => {
            return await shell.exec(singleCommand)
        })

        Promise.all([...commandPromises]).then(results => {
            const resultsCombine = results.reduce((a, b) => a + '/n' + b)
            res.json({response: resultsCombine})
            res.end()
        })

    } else {
        const executeCommand = shell.exec(command)
        res.json({response: await executeCommand.stdout})
        res.end()
    }

}
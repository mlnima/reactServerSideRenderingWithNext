export interface TerminalState {
    command: string,
    logs: string[],
    lastCommandResult: string,
    commandsHistory: string[]
}

export interface AdminPanelTerminalState {
    command: string,
    logs: string[],
    lastCommandResult: string,
    commandsHistory: string[]
}

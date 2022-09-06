const _getMultipleSettingsQueryGenerator = (settings:string[]) => {
    const settingsQuery = settings.map(s => 'setting=' + s).join('&')
    return `?${settingsQuery}`
}

export default _getMultipleSettingsQueryGenerator;
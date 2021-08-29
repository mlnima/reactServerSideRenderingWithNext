const _getMultipleSettingsQueryGenerator = (settings, cache) => {
    const settingsQuery = settings.map(s => 'setting=' + s).join('&')
    return `?cache=${cache}&${settingsQuery}`
}

export default _getMultipleSettingsQueryGenerator
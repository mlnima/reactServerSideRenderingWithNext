const nextTranslateWithCallback = ({ t, primaryNamespace, originalString }) => {
    return t(
        `${primaryNamespace || 'common'}:${originalString}`,
        {},
        {
            fallback: t(
                `customTranslation:${originalString}`,
                {},
                { fallback: originalString },
            ),
        },
    );
};

module.exports = nextTranslateWithCallback;

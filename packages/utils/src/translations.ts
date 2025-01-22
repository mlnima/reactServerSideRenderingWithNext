export const nextTranslateWithCallback = (props: {
  t: (key: string, options?: Record<string, unknown>, fallback?: Record<string, unknown>) => string;
  primaryNamespace?: string;
  originalString: string
}): string => {
  return props.t(
    `${props.primaryNamespace || 'common'}:${props.originalString}`,
    {},
    {
      fallback: props.t(
        `customTranslation:${props.originalString}`,
        {},
        { fallback: props.originalString },
      ),
    },
  );
};
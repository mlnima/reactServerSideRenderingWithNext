
export const reactSelectPrimaryTheme = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        color: 'var(--secondary-text-color)',
        backgroundColor: 'var(--secondary-background-color)',
        border: 'var(--primary-border)',
        borderRadius: '.375rem',
        width: '100%',
    }),
    singleValue: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'var(--primary-button-link-background-color, #f90)',
        color: 'var(--primary-button-link-text-color, #000)',
        padding:'.25rem',
        boxSizing:'border-box',
        borderRadius: 'var(--primary-border-radius)'
    }),
    multiValue: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'var(--primary-button-link-background-color, #f90)',
        color: 'var(--primary-button-link-text-color, #000)',
        padding:'.25rem',
        boxSizing:'border-box',
        borderRadius: 'var(--primary-border-radius)'
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        color: 'var(--secondary-text-color)',
    }),
    menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'var(--secondary-background-color)',
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isSelected
            ? 'var(--secondary-background-color)'
            : state.isFocused
                ? 'var(--secondary-hover-background-color)'
                : undefined,
        color: 'var(--secondary-text-color)',
    })
}
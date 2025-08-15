import { compileString } from 'sass';

interface IProps {
  styles?: string;
  id?: string;
  enableScss?: boolean;
}

const DynamicStyleInjector = ({ styles, id = 'custom-styles', enableScss = true }: IProps) => {
  if (!styles) {
    return null;
  }

  let compiledStyles = styles;

  if (enableScss) {
    try {
      const hasScssFeatures = /[&$@]|::|[\w-]+\s*{[^}]*[\w-]+\s*{/.test(styles);

      if (hasScssFeatures) {
        const result = compileString(styles, {
          quietDeps: true,
          verbose: false,
        });
        compiledStyles = result.css;
      }
    } catch (error) {
      compiledStyles = styles;
    }
  }

  const cleanedStyles = compiledStyles
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanedStyles) {
    return null;
  }

  return <style id={id} dangerouslySetInnerHTML={{ __html: cleanedStyles }} suppressHydrationWarning={true} />;
};

const SimpleDynamicStyleInjector = ({ styles, id = 'admin-dynamic-styles' }: IProps) => {
  if (!styles) {
    return null;
  }

  return <style id={id} dangerouslySetInnerHTML={{ __html: styles }} suppressHydrationWarning={true} />;
};

export default DynamicStyleInjector;
export { SimpleDynamicStyleInjector };

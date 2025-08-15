import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import './style.scss';

type Props = {
  markdown: string | object;
};

const MarkdownRenderer = async ({ markdown }: Props) => {
  if (typeof markdown !== 'string') return null;

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, {
      // detect: true,
      // ignoreMissing: true,
      // subset: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  const contentHtml = processed.toString();

  return <div dangerouslySetInnerHTML={{ __html: contentHtml }} className="markdown-renderer" />;
};

export default MarkdownRenderer;

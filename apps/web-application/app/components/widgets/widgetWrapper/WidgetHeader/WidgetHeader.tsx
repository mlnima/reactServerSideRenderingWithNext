import Link from 'next/link';
import { FC } from 'react';
import './WidgetHeader.scss';

interface WidgetHeaderPropTypes {
  title: string,
  redirectLink: string,
  redirectToTitle: string,
  redirectLinkPosition: string,
  pagination: boolean,
  position: string,
  dictionary: {
    [key: string]: string
  }
}

const WidgetHeader: FC<WidgetHeaderPropTypes> = (
  {
    title,
    redirectLink,
    redirectToTitle,
    redirectLinkPosition,
    dictionary,
    position,
    pagination,
  }) => {

  return (
    <div className="widgetHeader">
      <div className="widgetHeaderContent">
        {['header', 'navigation', 'footer'].includes(position) ?
          <h2 className="widget-header-title">{dictionary?.[title] || title}</h2> :
          <h1 className="widget-header-title">{dictionary?.[title] || title}</h1>
        }

        {(
            redirectLink &&
            (redirectLinkPosition === 'header' || !redirectLinkPosition) &&
            !pagination
          ) &&
          <Link href={redirectLink}
                className={'btn btn-primary widget-header-redirect-link'}
                title={title + ' content'}
                aria-label={dictionary?.[redirectToTitle] || redirectToTitle}>
            {dictionary?.[redirectToTitle] || redirectToTitle}
          </Link>
        }
      </div>
    </div>
  );
};

export default WidgetHeader;

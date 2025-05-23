
import './styles.scss';

import dashboardGetWidgets from '@lib/actions/database/widgets/dashboardGetWidgets';
import { reduceWidgetsToGroups } from '@repo/utils/dist/src/arrays';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import { IPage, IWidget, IWidgetData, PageParams, PageSearchParams } from '@repo/typescript-types';
import dashboardGetPages from '@lib/actions/database/pages/dashboardGetPages';
import EditWidgetsContent from './components/EditWidgetsContent/EditWidgetsContent';

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}


const page = async (props: IProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { pages } = unwrapResponse(
    await dashboardGetPages({ size: 100,fields:'title' }) as unknown as ServerActionResponse<{
      pages: IPage[]
    }>,
  );

  const customPages = pages ? pages.map(p=>p.title) : []

  // dont remove, we will get only need widgets later
  const positions = Array.isArray(searchParams?.positions) ? searchParams?.positions : [searchParams?.positions];

  const { success, data, message } = await dashboardGetWidgets() as ServerActionResponse<{ widgets: IWidget[] }>;

  if (!success || !data) {
    return <p>{message}</p>;
  }

  const widgetsInGroups = reduceWidgetsToGroups(data?.widgets);
  const availablePositions = Object.keys(widgetsInGroups);


  return <EditWidgetsContent customPages={customPages} widgetsInGroups={widgetsInGroups} availablePositions={availablePositions}/>;
};


export default page;

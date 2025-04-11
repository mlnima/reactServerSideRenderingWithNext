import FilterEditingWidgets from './FilterEditingWidgets/FilterEditingWidgets';
import AddWidgetMenu from './AddWidgetMenu/AddWidgetMenu';
import './styles.scss';
import WidgetPositionsWrapper from './WidgetPositionsWrapper/WidgetPositionsWrapper';

const page = async () => {
  return (
    <div id={'editWidgetsPage'} className="admin-widgets-page">
      <h1>Widgets Settings</h1>
      <div className="widget-setting">
        <h2>Add New Widget:</h2>
        <div className="top-panel">
          <AddWidgetMenu />
        </div>
        <div className={'filter-positions'}>
          <h2>Filter Position:</h2>
          <FilterEditingWidgets />
        </div>
        <h2>Widgets:</h2>
        <WidgetPositionsWrapper />
      </div>
    </div>
  );
};


export default page;

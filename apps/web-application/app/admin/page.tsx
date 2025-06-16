import MonitorResources from '@components/dashboardWidgets/MonitorResources/MonitorResources';

export default function Page() {
  return <div>
    <MonitorResources interval={5000} />
  </div>;
}
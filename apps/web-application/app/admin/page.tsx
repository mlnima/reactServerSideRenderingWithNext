import MonitorResources from '@components/dashboardWidgets/MonitorResources/MonitorResources';
import NginxLogMonitor from '@components/dashboardWidgets/NginxLogMonitor/NginxLogMonitor';

export default function Page() {
  // console.log(process.memoryUsage());
  return <div>
    <MonitorResources interval={5000} />
    <NginxLogMonitor/>
  </div>;
}
import { ContextProvider } from './context';
import DashboardComponent from './Dashboard';

const Dashboard = ({ ...restProps }) => (
  <ContextProvider>
    <DashboardComponent {...restProps} />;
  </ContextProvider>
);

export default Dashboard;

import { JarvisProvider } from './jarvis';
import { ActionRouterProvider } from './actionRouter';

const DemoStateProvider: React.FC = ({ children }) => (
  <ActionRouterProvider>
    <JarvisProvider>{children}</JarvisProvider>
  </ActionRouterProvider>
);

export default DemoStateProvider;

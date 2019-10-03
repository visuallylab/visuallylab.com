import { JarvisProvider } from './jarvis';
import { ActionRouterProvider } from './actionRouter';

const GlobalStateProvider: React.FC = ({ children }) => (
  <ActionRouterProvider>
    <JarvisProvider>{children}</JarvisProvider>
  </ActionRouterProvider>
);

export default GlobalStateProvider;

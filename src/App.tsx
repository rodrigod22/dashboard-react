import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout/index';
import dark from './styles/themes/dark';
import light from './styles/themes/light';
import Dashboad from './Pages/Dashboard';
import List from './Pages/List/index';
import Routes from './route';



const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  )
}
export default App;

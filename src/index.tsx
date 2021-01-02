import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './hooks/theme';
import App from './App';


interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}
interface ITheme {

  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

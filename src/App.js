import React from 'react';
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import LandingPage from './screens/LandingPage';
import LoanOfferScreen from './screens/LoanOfferScreen';

const theme = createTheme({
  palette: {
    primary: {
      main: '#327B18',
    },
  },
});

const App = () => (
  <div>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/personal-loan-offers" element={<LoanOfferScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </div>
);

export default App;

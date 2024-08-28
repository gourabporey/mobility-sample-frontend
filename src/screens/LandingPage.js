import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FinancialProductOverview = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      boxShadow={1}
      style={{
        width: '60%', padding: '1fr', borderRadius: '1fr', backgroundColor: 'white',
      }}
    >
      <Grid container direction="column" gap={2} alignItems="center">
        <Grid item container gap="1fr">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: '#3C77BA' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{ style: { backgroundColor: '#3C77BA' } }}>
                  <Tab
                    label="Financial Services"
                    value="1"
                    sx={{
                      '&[aria-selected="true"]': {
                        borderBottom: '2px solid #3C77BA',
                        color: '#3C77BA',
                      },
                      '&:hover': {
                        color: '#3C77BA',
                      },
                    }}
                  />
                  <Tab
                    label="Mobility"
                    value="2"
                    sx={{
                      '&[aria-selected="true"]': {
                        borderBottom: '2px solid #3C77BA',
                        color: '#3C77BA',
                      },
                      '&:hover': {
                        color: '#3C77BA',
                      },
                    }}
                  />
                  <Tab
                    label="Food & Beverage"
                    value="3"
                    sx={{
                      '&[aria-selected="true"]': {
                        borderBottom: '2px solid #3C77BA',
                        color: '#3C77BA',
                      },
                      '&:hover': {
                        color: '#3C77BA',
                      },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Typography variant="body1" sx={{ color: '#3C77BA' }}>
                  <b>
                    Credit
                  </b>
                </Typography>
                <List>
                  <ListItem button>
                    <Link
                      to="/personal-loan-details"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      Unsecured Personal Loan
                    </Link>
                  </ListItem>
                  <ListItem button disabled>
                    Unsecured GST based Invoice Loans
                  </ListItem>
                  <ListItem button disabled> Unsecured Purchase Finance </ListItem>
                  <ListItem button disabled> Unsecured Working Capital Lines </ListItem>
                </List>
              </TabPanel>
              <TabPanel value="2">
                <List>
                  <ListItem button>
                    Autos
                  </ListItem>
                  <ListItem button disabled>
                    Cabs
                  </ListItem>
                  <ListItem button disabled> Metro Rail </ListItem>
                  <ListItem button disabled> Flights </ListItem>
                </List>
              </TabPanel>
              <TabPanel value="3">
                <List>
                  <ListItem button>
                    Continental
                  </ListItem>
                  <ListItem button disabled>
                    Middle Eastern
                  </ListItem>
                  <ListItem button disabled> North Indian </ListItem>
                  <ListItem button disabled> Regional Indian </ListItem>
                </List>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid item>
          <Grid container />
        </Grid>
      </Grid>
    </Box>
  );
};
const LandingPage = () => (

  <>
    <Header />
    <Grid
      container
      paddingY={20}
      direction="column"
      style={{ placeItems: 'center', gap: '20px' }}
    >
      <h1 style={{ color: '#3C77BA' }}> Domains Live On The Network </h1>
      <FinancialProductOverview />
    </Grid>
    <Footer />
  </>
);

export default LandingPage;

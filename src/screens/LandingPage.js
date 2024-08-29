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
import setBodyColor from '../utilities/setBodyColor';

const selectedTabsStyle = {
  '&[aria-selected="true"]': {
    margin: '5px',
    borderRadius: '10px',
    background: 'linear-gradient(90deg, #1c75bc, #4aa1e0 51%, #1c75bc)'
      + ' var(--x, 100%) / 200%',
    color: 'white',
  },
  '&:hover': {
    cursor: 'pointer',
  },
};

// eslint-disable-next-line no-unused-vars
const createServiceTab = ({ serviceId, serviceLabel }) => (
  <Tab label={serviceLabel} value={serviceId} sx={selectedTabsStyle} />
);

// eslint-disable-next-line no-unused-vars
const createListedServices = (services) => services.map((service) => {
  const { serviceId, serviceSubLabel, serviceItems } = service;
  return (
    <TabPanel value={serviceId}>
      {serviceSubLabel && (
      <Typography variant="body1" sx={{ color: '#3C77BA' }} fontWeight="600">
          {serviceSubLabel}
      </Typography>
      )}
      (
      <List>
        {serviceItems.map((name, link, active = false) => (
          <ListItem disabled={!active}>
            {link
              ? (<Link to={link}>{name}</Link>)
              : name}
          </ListItem>
        ))}
      </List>
      )
    </TabPanel>
  );
});

const FinancialProductOverview = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // eslint-disable-next-line no-unused-vars
  const services = [
    {
      serviceId: '1',
      serviceLabel: 'Financial Services',
      serviceSubLabel: 'Credit',
      serviceItems: [{
        name: 'Unsecured Personal Loan',
        link: '/personal-loan-details',
        active: true,
      },
      { name: 'Unsecured GST based Invoice Loans' },
      { name: 'Unsecured Working Capital Lines' },
      { name: 'Unsecured Purchase Finance' },
      ],
    }, {
      serviceId: '2',
      serviceLabel: 'Mobility',
      serviceItems: [
        { name: 'Autos', active: true },
        { name: 'Cabs' },
        { name: 'Metro Rail' },
        { name: 'Flights' },
      ],
    }, {
      serviceId: '3',
      serviceLabel: 'Food & Beverage',
      serviceItems: [
        { name: 'Continental', active: true },
        { name: 'Middle Eastern' },
        { name: 'North Indian' },
        { name: 'Regional Indian' }],
    },
  ];

  return (
    <Box
      style={{
        width: '60%', padding: '1fr', borderRadius: '1fr',
      }}
    >
      <Grid container direction="column" gap={2} alignItems="center">
        <Grid item container gap="1fr">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box
                sx={{ borderBottom: 1, borderColor: '#3C77BA' }}
                border="1px solid #dbe6ef"
                bgcolor="#eff8ff"
                borderRadius="1rem"
              >
                <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}>
                  <Tab
                    label="Financial Services"
                    value="1"
                    sx={selectedTabsStyle}
                  />
                  <Tab
                    label="Mobility"
                    value="2"
                    sx={selectedTabsStyle}
                  />
                  <Tab
                    label="Food & Beverage"
                    value="3"
                    sx={selectedTabsStyle}
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
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}>
                    Unsecured GST based Invoice Loans
                  </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}> Unsecured Purchase Finance </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}> Unsecured Working Capital Lines </ListItem>
                </List>
              </TabPanel>
              <TabPanel value="2">
                <List>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}>
                    Autos
                  </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}>
                    Cabs
                  </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}> Metro Rail </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}> Flights </ListItem>
                </List>
              </TabPanel>
              <TabPanel value="3">
                <List>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}>
                    Continental
                  </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}>
                    Middle Eastern
                  </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}> North Indian </ListItem>
                  <ListItem button sx={{ cursor: 'not-allowed', color: '#808080' }}> Regional Indian </ListItem>
                </List>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const LandingPage = () => {
  setBodyColor('#fbfdff');

  return (
    <>
      <Header />
      <Grid
        container
        paddingY={20}
        direction="column"
        style={{ placeItems: 'center', gap: '20px' }}
      >
        <h1 style={{
          background: 'linear-gradient(to right, #19486d, #45b1ff)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        }}
        >
          Domains live on the network
        </h1>
        <FinancialProductOverview />
      </Grid>
      <Footer />
    </>
  );
};

export default LandingPage;

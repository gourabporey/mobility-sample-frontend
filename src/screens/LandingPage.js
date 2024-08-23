import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Api from '../api/Api';

const FinancialProductOverview = ({ navigateToLoanOffer }) => (
  <Box boxShadow={1} style={{ width: '60%', padding: '24px', borderRadius: '10px' }}>
    <Grid container direction="column" gap={2} alignItems="center">
      <Grid item container gap="20px">
        <Grid item>
          <Typography variant="body1">
            Welcome to [Company Name] on the ONDC
            platform, where
            {' '}
            <b>
              we bring seamless lending solutions right to your
              fingertips
            </b>
            . As part of ONDC, we’re making it easier than ever to
            access the funds you need, whether you’re a small business owner
            looking to expand or an individual seeking personal finance options.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            With our intuitive interface and transparent processes, you can
            explore a range of loan products, compare options, and apply within
            minutes. Our commitment to simplicity, security, and speed ensures
            that you get the financial support you need without the hassle.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            Discover how easy it is to secure a loan with us on ONDC –
            empowering you to grow, innovate, and achieve your financial
            goals.
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container />
      </Grid>
      <Grid item>
        <Button
          style={{
            backgroundColor: '#4882C4',
            borderRadius: '28px',
            width: '170px',
            height: '50px',
            textTransform: 'none',
            color: 'white',
            fontSize: '18px',
          }}
          onClick={navigateToLoanOffer}
        >
          Avail Loan
        </Button>
      </Grid>
    </Grid>
  </Box>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const navigateToLoanOffer = async () => {
    setRedirecting(true);
    const data = {
      intent: {
        category: {
          descriptor: {
            code: 'PERSONAL_LOAN',
          },
        },
      },
    };
    const response = await Api.post('/search', data);
    navigate('/personal-loan-offers', { state: { ...response } });
  };

  return (
    <>
      <Header />
      {redirecting ? (
        <Grid
          container
          paddingY={20}
          gap={10}
          direction="column"
          style={{ placeItems: 'center' }}
        >
          <Typography variant="h4">Getting Loan Offers for you</Typography>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          paddingY={20}
          direction="column"
          style={{ placeItems: 'center', gap: '20px' }}
        >
          <h1>Avail Loan faster than ever!</h1>
          <FinancialProductOverview navigateToLoanOffer={navigateToLoanOffer} />
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default LandingPage;

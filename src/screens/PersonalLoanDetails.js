import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import Api from '../api/Api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatherArrowRight from '../assets/images/feather-arrow-right.svg';
import CongratsImage from '../assets/images/img_congrats.svg';

const DetailsBox = ({ navigateToLoanOffer }) => (
  <Box
    boxShadow="0px 4px 12px #7B7B7B29"
    style={{
      width: '50%', padding: '24px', borderRadius: '10px', backgroundColor: 'white',
    }}
  >
    <Grid container direction="column" gap={2} alignItems="center">
      <Grid item container gap="20px">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Grid item>
            <Typography
              variant="body1"
              style={{ textAlign: 'left', padding: '10px', color: '#3B3B3B' }}
              fontSize="15px"
            >
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
            <Typography variant="body1" fontSize="15px" style={{ textAlign: 'left', padding: '10px', color: '#3B3B3B' }}>
              With our intuitive interface and transparent processes, you can
              explore a range of loan products, compare options, and apply within
              minutes. Our commitment to simplicity, security, and speed ensures
              that you get the financial support you need without the hassle.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" fontSize="15px" style={{ textAlign: 'left', padding: '10px', color: '#3B3B3B' }}>
              Discover how easy it is to secure a loan with us on ONDC –
              empowering you to grow, innovate, and achieve your financial
              goals.
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" style={{ paddingTop: '20px' }}>
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
              endIcon={<img src={FeatherArrowRight} alt="right-arrow" />}
            >
              Avail Loan
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const PersonalLoanDetails = () => {
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
          style={{ placeItems: 'center' }}
        >
          <Grid item container alignItems="center" justifyContent="center" gap="20px">
            <img src={CongratsImage} alt="Congrats" />
            <Typography variant="h1" fontSize="26px" letterSpacing="-0.38px">Avail Loan faster than ever!</Typography>
          </Grid>
          <DetailsBox navigateToLoanOffer={navigateToLoanOffer} />
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default PersonalLoanDetails;

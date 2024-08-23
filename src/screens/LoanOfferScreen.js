/* eslint camelcase: 0 */
import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Card, CardContent, CardMedia, CircularProgress,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Api from '../api/Api';

const redirectToComposableBanking = () => {
  window.location.href = 'http://localhost:3000/start-your-journey';
};

const convertToRupeesText = (amount) => {
  const currencyFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });
  return currencyFormat.format(amount);
};

const LoanOfferDetail = ({ title, value }) => (
  <Grid item>
    <Grid container direction="column">
      <Typography variant="caption" color="#6F6F6F">{title}</Typography>
      <Typography variant="body1" color="#191919" component="div" fontWeight="500">{value}</Typography>
    </Grid>
  </Grid>
);

const LoanOfferDetails = ({ offer }) => (
  <Grid container spacing={2}>
    <LoanOfferDetail title="Amount" value={convertToRupeesText(offer.amount)} />
    <LoanOfferDetail title="Interest" value={offer.interestRate} />
  </Grid>
);

const LoanOfferV2 = ({ offer }) => (
  <Box
    boxShadow={3}
    style={{
      padding: '20px',
      borderRadius: '30px',
      width: '70%',
    }}
  >
    <Grid container>
      <Grid item xs={2} md={2}>
        <div>
          <img src={offer.imageUrl} alt={offer.lenderName} style={{ width: '50%' }} />
        </div>
      </Grid>
      <Grid item xs={6} md={6}>
        <Grid container gap="10px">
          <Grid item>
            <Typography variant="h5" component="div">
              {offer.lenderName}
            </Typography>
          </Grid>
          <LoanOfferDetails offer={offer} />
        </Grid>
      </Grid>
      <Grid item container xs={4} md={4} direction="column" gap="20px">
        <Grid item>Recommended</Grid>
        <Grid item>
          <Button
            size="big"
            variant="contained"
            style={{
              backgroundColor: '#3771b2',
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '16px',
              opacity: 0.9,
              fontWeight: 400,
            }}
            onClick={redirectToComposableBanking}
          >
            Apply now
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

// eslint-disable-next-line no-unused-vars
const LoanOffer = ({ offer }) => (
  <Card sx={{ maxWidth: 400, minWidth: '40%' }} style={{ borderRadius: '15px' }}>
    <Box display="flex" alignItems="center" gap={10} margin={2}>
      <CardMedia
        sx={{ height: 50, width: 50 }}
        title={offer.lenderName}
        image={offer.imageUrl}
      />
      <Typography variant="h5" component="div">
        {offer.lenderName}
      </Typography>
    </Box>
    <Box>
      <CardContent style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">Amount</Typography>
          <Typography variant="body1" component="div">
            {convertToRupeesText(offer.amount)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Min. Interest rate</Typography>
          <Typography variant="body1" component="div">
            {offer.interestRate}
          </Typography>
        </Box>
        <Button size="big" variant="contained" style={{ backgroundColor: '#3771b2', borderRadius: '50px', textTransform: 'none' }} onClick={redirectToComposableBanking}>Apply now</Button>
      </CardContent>
    </Box>
  </Card>
);

const LoanOfferScreen = () => {
  const location = useLocation();
  // const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loanOffers, setLoanOffers] = useState([]);
  const [loanOffersLoaded, setLoanOffersLoaded] = useState(false);

  const { message_id } = location.state;

  const getSearchResult = useCallback(async () => {
    console.log(message_id);
    if (!loanOffersLoaded) {
      const result = await Api.get('search', { message_id });
      if (result && result.length > 0) {
        setLoanOffers(result);
        setLoading(false);
        setLoanOffersLoaded(true);
      }
    }
  }, [message_id]);

  useEffect(() => {
    if (loading) {
      Api.poll(getSearchResult, 4, 2000);
    }
  }, [getSearchResult, loading]);

  const displayLoanOffers = () => (
    <Grid
      container
      direction="column"
      style={{
        gap: '20px',
        alignItems: 'center',
        // border: '1px dotted red',
        padding: '20px',
      }}
    >
      {loanOffers.map((bpp) => {
        const { catalog } = bpp.message;

        const offer = {
          lenderName: catalog.descriptor.name,
          interestRate: catalog.providers[0].items[0].tags[0].list.find((tag) => tag.descriptor.code === 'MIN_INTEREST_RATE').value,
          imageUrl: catalog.providers[0].descriptor.images[0].url,
          websiteUrl: bpp.context.bpp_uri,
          amount: catalog.providers[0].items[0].tags[0].list.find((tag) => tag.descriptor.code === 'MAX_LOAN_AMOUNT').value,
        };
        return (
          (
            <LoanOfferV2
              key={bpp.context.bpp_id}
              offer={offer}
            />
          )
        );
      })}
    </Grid>
  );

  return (
    <div>
      <Header />
      {
        loading
          ? (
            <Grid container paddingY={20} gap={10} direction="column" style={{ placeItems: 'center' }}>
              <Typography variant="h4">Getting personalised Loan Offers for you</Typography>
              <CircularProgress />
            </Grid>
          )
          : (
            <Grid container paddingY={20} direction="column" style={{ placeItems: 'center', gap: '20px' }}>
              <Typography color="grey" variant="h4">Here are the available loan options</Typography>
              <Grid container maxWidth="50%" justifyContent="center">
                <Typography variant="subtitle1" gutterBottom>Choose the offer you would like to proceed with</Typography>
                {displayLoanOffers()}
              </Grid>
            </Grid>
          )
      }
      <Footer />
    </div>
  );
};

export default LoanOfferScreen;

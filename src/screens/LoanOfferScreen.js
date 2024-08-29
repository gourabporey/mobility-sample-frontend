/* eslint camelcase: 0 */
import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Api from '../api/Api';
import Tag from '../components/Tag';
import CurrencyFormatter from '../utilities/CurrencyFormatter';

const redirectToComposableBanking = () => {
  window.location.href = 'http://localhost:3000/start-your-journey';
};

const LoanOfferDetail = ({ title, value }) => (
  <Grid item>
    <Grid container direction="column">
      <Typography variant="caption" color="#6F6F6F">{title}</Typography>
      <Typography variant="body1" color="#191919" component="div" fontWeight="400">{value}</Typography>
    </Grid>
  </Grid>
);

const LoanOfferDetails = ({ offer }) => (
  <Grid container spacing={2}>
    <LoanOfferDetail title="Amount" value={CurrencyFormatter.convertToRupeesText(offer.amount)} />
    <LoanOfferDetail title="Interest" value={offer.interestRate} />
  </Grid>
);

const LoanOfferV2 = ({ offer }) => (
  <Box
    boxShadow="0px 4px 12px #7B7B7B29"
    style={{
      padding: '20px',
      borderRadius: '10px',
      width: '90%',
    }}
  >
    <Grid container>
      <Grid item xs={2} md={2}>
        <img src={offer.imageUrl} alt={offer.lenderName} style={{ width: '50%' }} />
      </Grid>
      <Grid item xs={6} md={6}>
        <Grid container gap="10px">
          <Grid item>
            <Typography variant="h5" component="div" fontWeight="300" color="#3B3B3B">
              {offer.lenderName}
            </Typography>
          </Grid>
          <LoanOfferDetails offer={offer} />
        </Grid>
      </Grid>
      <Grid item container xs={4} md={4} direction="column" gap="20px">
        <Grid item alignSelf="end">
          <Tag color="#6F6F6F" bgColor="#70E8E8">Recommended</Tag>
        </Grid>
        <Grid item alignSelf="end">
          <Button
            size="big"
            variant="contained"
            style={{
              backgroundColor: '#3771b2',
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 300,
              maxHeight: '100%',
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

const extractOfferInfo = (provider) => ({
  lenderName: provider.descriptor.long_desc,
  interestRate: provider.items[0].tags[0].list.find((tag) => tag.descriptor.code === 'MIN_INTEREST_RATE').value,
  imageUrl: provider.descriptor.images[0].url,
  websiteUrl: provider.descriptor.websiteUrl,
  amount: provider.items[0].tags[0].list.find((tag) => tag.descriptor.code === 'MAX_LOAN_AMOUNT').value,
});

const LoanOfferScreen = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [loanOffers, setLoanOffers] = useState([]);
  const [loanOffersLoaded, setLoanOffersLoaded] = useState(false);

  const { message_id } = location.state;

  const getSearchResult = useCallback(async () => {
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
        padding: '20px',
      }}
    >
      {loanOffers.flatMap((bpp) => bpp.message.catalog.providers.map((provider) => {
        const offer = extractOfferInfo(provider);
        return (
          <LoanOfferV2
            key={provider.id}
            offer={offer}
          />
        );
      }))}
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
              <Typography color="#3B3B3B" variant="h4">Here are the available loan options</Typography>
              <Tag
                color="#44475A"
                bgColor="#C1DFFF"
                fontSize="14px"
                padding="9px 10px"
                letterSpacing="-0.18px"
              >
                <strong>Note </strong>
                - The loan details below may change upon verifying your information.
              </Tag>
              <Box
                boxShadow="0px 4px 12px #7B7B7B29"
                sx={{ width: { xs: '80%', md: '60%', lg: '40%' } }}
                borderRadius="10px"
                padding="25px"
                style={{ backgroundColor: 'white' }}
              >
                <Grid
                  container
                  justifyContent="center"
                >
                  <Typography variant="subtitle1" fontSize="16px" color="#3B3B3B" fontWeight="400" gutterBottom>
                    Choose the offer
                    you would like to proceed with
                  </Typography>
                  {displayLoanOffers()}
                </Grid>
              </Box>
            </Grid>
          )
      }
      <Footer />
    </div>
  );
};
export default LoanOfferScreen;

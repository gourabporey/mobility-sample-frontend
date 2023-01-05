import './Item.css';
import Grid from '@mui/material/Grid';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SelectJourney from '../screens/SelectJourney';

const Item = ({ item, details }) => {
  const {
    showModal,
    bookingInformation,
    bookingResponse,
    loadingJourney,
    handleClose,
    onSelectJourney,
  } = details;
  return (
    <Grid container className="item-container">
      <Grid
        item
        xs={2}
        alignItems="center"
        justifyContent="center"
        display="flex"
        paddingLeft={2}
      >
        <img
          height={32}
          width={32}
          src={item.descriptor.images[0]}
          alt="taxi-icon"
        />
      </Grid>
      <Grid
        item
        xs={4}
        alignItems="center"
        justifyContent="left"
        display="flex"
        paddingLeft={2}
      >
        <Typography variant="h6" gutterBottom>
          {item.descriptor.name}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Typography variant="h5" gutterBottom>
          ₹&nbsp;
          {item.price.value}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Typography variant="subtitle2" gutterBottom>
          {loadingJourney === true ? (
            <div>Loading....</div>
          ) : (
            <Button onClick={onSelectJourney} variant="contained">
              Select
            </Button>
          )}
        </Typography>
      </Grid>
      <SelectJourney
        showModal={showModal}
        handleClose={handleClose}
        bookingInformation={bookingInformation}
        bookingResponse={bookingResponse}
      />
    </Grid>
  );
};
export default Item;

import Typography from '@mui/material/Typography';
import React from 'react';

const Tag = ({
  label,
  color,
  bgColor,
  fontSize,
  padding,
  borderRadius,
  children,
  ...otherProps
}) => (
  <Typography
    color={color}
    fontWeight="300"
    fontSize={fontSize || '10px'}
    padding={padding || '2px 5px'}
    borderRadius={borderRadius || '10px'}
    bgcolor={bgColor}
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...otherProps}
  >
    {label || children}
  </Typography>
);

export default Tag;

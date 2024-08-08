import * as React from "react";

import { useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";

const ElevationScroll = (props) => {
  const children = props.children;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ElevationScroll;

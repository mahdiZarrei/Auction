import PropTypes from "prop-types";
import { useScrollTrigger, Fade, Box } from "@mui/material";
const ScrollTop = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {props.children}
      </Box>
    </Fade>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ScrollTop;

import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import clsx from "clsx";
import { NavLink, Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import CereLogo from "../media/Icons/cere-icon.svg";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      position: "fixed",
      justifyContent: "space-between",
      padding: `${constants.generalUnit * 2}px ${constants.generalUnit * 4}px`,
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: palette.additional["header"][1],
      borderBottom: `1px solid ${palette.additional["header"][3]}`,
      color: palette.additional["header"][2],
      alignItems: "center",
      zIndex: zIndex?.layer2,
    },
    left: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    logo: {
      height: constants.generalUnit * 5,
      width: constants.generalUnit * 5,
      "& svg, & img": {
        maxHeight: "100%",
        maxWidth: "100%",
      },
    },
    state: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    indicator: {
      display: "block",
      height: 10,
      width: 10,
      borderRadius: "50%",
      backgroundColor: palette.additional["green"][6],
      marginRight: constants.generalUnit,
    },
    address: {
      marginRight: constants.generalUnit,
    },
    network: {},
    rightWrapper: {
      display: "flex",
    },
    link: {
      paddingRight: 10,
    },
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { homeConfig, isReady, address } = useChainbridge();
  return (
    <header className={clsx(classes.root)}>
      <div className={classes.left}>
        {/* ADD LOGO HERE */}
        <div className={classes.logo}>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <img src={CereLogo} alt="Cere Logo" />
          </NavLink>
        </div>
        <NavLink style={{ textDecoration: "none" }} to="/">
          <Typography variant="h4">Bridge</Typography>
          <br />
          <Typography variant="body1">
            Transfer CERE tokens from Ethereum and Polygon to Cere Network
          </Typography>
        </NavLink>
      </div>
      <div className={classes.rightWrapper}>
        <section className={classes.link}>
          <a
            style={{ textDecoration: "none" }}
            href="https://cere-network.gitbook.io/cere-network/mainnet/network-details"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="h5">Cere Network Homepage</Typography>
          </a>
        </section>
        <section className={classes.state}>
          {!isReady ? (
            <Typography variant="h5">No wallet connected</Typography>
          ) : (
            <>
              <div className={classes.indicator}></div>
              <Typography variant="h5" className={classes.address}>
                {address && shortenAddress(address)}
              </Typography>
              <Typography variant="h5" className={classes.address}>
                connected to <strong>{homeConfig?.name}</strong>
              </Typography>
            </>
          )}
        </section>
      </div>
    </header>
  );
};

export default AppHeader;

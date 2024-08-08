import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { Button, Box, useTheme } from "@mui/material";
import { UilWallet } from "@iconscout/react-unicons";
import { TextEdit } from "../../utils/index.jsx";

const projectId = "3a0e3a66e0b3c55c9f22c8c6aba34dd5";

const sepolia = {
  chainId: 11155111,
  name: "Sepolia test network",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.drpc.org/",
};

const hardhat = {
  chainId: 31337,
  name: "Hardhat",
  currency: "ETH",
  rpcUrl: "http://127.0.0.1:8545/",
};

const metadata = {
  name: "TokenGenerator",
  description: "My Website description",
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [sepolia, hardhat],
  projectId,
  enableAnalytics: true,
  themeVariables: {
    "--w3m-z-index": "10",
  },
});

const WalletConnect = () => {
  const theme = useTheme();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  if (isConnected) {
    return (
      <Box>
        <Box textAlign={"center"}>
          <Button
            onClick={() => open()}
            sx={{
              mr: { sm: 1 },
              borderRadius: "50px",
              color: theme.palette.mode === "dark" ? "" : "white",
            }}
            variant="contained"
            color="secondary"
            endIcon={<UilWallet />}
            size="large"
          >
            {TextEdit(address)}
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        <Box display={{ sm: "block" }}>
          <Button
            onClick={() => open()}
            sx={{
              mr: 1,
              borderRadius: "50px",
              color: theme.palette.mode === "dark" ? "" : "white",
            }}
            variant="contained"
            color="secondary"
            endIcon={<UilWallet />}
            size="large"
          >
            Wallet
          </Button>
        </Box>
      </>
    );
  }
};

export default WalletConnect;

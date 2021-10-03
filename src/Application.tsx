import { useMemo } from "react";
import Home from "./pages/Home";
import { createBrowserHistory } from "history";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { Router, Route } from "react-router";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import "./Application.scss";
import Presale from "./pages/Presale";
import ModsLink from "./pages/ModsLink";
import DomainHomePage from "./pages/DomainHomePage";
import RarityTool from "./pages/RarityTool";

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS!
);
const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG!
);
const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);
const presaleStartDateSeed = parseInt(
  process.env.REACT_APP_CANDY_START_DATE_PRESALE!,
  10
);
const txTimeout = 50000; // milliseconds (confirm this works for your project)

export const wave = 3;

const Application = () => {
  const customHistory = createBrowserHistory();
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet()],
    []
  );
  return (
    <Router history={customHistory}>
      <div className="app">
        <Route exact path="/rarity">
          <RarityTool />
        </Route>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <Route exact path="/try-2-guess-this">
              <Home
                candyMachineId={candyMachineId}
                config={config}
                connection={connection}
                startDate={startDateSeed}
                treasury={treasury}
                txTimeout={txTimeout}
              />
            </Route>
            <Route exact path="/latest-pre">
              <Presale
                candyMachineId={candyMachineId}
                config={config}
                connection={connection}
                startDate={presaleStartDateSeed}
                treasury={treasury}
                txTimeout={txTimeout}
              />
            </Route>
            <Route exact path="/thank-you-mods">
              <ModsLink
                candyMachineId={candyMachineId}
                config={config}
                connection={connection}
                startDate={presaleStartDateSeed}
                treasury={treasury}
                txTimeout={txTimeout}
              />
            </Route>
          </WalletProvider>
        </ConnectionProvider>
        <Route exact path="/" component={DomainHomePage} />
      </div>
    </Router>
  );
};

export default Application;

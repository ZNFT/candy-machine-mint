import { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
} from "../javascript/candy-machine";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import cx from "classnames";
import logo from "../images/logo.png";
import vendingMachine from "../images/vending-machine.png";

import Header from "../components/Header";

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

interface PresaleProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const ModsLink = (props: PresaleProps) => {
  const [itemsRemaining, setItemsRemaining] = useState<number | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  // FOR TESTING
  // const startDate = 1632809802316;

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const wallet = useWallet();

  const onMint = async () => {
    setIsMinting(true);
    try {
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );
        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint successful!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
          setItemsRemaining(0);
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setItemsRemaining(0);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }
      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }
      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as anchor.Wallet;
      const { candyMachine, itemsRemaining } = await getCandyMachineState(
        anchorWallet,
        props.candyMachineId,
        props.connection
      );
      setCandyMachine(candyMachine);
      setItemsRemaining(itemsRemaining);
    })();
  }, [wallet, props.candyMachineId, props.connection]);

  const isSoldOut = itemsRemaining === 0;

  return (
    <>
      <Header />
      <section className="home">
        <div className="pb-4" />
        <div className="home__mosaic" />
        <section className="hero">
          <div className="hero-body columns is-vcentered">
            <div className="container column pr-6">
              <p className="is-size-4 has-text-white mb-5">Whitelist Presale</p>
            </div>
            <div className="container column">
              <div className="home__mint-machine-card">
                <div className="mb-5">
                  <WalletModalProvider logo={logo}>
                    <WalletMultiButton className="home__connect-button" />
                  </WalletModalProvider>
                </div>
                <div className="has-text-centered">
                  <img
                    className="home__vending-machine"
                    src={vendingMachine}
                    alt="vending-machine"
                  />
                </div>
                {wallet?.connected && (
                  <div className="home__mint-machine has-text-centered mt-5">
                    <button
                      disabled={isMinting}
                      className={cx("button home__mint-button has-text-white", {
                        "is-loading": isMinting,
                        "is-invisible": !wallet.connected,
                        "home__mint-button--sold-out": isSoldOut,
                      })}
                      onClick={onMint}
                    >
                      {!isSoldOut ? "Mint Now" : "Sold Out"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Snackbar
          open={alertState.open}
          autoHideDuration={6000}
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          <Alert
            onClose={() => setAlertState({ ...alertState, open: false })}
            severity={alertState.severity}
          >
            <div>{alertState.message}</div>
          </Alert>
        </Snackbar>
      </section>
    </>
  );
};

export default ModsLink;
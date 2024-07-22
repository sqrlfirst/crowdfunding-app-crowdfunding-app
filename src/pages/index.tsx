import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Donate } from "../components/donate";
import { WithdrawDonation } from "../components/withdraw-donation";
import { ReadContract } from "../components/read-contract";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <ConnectButton />

                <h1 className={styles.title}>Welcome to Crowdfunding App</h1>
                <div>
                    <ReadContract />
                </div>
                <Donate />
                <WithdrawDonation />
            </main>
        </div>
    );
};

export default Home;

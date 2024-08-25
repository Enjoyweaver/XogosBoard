"use client";

import { ethers } from "ethers";
import { Activity, DollarSign, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { iServABI } from "../../ABIs/iServ";
import { TrackerABI } from "../../ABIs/Tracker";
import { iServ, secondaryAddress, tracker } from "../../config/config";
import styles from "./dashboard.module.css";

interface TransferInfo {
  recipient: string;
  transfer_time: number;
  amount: string;
  valueAtTime: string;
  department: number;
}

interface MultisigWallet {
  name: string;
  address: string;
}

const TokenomicsDashboardClient = () => {
  const [totalSupply, setTotalSupply] = useState("0");
  const [transferEvents, setTransferEvents] = useState<any[]>([]);
  const [secondaryBalance, setSecondaryBalance] = useState("0");
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | null
  >(null);
  const chainId = "4002"; // Fantom Testnet
  const [isLoading, setIsLoading] = useState(true);
  const [isPreMintPhase, setIsPreMintPhase] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [storageAddress, setStorageAddress] = useState<string | null>(null);
  const [iPlayContract, setIPlayContract] = useState<string | null>(null);
  const [transferRecords, setTransferRecords] = useState<TransferInfo[]>([]);
  const [mintedTokens, setMintedTokens] = useState("0");
  const [mintedDays, setMintedDays] = useState("0");

  const [multisigWallets, setMultisigWallets] = useState<MultisigWallet[]>([
    { name: "Main Wallet", address: "" },
    { name: "Treasury Wallet", address: "" },
    { name: "Operations Wallet", address: "" },
    { name: "Development Wallet", address: "" },
    { name: "Marketing Wallet", address: "" },
  ]);

  useEffect(() => {
    const initProvider = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const web3Provider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          setProvider(web3Provider);
        } else {
          const fallbackProvider = new ethers.providers.JsonRpcProvider(
            "https://rpc.testnet.fantom.network"
          );
          setProvider(fallbackProvider);
        }
      } catch (err) {
        console.error("Error initializing provider:", err);
        setError(
          "Failed to initialize provider. Please check your connection."
        );
      }
    };

    initProvider();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!provider) return;
      setIsLoading(true);
      setError(null);
      try {
        if (!iServ?.[chainId]) {
          throw new Error(
            "iServ contract address is undefined for chainId: " + chainId
          );
        }

        const iServContract = new ethers.Contract(
          iServ[chainId],
          iServABI,
          provider
        );

        const trackerContract = new ethers.Contract(
          tracker[chainId],
          TrackerABI,
          provider
        );

        const [
          totalSupplyBN,
          preMintPhase,
          ownerAddress,
          storageAddr,
          iPlayAddr,
          secondaryBalanceBN,
        ] = await Promise.all([
          iServContract.totalSupply(),
          iServContract.preMintPhase(),
          iServContract.owner(),
          iServContract.storageAddress(),
          iServContract.iPlayContract(),
          iServContract.balanceOf(secondaryAddress[chainId]),
        ]);

        setTotalSupply(ethers.utils.formatUnits(totalSupplyBN, 18));
        setIsPreMintPhase(preMintPhase);
        setOwner(ownerAddress);
        setStorageAddress(storageAddr);
        setIPlayContract(iPlayAddr);
        setSecondaryBalance(ethers.utils.formatUnits(secondaryBalanceBN, 18));

        const filter = iServContract.filters.Transfer();
        const logs = await iServContract.queryFilter(filter, -10000, "latest");
        setTransferEvents(logs.reverse());

        const [mintedTokensBN, mintedDaysBN] = await Promise.all([
          trackerContract.minted_tokens(),
          trackerContract.minted_days(),
        ]);

        setMintedTokens(ethers.utils.formatUnits(mintedTokensBN, 18));
        setMintedDays(mintedDaysBN.toString());

        // Fetch transfer records (assuming customerID 1 for example)
        const customerID = 1;
        const transactionCount =
          await trackerContract.transaction_count(customerID);
        const records: TransferInfo[] = [];

        for (let i = 0; i < transactionCount.toNumber(); i++) {
          const record = await trackerContract.get_transaction(customerID, i);
          records.push({
            recipient: record.recipient,
            transfer_time: record.transfer_time.toNumber(),
            amount: ethers.utils.formatUnits(record.amount, 18),
            valueAtTime: ethers.utils.formatUnits(record.valueAtTime, 18),
            department: record.department.toNumber(),
          });
        }

        setTransferRecords(records);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch contract data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [provider, chainId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!provider) return;
      setIsLoading(true);
      setError(null);
      try {
        const updatedMultisigWallets = [
          { name: "Main Wallet", address: "0x1234...5678" },
          { name: "Treasury Wallet", address: "0x2345...6789" },
          { name: "Operations Wallet", address: "0x3456...7890" },
          { name: "Development Wallet", address: "0x4567...8901" },
          { name: "Marketing Wallet", address: "0x5678...9012" },
        ];
        setMultisigWallets(updatedMultisigWallets);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch contract data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [provider, chainId]);

  const transferData = transferEvents
    .map((event, index) => ({
      name: `Transfer ${transferEvents.length - index}`,
      amount: parseFloat(
        ethers.utils.formatUnits(event.args?.amount || "0", 18)
      ),
    }))
    .slice(0, 10)
    .reverse();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>iServ Tokenomics Dashboard</h1>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className={styles.addressesCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Contract Addresses</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.addressItem}>
            <span className={styles.addressName}>iServ:</span>
            <span className={styles.addressValue}>{iServ[chainId]}</span>
          </div>
          <div className={styles.addressItem}>
            <span className={styles.addressName}>Tracker:</span>
            <span className={styles.addressValue}>{tracker[chainId]}</span>
          </div>
          <div className={styles.addressItem}>
            <span className={styles.addressName}>Owner:</span>
            <span className={styles.addressValue}>{owner || "Loading..."}</span>
          </div>
          <div className={styles.addressItem}>
            <span className={styles.addressName}>Storage:</span>
            <span className={styles.addressValue}>
              {storageAddress || "Loading..."}
            </span>
          </div>
          <div className={styles.addressItem}>
            <span className={styles.addressName}>iPlay Contract:</span>
            <span className={styles.addressValue}>
              {iPlayContract || "Loading..."}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className={styles.multisigCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Multisig Wallets</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {multisigWallets.map((wallet, index) => (
            <div key={index} className={styles.walletItem}>
              <span className={styles.walletName}>{wallet.name}:</span>
              <span className={styles.walletAddress}>{wallet.address}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className={styles.statsGrid}>
        <Card className={styles.statsCard}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>
              <DollarSign className={styles.icon} />
              Total Supply
            </CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.statValue}>
              {parseFloat(totalSupply).toLocaleString()} iServ
            </div>
          </CardContent>
        </Card>
        <Card className={styles.statsCard}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>
              <Activity className={styles.icon} />
              Transfer Events
            </CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.statValue}>{transferEvents.length}</div>
          </CardContent>
        </Card>
        <Card className={styles.statsCard}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>
              <Users className={styles.icon} />
              Secondary Balance
            </CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.statValue}>
              {parseFloat(secondaryBalance).toLocaleString()} iServ
            </div>
          </CardContent>
        </Card>
        <Card className={styles.statsCard}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>Pre-Mint Phase</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.statValue}>
              {isPreMintPhase === null
                ? "Loading..."
                : isPreMintPhase
                  ? "Active"
                  : "Inactive"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={styles.statsCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Minting Stats</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div>
            Minted Tokens: {parseFloat(mintedTokens).toLocaleString()} iServ
          </div>
          <div>Minted Days: {mintedDays}</div>
        </CardContent>
      </Card>

      <Card className={styles.chartCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>
            Recent Transfer Events
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transferData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className={styles.eventsSection}>
        <h2 className={styles.sectionTitle}>Transfer Records</h2>
        <div className={styles.eventsGrid}>
          {transferRecords.map((record, index) => (
            <Alert key={`transfer-${index}`} className={styles.eventAlert}>
              <AlertTitle className={styles.alertTitle}>
                Transfer Record
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                Recipient: {record.recipient.slice(0, 6)}...
                {record.recipient.slice(-4)}
                <br />
                Time: {new Date(record.transfer_time * 1000).toLocaleString()}
                <br />
                Amount: {parseFloat(record.amount).toFixed(2)} iServ
                <br />
                Value: ${parseFloat(record.valueAtTime).toFixed(2)}
                <br />
                Department: {record.department}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsDashboardClient;

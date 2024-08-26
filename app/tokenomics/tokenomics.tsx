"use client";

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { AdminABI } from "@/ABIs/Admin";
import { iServABI } from "../../ABIs/iServ";
import { TrackerABI } from "../../ABIs/Tracker";
import {
  adminAddress,
  iServAddress,
  rpcUrls,
  trackerAddress,
} from "../../config/config";
import styles from "./dashboard.module.css";

interface TransferInfo {
  sender: string;
  recipient: string;
  amount: string;
  transfer_time: number;
}

const TokenomicsDashboardClient = () => {
  const [totalSupply, setTotalSupply] = useState("0");
  const [transferEvents, setTransferEvents] = useState<any[]>([]);
  const chainId = "4002"; // Fantom Testnet
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [iPlayContract, setIPlayContract] = useState<string | null>(null);
  const [transferRecords, setTransferRecords] = useState<TransferInfo[]>([]);
  const [mintedTokens, setMintedTokens] = useState("0");
  const [mintedDays, setMintedDays] = useState("0");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);

  // Minting state
  const [mintAmount, setMintAmount] = useState("");
  const [mintRecipient, setMintRecipient] = useState("");
  const [mintUsdAmount, setMintUsdAmount] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const provider = new ethers.providers.JsonRpcProvider(rpcUrls[chainId]);
        const iServContract = new ethers.Contract(
          iServAddress[chainId],
          iServABI,
          provider
        );
        const trackerContract = new ethers.Contract(
          trackerAddress[chainId],
          TrackerABI,
          provider
        );

        const [
          totalSupplyBN,
          nameResult,
          symbolResult,
          decimalsResult,
          ownerAddress,
          iPlayContractAddress,
          mintedTokensBN,
          mintedDaysBN,
        ] = await Promise.all([
          iServContract.totalSupply(),
          iServContract.name(),
          iServContract.symbol(),
          iServContract.decimals(),
          iServContract.owner(),
          iServContract.iPlayContract(),
          trackerContract.total_minted(),
          trackerContract.minted_days(),
        ]);

        // Convert BigNumbers to strings or numbers
        setTotalSupply(ethers.utils.formatUnits(totalSupplyBN, 18));
        setName(nameResult);
        setSymbol(symbolResult);
        setDecimals(decimalsResult.toNumber());
        setOwner(ownerAddress);
        setIPlayContract(iPlayContractAddress);
        setMintedTokens(ethers.utils.formatUnits(mintedTokensBN, 18));
        setMintedDays(mintedDaysBN.toString());

        const filter = iServContract.filters.Transfer();
        const logs = await iServContract.queryFilter(filter, -10000, "latest");
        setTransferEvents(logs.reverse());

        const transferCount = await trackerContract.transfer_count();
        const transferRecordsData: TransferInfo[] = [];

        for (let i = 0; i < Math.min(transferCount.toNumber(), 10); i++) {
          const transferInfo = await trackerContract.get_transfer_info(i);
          transferRecordsData.push({
            sender: transferInfo.sender,
            recipient: transferInfo.recipient,
            amount: ethers.utils.formatUnits(transferInfo.amount, 18),
            transfer_time: transferInfo.transfer_time.toNumber(),
          });
        }

        setTransferRecords(transferRecordsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch contract data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMint = async () => {
    if (!window.ethereum) {
      setMintError("Please install MetaMask to mint tokens.");
      return;
    }

    setIsMinting(true);
    setMintError(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const adminContract = new ethers.Contract(
        adminAddress[chainId],
        AdminABI,
        signer
      );

      const mintAmountBN = ethers.utils.parseUnits(mintAmount, 18);
      const usdAmountBN = ethers.utils.parseUnits(mintUsdAmount, 18);

      const tx = await adminContract.otc_trade(
        mintRecipient,
        mintAmountBN,
        usdAmountBN
      );
      await tx.wait();

      setMintAmount("");
      setMintRecipient("");
      setMintUsdAmount("");
      alert("Tokens minted successfully!");
    } catch (err) {
      console.error("Error minting tokens:", err);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>iServ Tokenomics Dashboard</h1>

      {error && (
        <div>
          <strong>Error</strong>: {error}
        </div>
      )}

      <div className={styles.addressesCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Contract Addresses</h2>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.addressItem}>
            <strong className={styles.addressName}>iServ:</strong>
            <span className={styles.addressValue}>{iServAddress[chainId]}</span>
          </div>
          <div className={styles.addressItem}>
            <strong className={styles.addressName}>Tracker:</strong>
            <span className={styles.addressValue}>
              {trackerAddress[chainId]}
            </span>
          </div>
          <div className={styles.addressItem}>
            <strong className={styles.addressName}>Admin:</strong>
            <span className={styles.addressValue}>{adminAddress[chainId]}</span>
          </div>
          <div className={styles.addressItem}>
            <strong className={styles.addressName}>Owner:</strong>
            <span className={styles.addressValue}>{owner || "Loading..."}</span>
          </div>
          <div className={styles.addressItem}>
            <strong className={styles.addressName}>iPlay Contract:</strong>
            <span className={styles.addressValue}>
              {iPlayContract || "Loading..."}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Total Supply</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statValue}>
              {parseFloat(totalSupply).toLocaleString()} {symbol}
            </div>
          </div>
        </div>
        <div className={styles.statsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Transfer Events</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statValue}>{transferEvents.length}</div>
          </div>
        </div>
        <div className={styles.statsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Minted Tokens</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statValue}>
              {parseFloat(mintedTokens).toLocaleString()} {symbol}
            </div>
          </div>
        </div>
        <div className={styles.statsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Minted Days</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statValue}>{mintedDays}</div>
          </div>
        </div>
      </div>

      <div className={styles.otcCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Mint Tokens (OTC Trade)</h2>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Amount to mint</label>
            <input
              type="text"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="Amount to mint"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Recipient address</label>
            <input
              type="text"
              value={mintRecipient}
              onChange={(e) => setMintRecipient(e.target.value)}
              placeholder="Recipient address"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>USD received</label>
            <input
              type="text"
              value={mintUsdAmount}
              onChange={(e) => setMintUsdAmount(e.target.value)}
              placeholder="USD received"
              className={styles.input}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <button
              onClick={handleMint}
              disabled={isMinting}
              className={styles.button}
            >
              Mint
            </button>
          </div>
          {mintError && <div>{mintError}</div>}
        </div>
      </div>

      <div className={styles.eventsSection}>
        <h2 className={styles.sectionTitle}>Transfer Records</h2>
        <div className={styles.eventsGrid}>
          {transferRecords.map((record, index) => (
            <div key={`transfer-${index}`} className={styles.eventAlert}>
              <div className={styles.alertTitle}>Transfer Record</div>
              <div className={styles.alertDescription}>
                From: {record.sender.slice(0, 6)}...{record.sender.slice(-4)}
                <br />
                To: {record.recipient.slice(0, 6)}...
                {record.recipient.slice(-4)}
                <br />
                Amount: {parseFloat(record.amount).toFixed(2)} {symbol}
                <br />
                Time: {new Date(record.transfer_time * 1000).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsDashboardClient;

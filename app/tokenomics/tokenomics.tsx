"use client";

import React, { useEffect, useState } from "react";
import { Activity, DollarSign, Users } from "lucide-react";
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
import { iServ, secondaryAddress, storage, tracker } from "../../config/config";
import styles from "./dashboard.module.css";
import { ethers } from "ethers";

const TokenomicsDashboardClient = () => {
  const [totalSupply, setTotalSupply] = useState("0");
  const [transferEvents, setTransferEvents] = useState<any[]>([]);
  const [secondaryBalance, setSecondaryBalance] = useState("0");
  const [provider, setProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const chainId = "4002"; // Fantom Testnet
  const rpcUrl = "https://rpc.testnet.fantom.network"; // Fantom Testnet RPC URL
  const [isLoading, setIsLoading] = useState(true);
  const [isPreMintPhase, setIsPreMintPhase] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const initProvider = async () => {
      try {
        const fallbackProvider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );
        setProvider(fallbackProvider);
      } catch (error) {
        console.error("Error initializing provider:", error);
      }
    };

    initProvider();
  }, []);

  useEffect(() => {
    if (isClient && provider) {
      fetchData();
    }
  }, [isClient, provider]);

  useEffect(() => {
    const fetchData = async () => {
      if (!provider) return;
      setIsLoading(true);
      try {
        if (!iServ?.[chainId]) {
          console.error(
            "iServ contract address is undefined for chainId:",
            chainId
          );
          return;
        }

        const iServContract = new ethers.Contract(
          iServ[chainId],
          iServABI,
          provider
        );

        const totalSupplyBN = await iServContract.totalSupply();
        setTotalSupply(ethers.utils.formatUnits(totalSupplyBN, 18));
        const preMintPhase = await iServContract.preMintPhase();
        setIsPreMintPhase(preMintPhase);

        if (secondaryAddress?.[chainId]) {
          const secondaryBalanceBN = await iServContract.balanceOf(
            secondaryAddress[chainId]
          );
          setSecondaryBalance(ethers.utils.formatUnits(secondaryBalanceBN, 18));
        }
        if (!isClient) {
          return null;
        }
        const filter = iServContract.filters.Transfer();
        const logs = await iServContract.queryFilter(filter, -10000, "latest");
        setTransferEvents(logs.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [provider, chainId]);

  const transferData = transferEvents
    .map((event, index) => ({
      name: `Transfer ${transferEvents.length - index}`,
      amount:
        parseFloat(event.args?.amount ? event.args.amount.toString() : "0") /
        1e18,
    }))
    .slice(0, 10)
    .reverse();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>iServ Tokenomics Dashboard</h1>

      <Card className={styles.addressesCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Contract Addresses</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {[
            { name: "iServ", address: iServ?.[chainId] },
            { name: "Storage", address: storage?.[chainId] },
            { name: "Tracker", address: tracker?.[chainId] },
            { name: "Secondary Address", address: secondaryAddress?.[chainId] },
          ]
            .filter((contract) => contract.address)
            .map((contract, index) => (
              <div key={index} className={styles.addressItem}>
                <span className={styles.addressName}>{contract.name}:</span>
                <span className={styles.addressValue}>{contract.address}</span>
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
              OTC 1 Balance
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
        <h2 className={styles.sectionTitle}>Transfer Events</h2>
        <div className={styles.eventsGrid}>
          {transferEvents.map((event, index) => {
            const from = event.args?.from || "Unknown";
            const to = event.args?.to || "Unknown";
            const amount = event.args?.amount
              ? (parseFloat(event.args.amount.toString()) / 1e18).toString()
              : "0";

            return (
              <Alert key={`transfer-${index}`} className={styles.eventAlert}>
                <AlertTitle className={styles.alertTitle}>
                  Transfer Event
                </AlertTitle>
                <AlertDescription className={styles.alertDescription}>
                  From:{" "}
                  {from.length > 10
                    ? `${from.slice(0, 6)}...${from.slice(-4)}`
                    : from}
                  <br />
                  To:{" "}
                  {to.length > 10 ? `${to.slice(0, 6)}...${to.slice(-4)}` : to}
                  <br />
                  Amount: {amount} iServ
                  <br />
                  Block: {event.blockNumber || "Unknown"}
                </AlertDescription>
              </Alert>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsDashboardClient;
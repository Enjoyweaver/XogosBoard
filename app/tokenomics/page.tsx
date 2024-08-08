"use client";

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useContractEvent, useContractRead } from "wagmi";
import { Activity, DollarSign, Users, Zap } from "lucide-react";
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
import { TrackerABI } from "../../ABIs/Tracker";
import { iServABI } from "../../ABIs/iServ";
import {
  iPlay,
  iServ,
  secondaryAddress,
  storage,
  Tracker,
} from "../../config/config";
import styles from "./dashboard.module.css";

const TokenomicsDashboard = () => {
  const [totalSupply, setTotalSupply] = useState("0");
  const [transferEvents, setTransferEvents] = useState<any[]>([]);
  const [approvalEvents, setApprovalEvents] = useState<any[]>([]);
  const [tokenTransfers, setTokenTransfers] = useState<any[]>([]);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [gameInfo, setGameInfo] = useState<any>(null);
  const [developerInfo, setDeveloperInfo] = useState<any>(null);
  const [universityInfo, setUniversityInfo] = useState<any>(null);
  const [parentInfo, setParentInfo] = useState<any>(null);
  const [mintedInfo, setMintedInfo] = useState({ tokens: "0", days: "0" });
  const [historicalTransferEvents, setHistoricalTransferEvents] = useState<
    any[]
  >([]);
  const [historicalApprovalEvents, setHistoricalApprovalEvents] = useState<
    any[]
  >([]);
  const [historicalTokenTransfers, setHistoricalTokenTransfers] = useState<
    any[]
  >([]);

  const chainId = "4002"; // Fantom Testnet

  const contractAddresses = [
    { name: "iServ", address: iServ[chainId] },
    { name: "Storage", address: storage[chainId] },
    { name: "iPlay", address: iPlay[chainId] },
    { name: "Tracker", address: Tracker[chainId] },
    { name: "Secondary Address", address: secondaryAddress[chainId] },
  ];

  const { data: totalSupplyData } = useContractRead({
    address: iServ[chainId] as `0x${string}`,
    abi: iServABI,
    functionName: "totalSupply",
  });

  const { data: studentInfoData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "get_student_info",
    args: [1], // Example user_id
  });

  const { data: gameInfoData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "get_game_info",
    args: [1], // Example game_id
  });

  const { data: developerInfoData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "get_developer_info",
    args: [1], // Example developer_id
  });

  const { data: universityInfoData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "get_university_info",
  });

  const { data: parentInfoData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "get_parent_info",
    args: [1], // Example user_id
  });

  const { data: mintedTokensData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "minted_tokens",
  });

  const { data: mintedDaysData } = useContractRead({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    functionName: "minted_days",
  });

  useEffect(() => {
    if (totalSupplyData) {
      setTotalSupply(ethers.utils.formatEther(totalSupplyData));
    }
    if (studentInfoData) setStudentInfo(studentInfoData);
    if (gameInfoData) setGameInfo(gameInfoData);
    if (developerInfoData) setDeveloperInfo(developerInfoData);
    if (universityInfoData) setUniversityInfo(universityInfoData);
    if (parentInfoData) setParentInfo(parentInfoData);
    if (mintedTokensData && mintedDaysData) {
      setMintedInfo({
        tokens: mintedTokensData.toString(),
        days: mintedDaysData.toString(),
      });
    }
  }, [
    totalSupplyData,
    studentInfoData,
    gameInfoData,
    developerInfoData,
    universityInfoData,
    parentInfoData,
    mintedTokensData,
    mintedDaysData,
  ]);

  useContractEvent({
    address: iServ[chainId] as `0x${string}`,
    abi: iServABI,
    eventName: "Transfer",
    listener(log) {
      setTransferEvents((prev) => [log, ...prev].slice(0, 10));
    },
  });

  useContractEvent({
    address: iServ[chainId] as `0x${string}`,
    abi: iServABI,
    eventName: "Approval",
    listener(log) {
      setApprovalEvents((prev) => [log, ...prev].slice(0, 10));
    },
  });

  useContractEvent({
    address: Tracker[chainId] as `0x${string}`,
    abi: TrackerABI,
    eventName: "TokenTransfer" as any, // Temporary fix
    listener(log) {
      setTokenTransfers((prev) => [log, ...prev].slice(0, 10));
    },
  });

  const transferData = transferEvents
    .map((event, index) => ({
      name: `Transfer ${transferEvents.length - index}`,
      amount: parseFloat(ethers.utils.formatEther(event.args.amount)),
    }))
    .reverse();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>iServ Tokenomics Dashboard</h1>

      <Card className={styles.addressesCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Contract Addresses</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {contractAddresses.map((contract, index) => (
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
              <Zap className={styles.icon} />
              Approval Events
            </CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.statValue}>{approvalEvents.length}</div>
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
        <h2 className={styles.sectionTitle}>Historical Events</h2>
        <div className={styles.eventsGrid}>
          {historicalTransferEvents.map((event, index) => (
            <Alert
              key={`historical-transfer-${index}`}
              className={styles.eventAlert}
            >
              <AlertTitle className={styles.alertTitle}>
                Historical Transfer Event
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                From: {event.args.sender.slice(0, 6)}...
                {event.args.sender.slice(-4)}
                <br />
                To: {event.args.recipient.slice(0, 6)}...
                {event.args.recipient.slice(-4)}
                <br />
                Amount:{" "}
                {parseFloat(
                  ethers.utils.formatEther(event.args.amount)
                ).toFixed(2)}{" "}
                iServ
                <br />
                Block: {event.blockNumber}
              </AlertDescription>
            </Alert>
          ))}
          {historicalApprovalEvents.map((event, index) => (
            <Alert
              key={`historical-approval-${index}`}
              className={styles.eventAlert}
            >
              <AlertTitle className={styles.alertTitle}>
                Historical Approval Event
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                Owner: {event.args.owner.slice(0, 6)}...
                {event.args.owner.slice(-4)}
                <br />
                Spender: {event.args.spender.slice(0, 6)}...
                {event.args.spender.slice(-4)}
                <br />
                Amount:{" "}
                {parseFloat(
                  ethers.utils.formatEther(event.args.amount)
                ).toFixed(2)}{" "}
                iServ
                <br />
                Block: {event.blockNumber}
              </AlertDescription>
            </Alert>
          ))}
          {historicalTokenTransfers.map((event, index) => (
            <Alert
              key={`historical-token-transfer-${index}`}
              className={styles.eventAlert}
            >
              <AlertTitle className={styles.alertTitle}>
                Historical Token Transfer Event
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                Customer ID: {event.args.customerID.toString()}
                <br />
                Recipient: {event.args.recipient.slice(0, 6)}...
                {event.args.recipient.slice(-4)}
                <br />
                Amount:{" "}
                {parseFloat(
                  ethers.utils.formatEther(event.args.amount)
                ).toFixed(2)}{" "}
                iServ
                <br />
                Value at Time: {event.args.valueAtTime.toString()}
                <br />
                Department: {event.args.department.toString()}
                <br />
                Block: {event.blockNumber}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      <div className={styles.eventsSection}>
        <h2 className={styles.sectionTitle}>Recent Events</h2>
        <div className={styles.eventsGrid}>
          {transferEvents.map((event, index) => (
            <Alert key={`transfer-${index}`} className={styles.eventAlert}>
              <AlertTitle className={styles.alertTitle}>
                Transfer Event
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                From: {event.args.sender.slice(0, 6)}...
                {event.args.sender.slice(-4)}
                <br />
                To: {event.args.recipient.slice(0, 6)}...
                {event.args.recipient.slice(-4)}
                <br />
                Amount:{" "}
                {parseFloat(
                  ethers.utils.formatEther(event.args.amount)
                ).toFixed(2)}{" "}
                iServ
              </AlertDescription>
            </Alert>
          ))}
          {approvalEvents.map((event, index) => (
            <Alert key={`approval-${index}`} className={styles.eventAlert}>
              <AlertTitle className={styles.alertTitle}>
                Approval Event
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                Owner: {event.args.owner.slice(0, 6)}...
                {event.args.owner.slice(-4)}
                <br />
                Spender: {event.args.spender.slice(0, 6)}...
                {event.args.spender.slice(-4)}
                <br />
                Amount:{" "}
                {parseFloat(
                  ethers.utils.formatEther(event.args.amount)
                ).toFixed(2)}{" "}
                iServ
              </AlertDescription>
            </Alert>
          ))}
          {tokenTransfers.map((event, index) => (
            <Alert
              key={`token-transfer-${index}`}
              className={styles.eventAlert}
            >
              <AlertTitle className={styles.alertTitle}>
                Token Transfer Event
              </AlertTitle>
              <AlertDescription className={styles.alertDescription}>
                Customer ID: {event.args.customerID.toString()}
                <br />
                Recipient: {event.args.recipient.slice(0, 6)}...
                {event.args.recipient.slice(-4)}
                <br />
                Amount:{" "}
                {parseFloat(
                  ethers.utils.formatEther(event.args.amount)
                ).toFixed(2)}{" "}
                iServ
                <br />
                Value at Time: {event.args.valueAtTime.toString()}
                <br />
                Department: {event.args.department.toString()}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <div className={styles.infoGrid}>
          <Card className={styles.infoCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Student Info</CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {studentInfo && <pre>{JSON.stringify(studentInfo, null, 2)}</pre>}
            </CardContent>
          </Card>
          <Card className={styles.infoCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Game Info</CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {gameInfo && <pre>{JSON.stringify(gameInfo, null, 2)}</pre>}
            </CardContent>
          </Card>
          <Card className={styles.infoCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Developer Info</CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {developerInfo && (
                <pre>{JSON.stringify(developerInfo, null, 2)}</pre>
              )}
            </CardContent>
          </Card>
          <Card className={styles.infoCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>
                University Info
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {universityInfo && (
                <pre>{JSON.stringify(universityInfo, null, 2)}</pre>
              )}
            </CardContent>
          </Card>
          <Card className={styles.infoCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Parent Info</CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {parentInfo && <pre>{JSON.stringify(parentInfo, null, 2)}</pre>}
            </CardContent>
          </Card>
          <Card className={styles.infoCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Minted Info</CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              <p>Tokens: {mintedInfo.tokens}</p>
              <p>Days: {mintedInfo.days}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsDashboard;

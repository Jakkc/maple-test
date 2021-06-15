import React, { useState, useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { utils } from 'ethers'
import { Typography, Input, Button, Card, Space } from 'antd'

const { Title } = Typography;

const DisplayBalance: React.FC = () => {
  const { library, account } = useWeb3React<Web3Provider>()
  const [balance, setBalance] = useState<string>()
  const [walletAddress, setWalletAddress] = useState<string>()
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    if (!account) return
    setWalletAddress(account)
    setBalance(undefined)
  }, [account])

  const fetchBalance = useCallback(async (): Promise<any> => {
    if (!library || !walletAddress) return
    setLoading(true)
    const balance = await library.getBalance(walletAddress)
    setBalance(formatEther(balance))
    setLoading(false)
  }, [walletAddress, library])

  const isFetchButtonDisabled = useCallback((): boolean => {
    if (!walletAddress) return true
    return !utils.isAddress(walletAddress)
  }, [walletAddress])

  const getInputText = useCallback((): string => {
    if (loading) return '🚦🚦🚦'
    else if (balance) return `Ξ${balance}`
    else return '💰💰💰'
  }, [balance, loading])

  const useConnectedWallet = (): void => {
    setWalletAddress(account!)
    setBalance(undefined)
  }

  if (!account) return (
    <Card style={{ textAlign: 'center' }}>
      <Title level={2}>Please connect to your Ethereum wallet using Metamask</Title>
    </Card>
  )

  return (
    <Card style={{textAlign: "center"}}>
    <Space size='small' direction="vertical" style={{ width: "100%" }}>
        {!!balance && <Title level={4}>Your balance:</Title>}
        <Title>{getInputText()}</Title>
      <Input
        onChange={e => setWalletAddress(e.target.value)}
        value={walletAddress!}
        placeholder="Enter ethereum address"
      />
      <div>
        <Space size="small">
          <Button
            loading={loading}
            disabled={isFetchButtonDisabled()}
            onClick={fetchBalance}
          >Get Wallet Balance</Button>
          <Button
            disabled={!account || walletAddress === account}
            onClick={useConnectedWallet}
          >Use connected wallet</Button>
        </Space>
      </div>
    </Space>
  </Card>
  )
}

export default DisplayBalance
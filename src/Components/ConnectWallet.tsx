import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Typography, Row, Col, Button } from 'antd'

const { Text } = Typography;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
})
export const ConnectWallet: React.FC = () => {
  const { account, activate, active } = useWeb3React<Web3Provider>()

  const onClick = (): void => {
    activate(injectedConnector)
  }

  return (
    <Row justify="end">
      <Col flex='auto' xs={{ span: 12 }} />
      <Col flex='auto' xs={{ span: 12 }}>
      <div style={{ "textAlign": "right" }}>
        {active ? (
          <>
            <Text type="danger">
              Connected wallet:{' '}
            </Text>
            <Text
              type="danger"
              style={{ width: 100 }}
              ellipsis={{ tooltip: account }}>
                {account}
            </Text>
          </>
        ) : (
          <Button onClick={onClick}>
            Connect
          </Button>
        )}
        </div>
      </Col>
    </Row>
  )
}
import './App.css';
import 'antd/dist/antd.css';

import { Layout, Row, Col } from 'antd'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { ConnectWallet } from './Components/ConnectWallet'
import DisplayBalance from './Components/DisplayBalance'

const { Header, Content } = Layout;

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

const App: React.FC = () => {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout className="app-container">
        <Header>
          <ConnectWallet />
        </Header>
        <Content>
          <Row>
            <Col xs={{ span: 12 }} offset={6}>
              <DisplayBalance />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Web3ReactProvider>
  );
}

export default App;

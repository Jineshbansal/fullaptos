import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useState, useEffect } from "react";
import { Layout, Row, Col, Button,Spin } from "antd";
import TextBoxes from "./textboxes";


function App() {
  const { account, signAndSubmitTransaction } = useWallet();
  const provider = new Provider(Network.DEVNET);
  const moduleAddress =
    "b8580d98b2073063802bb1ee24342a857bf9591b19b459b86728e9c6cf7de932";
  const [accountHasList, setAccountHasList] = useState<boolean>(false);

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    try {
      const TodoListResource = await provider.getAccountResource(
        account.address,
        `${moduleAddress}::todolist::TodoList`
      );
      setAccountHasList(true);
    } catch (e: any) {
      setAccountHasList(false);
    }
  };

  const payload = {
    type: "entry_function_payload",
    function: `${moduleAddress}::todolist::create_list`,
    type_arguments: [],
    arguments: [],
  };
  
  useEffect(() => {
    fetchList();
  }, [account?.address]);
  return (
    <>
      <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
        <WalletSelector />
      </Col>
      <TextBoxes />
    </>
  );
}

export default App;

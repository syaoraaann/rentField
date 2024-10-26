import {
    Layout,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
  } from "antd";

  import { useState } from "react";  
  import { useNavigate } from "react-router-dom";
  
  const { Title } = Typography;
  
  const ListLapangan = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
  };
  
  export default ListLapangan;
  
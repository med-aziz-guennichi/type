import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import imgnewpass from "../images/new.PNG"
import {
  Button,
  Wrapper,
  Title,
  Input,
  Label,
  Card,
  Layout,
  Image,
  Contaire
} from "../styled-components/StyleChangePassword";
import { useNavigate, useParams } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { activation_token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("mot de passe incorrect");
      return;
    }
    try {
      await publicRequest
        .post("/update-password-verification", {
          activation_token,
          password,
          confirmPassword,
        })
        .then((res) => {
          toast.success("mot de passe changer avec succès !");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Contaire>
    <Card>
      <Wrapper>
        <Title>Changer le mot de passe!</Title>
        <Layout>
          <Label>Nouveau mot de passe :</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="newPassword"
          />
          <Label> Confirmer le nouveau mot de passe:</Label>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirmPassword"
          />
        </Layout>
        <Button onClick={handleSubmit} type="submit">
          Modifier le mot de passe
        </Button>
      </Wrapper>
    </Card>
    <Image src={imgnewpass}/>
    </Contaire>
  );
};

export default ChangePassword;

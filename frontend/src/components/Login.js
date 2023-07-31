import React, { useEffect, useState } from "react";
import {
  PopupContainer,
  PopupContent,
  PopupButton,
  CloseIcon,
  InputPopup,
  TitlePopup,
} from "../styled-components/StylePopup";
import {
  Button,
  Wrapper,
  Title,
  Input,
  Label,
  Card,
  Image,
  Layout,
  ForgotPassword,
  Imgdiv,
} from "../styled-components/StyleLogin";
import Logo from "../images/logo.png";
import BKg from "../images/illustration1.PNG";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import axios from "axios";
import { toast } from "react-toastify";
import { publicRequest } from "../requestMethod";

const Login = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      login(dispatch, { email, password });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      user && navigate("/adduser");
    }, 1000);
  }, [navigate, user]);

  const handleReqPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await publicRequest.post("/resetPassword", {
        email: reqEmail,
      });
      if (data) {
        toast.success("email envoí avec succès");
        console.log(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Card>
      <Imgdiv src={BKg} />
      <Wrapper>
        <Image src={Logo} />

        <Title>Connexion</Title>
        <Layout>
          <Label>Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Adresse e-mail"
          />
          <Label>Mot de passe</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Mot de passe"
          />
        </Layout>
        <Button onClick={handleSubmit}>Connexion</Button>
        <ForgotPassword onClick={handleOpen}>
          Mot de passe oublié
        </ForgotPassword>
        {isOpen && (
          <PopupContainer>
            <PopupContent>
              <CloseIcon isOpen={isOpen} onClick={handleClose} />
              <TitlePopup>Mot de passe oublié</TitlePopup>
              <form onSubmit={handleReqPassword}>
                <InputPopup
                  onChange={(e) => setReqEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Entrez votre email"
                />
                <PopupButton type="submit">envoyer</PopupButton>
              </form>
            </PopupContent>
          </PopupContainer>
        )}
      </Wrapper>
    </Card>
  );
};

export default Login;

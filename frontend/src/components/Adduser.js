import React, { useState } from "react";
import {
  Card,
  Container,
  Input,
  Button,
  Role,
  Label,
  Image,
  Title,
  Main,
  Logo,
  Navbar,
} from "../styled-components/Styleuser";
import Bkg from "../images/usefi.PNG";
import logo from "../images/logo.png";
import { publicRequest } from "../requestMethod";
import { toast } from "react-toastify";
function Adduser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/add-user", {
        firstName,
        lastName,
        email,
        role,
      });
      toast.success("utilisateur ajouté avec succès !");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <Container>
      <Card>
        <Title>Ajouter un nouvel utilisateur!</Title>
        <Label>Nom:</Label>
        <Input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Nom d'utilisateur"
        />
        <Label>Prénom:</Label>
        <Input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="prénom d'utilisateur"
        />
        <Label>Email:</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email d'utilisateur"
        />
        <Label>Role</Label>
        <Role onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="super-admin">super-admin</option>
          <option value="admin"> admin</option>
          <option value="expert"> expert</option>
          <option value="operator">operator </option>
        </Role>
        <Button onClick={handleSubmit}>Ajouter</Button>
      </Card>
      <Image src={Bkg} />
    </Container>
  );
}

export default Adduser;

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import "../../App.css";
import homepageImage from "../../media/homepage.png";
import logo from "../../media/logo.png";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const { signin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setAlert({ type: "error", message: "por favor preencha email e senha" });
      return;
    }

    try {
      const res = await signin(username, password);
      setAlert(res);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          "Ocorreu um erro na sua requisição tente novamente mais tarde!",
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <span className="title-text">Bem vindo ao mural digital!</span>
        <div className="App-content">
          <form onSubmit={handleSubmit}>
            <Snackbar
              open={!!alert?.type}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={() => setAlert({ type: "", message: "" })}
            >
              <Alert
                onClose={() => setAlert({ type: "", message: "" })}
                severity={alert?.type}
                sx={{ width: "100%" }}
              >
                {alert?.message || ""}
              </Alert>
            </Snackbar>
            <Card sx={{ width: "25rem", boxShadow: "3px 3px 6px #00000029" }}>
              <h4>Acesse ou crie uma conta</h4>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2rem",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ marginTop: 1, width: "25ch" }}
                  onChange={handleUsernameChange}
                  id="email"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  sx={{ marginTop: 1, width: "25ch" }}
                  onChange={handlePasswordChange}
                  id="password"
                  label="Senha"
                  type="password"
                  variant="outlined"
                />
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: 1, marginBottom: 2 }}
                  >
                    Entrar
                  </Button>
                </Box>
              </Box>
            </Card>
          </form>
        </div>
      </header>
      <div className="homepage">
        <img src={homepageImage} alt="imagem" className="homepage-image"></img>
      </div>
      <div className="logo">
        <img
          src={logo}
          className="10px"
          height="100px"
          width="100px"
          alt="imagem"
        ></img>
      </div>
    </div>
  );
}

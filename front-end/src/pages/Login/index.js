import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import "../../App.css";
import homepageImage from "../../media/homepage.png";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setAlert({ type: "error", message: "por favor preencha email e senha" });
      return;
    }

    axios
      .post("http://127.0.0.1:3001/login", {
        email: username,
        password,
      })
      .then((response) => {
        setAlert({ type: "success", message: "Login realizado com sucesso!" });
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((error) => {
        setAlert({ type: "error", message: error?.response?.data?.message });
      });
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
                  {/*   <Button variant="contained" sx={{ marginBottom: 2, marginTop: 1 }}>
              Cadastrar
            </Button> */}
                </Box>
              </Box>
            </Card>
          </form>
        </div>
      </header>
      <div className="homepage">
        <img src={homepageImage} alt="imagem" className="homepage-image"></img>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setHasError(true);
    }
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Snackbar
        open={hasError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => setHasError(false)}
      >
        <Alert
          onClose={() => setHasError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Por favor preencha o nome de usuário e senha.
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
            <Button variant="contained" type="submit" sx={{ marginTop: 1 }}>
              Entrar
            </Button>
            <Button variant="contained" sx={{ marginBottom: 2, marginTop: 1 }}>
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Card>
    </form>
  );
}

export default Login;

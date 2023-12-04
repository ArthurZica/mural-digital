import {
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import api from "../../axios-config";
import { useEffect, useState } from "react";

export default function CreateUsers({ user }) {
  const [turmas, setTurmas] = useState([]);
  const [usuarioTipo, setUsuarioTipo] = useState(1);
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getTurmas();
  }, []);

  const getTurmas = async () => {
    try {
      const response = await api.get(`${apiUrl}/turma`);
      if (response.data.length > 0) {
        setTurmas(response.data);
        return;
      }
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic for form submission
    const data = {
      nome,
      email,
      matricula: Number(matricula),
      senha: password,
      pessoa_tipo: usuarioTipo,
      fk_turma_idturma: selectedTurma,
    };
    try {
      const response = await api.post(`${apiUrl}/user`, data);
      if (response.status === 201) {
        alert("Usuario cadastrado com sucesso!");
        return;
      }
    } catch (error) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : "Erro ao cadatrar aviso!";
      console.error("Erro ao cadastrar usuario:", error);
      alert(message);
    }
  };

  return (
    <Card className="cardConfig">
      <h1>Cadastro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className="formUser">
          <InputLabel id="demo-simple-select-label">Turma</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTurma}
            label="Turma"
            onChange={(e) => setSelectedTurma(e.target.value)}
          >
            {turmas.map((turma) => (
              <MenuItem value={turma.idturma} key={turma.idturma}>
                {turma.serie} {turma.gruposerie}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="formUser">
          <TextField
            label="Nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className="formUser">
          <TextField
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className="formUser">
          <TextField
            label="Matricula"
            required
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className="formUser">
          <TextField
            label="Senha"
            required
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className="formUser">
          <InputLabel id="labelTipo">Tipo</InputLabel>
          <Select
            labelId="labelTipo"
            id="tipo"
            value={usuarioTipo}
            label="Tipo"
            onChange={(e) => setUsuarioTipo(e.target.value)}
          >
            <MenuItem value={0}>Administrador</MenuItem>
            <MenuItem value={1}>Aluno</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Cadastrar
        </Button>
      </form>
    </Card>
  );
}

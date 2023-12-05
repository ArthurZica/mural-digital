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

export default function CreateTurma() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [grupoSerie, setGrupoSerie] = useState("");
  const [serie, setSerie] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic for form submission
    const data = {
      gruposerie: grupoSerie,
      serie: serie,
    };
    try {
      const response = await api.post(`${apiUrl}/turma`, data);
      if (response.status === 201) {
        alert("Turma cadastrada com sucesso!");
        return;
      }
    } catch (error) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : "Erro ao cadatrar Turma!";
      console.error("Erro ao cadastrar Turma:", error);
      alert(message);
    }
  };

  return (
    <Card className="cardConfig">
      <h1>Cadastro de Turma</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className="formUser">
          <TextField
            label="Serie"
            required
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className="formUser">
          <TextField
            label="Turma"
            required
            value={grupoSerie}
            onChange={(e) => setGrupoSerie(e.target.value)}
          />
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Cadastrar
        </Button>
      </form>
    </Card>
  );
}

import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import api from "../../axios-config";
import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
export default function ConfigAlerts({ user }) {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startNow, setStartNow] = useState(true);
  const [priority, setPriority] = useState(false);
  registerLocale("ptBR", ptBR);
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
    const data = {
      titulo,
      texto,
      dtinicio: startDate ? startDate : new Date(),
      dtfim: endDate,
      fk_turma_idturma: selectedTurma !== 0 ? selectedTurma : null,
      prioridade: priority,
      recorrente: false,
      fk_pessoa_matricula: user.matricula,
    };
    try {
      const response = await api.post(`${apiUrl}/aviso`, data);
      if (response.status === 201) {
        alert("Aviso cadastrado com sucesso!");
        return;
      }
    } catch (error) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : "Erro ao cadatrar aviso!";
      alert(message);
      return;
    }
  };
  return (
    <Card className="cardConfig">
      <h1>Cadastro de avisos</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className="form">
          <InputLabel id="demo-simple-select-label">Turma</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTurma}
            label="Turma"
            onChange={(e) => setSelectedTurma(e.target.value)}
          >
            <MenuItem value={0}>Todas</MenuItem>
            {turmas.map((turma) => (
              <MenuItem value={turma.idturma}>
                {turma.serie}
                {turma.gruposerie}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Titulo"
            onChange={(e) => setTitulo(e.target.value)}
            required
          ></TextField>
          <TextareaAutosize
            onChange={(e) => setTexto(e.target.value)}
            className="textArea"
            placeholder="Texto do aviso"
            required
          ></TextareaAutosize>
          <div className="formOtherProps">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              value={startNow}
              onChange={(e) => setStartNow(e.target.checked)}
              label="Deseja que o aviso seja exibido agora?"
              labelPlacement="start"
            />
            {!startNow && (
              <>
                <label>Data de Inicio</label>
                <DatePicker
                  locale="ptBR"
                  dateFormat="Pp"
                  showTimeSelect
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </>
            )}
            <label>Data de Fim</label>
            <DatePicker
              locale="ptBR"
              dateFormat="Pp"
              showTimeSelect
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <FormControlLabel
              control={<Checkbox />}
              value={priority}
              onChange={(e) => setPriority(e.target.checked)}
              label="O aviso é prioritário?"
              labelPlacement="start"
            />
          </div>
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
        </FormControl>
      </form>
    </Card>
  );
}

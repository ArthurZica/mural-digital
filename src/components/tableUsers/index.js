import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../axios-config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function TableUsers() {
  const [turmas, setTurmas] = useState([]);
  const [allUsuarios, setAllUsuarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filterTurma, setFilterTurma] = useState(0);
  const [rows, setRows] = useState([]);
  const apiUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    getUsuarios();
  }, []);

  const getTurmas = async () => {
    try {
      const response = await api.get(`${apiUrl}/turma`);
      console.log(response.data);
      if (response.data.length > 0) {
        return response.data;
      }
      return [response.data];
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  const getUsuarios = async () => {
    try {
      // Aguarde a conclusão da consulta de turmas
      const newTurmas = await getTurmas();
      if (newTurmas) {
        setTurmas(newTurmas);
      }

      const response = await api.get(`${apiUrl}/user`);
      console.log(response.data);

      if (response.data.length > 0) {
        const usuariosComTurma = response.data.map((user) => ({
          ...user,
          turma: newTurmas.find(
            (turma) => turma.idturma === user?.fk_turma_idturma
          ),
        }));
        setAllUsuarios(usuariosComTurma);
        return;
      }

      const user = {
        ...response.data,
        turma: newTurmas.find(
          (turma) => turma.idturma === response.data?.fk_turma_idturma
        ),
      };
      setAllUsuarios([user]);
      return;
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  useEffect(() => {
    if (filterTurma === 0) {
      setUsuarios(allUsuarios);
    } else {
      const filtrados = allUsuarios.filter(
        (user) => user?.turma?.idturma === filterTurma
      );
      setUsuarios(filtrados);
    }
  }, [filterTurma, allUsuarios]);

  return (
    <div className="cardConfig">
      <h1>Usuarios</h1>
      <div className="filterTurma">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Turmas</InputLabel>
          <Select
            key={filterTurma} // Add this key prop
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Turmas"
            value={filterTurma}
            onChange={(e) => setFilterTurma(e.target.value)}
          >
            <MenuItem value={0}>Todas</MenuItem>
            {turmas.length > 0 &&
              turmas.map((turma) => (
                <MenuItem key={turma.idturma} value={turma.idturma}>
                  {turma.serie}
                  {turma.gruposerie}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper} sx={{ maxWidth: "100%", marginTop: 5 }}>
        <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Matricula</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Tipo de Usuario</TableCell>
              <TableCell align="right">Turma</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((user) => (
              <TableRow
                key={user.matricula}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.nome}
                </TableCell>
                <TableCell align="right">{user.matricula}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  {user.pessoa_tipo == 1 ? "Aluno" : "Administrador"}
                </TableCell>
                <TableCell align="right">
                  {user?.turma?.serie
                    ? user?.turma?.serie + user?.turma?.gruposerie
                    : "Sem turma"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

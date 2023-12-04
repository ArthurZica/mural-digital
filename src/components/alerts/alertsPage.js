import React, { useEffect, useState } from "react";
import AlertCard from "./alerts";
import api from "../../axios-config";
import { FormControl, InputLabel, Select } from "@mui/material";
import { MenuItem as Item } from "@mui/material";

import { MenuItem } from "react-pro-sidebar";

const AlertsPage = ({ user }) => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [avisos, setAvisos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [filterTurma, setFilterTurma] = useState(0);

  useEffect(() => {
    getAvisos();
    getTurmas();
  }, []);

  useEffect(() => {
    if (filterTurma === 0) {
      getAvisos();
    } else {
      getAvisoById();
    }
  }, [filterTurma]);

  const getAvisos = async () => {
    try {
      const response = await api.get(`${apiUrl}/aviso`);
      const avisos = response.data.retorno;
      const sortedAvisos = avisos.sort((a, b) => {
        // First, sort by priority (true comes first)
        if (a.prioridade && !b.prioridade) {
          return -1;
        } else if (!a.prioridade && b.prioridade) {
          return 1;
        }
        // If priority is the same, sort by date
        return new Date(b.dtinicio) - new Date(a.dtinicio);
      });
      setAvisos(sortedAvisos);
    } catch (error) {
      console.error("Erro ao carregar avisos:", error);
    }
  };

  const getAvisoById = async () => {
    try {
      const response = await api.get(`${apiUrl}/aviso/turma?id=${filterTurma}`);
      const sortedAvisos = avisos.sort((a, b) => {
        // First, sort by priority (true comes first)
        if (a.prioridade && !b.prioridade) {
          return -1;
        } else if (!a.prioridade && b.prioridade) {
          return 1;
        }
        // If priority is the same, sort by date
        return new Date(b.dtinicio) - new Date(a.dtinicio);
      });
      setAvisos(sortedAvisos);
    } catch (error) {
      setAvisos([]);
      console.error("Erro ao carregar avisos:", error);
    }
  };

  const getTurmas = async () => {
    try {
      const response = await api.get(`${apiUrl}/turma`);
      console.log(response.data);
      if (response.data.length > 0) {
        setTurmas(response.data);
        return;
      }
      setTurmas([response.data]);
      return;
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  useEffect(() => {
    console.log(turmas);
  }, [turmas]);

  return (
    <div className="alerts">
      <h1>Olá {user.nome}!</h1>
      <div className="headerAlerts">
        <h4>Aqui estão seus avisos:</h4>
        {turmas.length > 0 && (
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
                <Item value={0}>Todas</Item>
                {turmas.length > 0 &&
                  turmas.map((turma) => (
                    <Item key={turma.idturma} value={turma.idturma}>
                      {turma.serie}
                      {turma.gruposerie}
                    </Item>
                  ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
      {avisos.length > 0 ? (
        <div className="avisosContainer">
          {avisos.map((aviso) => (
            <AlertCard key={aviso.id} aviso={aviso} />
          ))}
        </div>
      ) : (
        <p>Nenhum aviso disponível no momento.</p>
      )}
    </div>
  );
};

export default AlertsPage;

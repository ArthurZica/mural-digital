import { Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import "./style.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
  SubMenu,
} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import AlertsPage from "../../components/alerts/alertsPage";
import { useEffect, useState } from "react";
import ConfigAlerts from "../../components/configAlerts";
import CreateUsers from "../../components/createUsers";
import TableUsers from "../../components/tableUsers";
import CreateTurma from "../../components/class";

export default function Home() {
  const { user, signout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [page, setPage] = useState("alerts");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Adiciona um ouvinte de evento de redimensionamento
    window.addEventListener("resize", handleResize);

    // Remove o ouvinte de evento ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Apenas executa o efeito na montagem do componente

  const collapsedWidth = windowWidth > 604 ? "4vw" : "15vw";

  function handlePageChange(page) {
    setIsCollapsed(true);
    setPage(page);
  }

  return (
    <div className="container">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            minHeight: "100vh",
            backgroundColor: "#d7e8ff",
          },
        }}
        collapsed={isCollapsed}
        collapsedWidth={collapsedWidth}
      >
        <Menu>
          <Button onClick={toggleSidebar}>
            <MenuIcon />
          </Button>
          {!isCollapsed && (
            <>
              <MenuItem onClick={() => handlePageChange("alerts")}>
                Avisos
              </MenuItem>
              {user?.pessoa_tipo === 0 && (
                <SubMenu label="Administração">
                  <MenuItem onClick={() => handlePageChange("configAlerts")}>
                    Configurar Avisos
                  </MenuItem>
                  <MenuItem onClick={() => handlePageChange("configUsers")}>
                    Cadastrar Usuarios
                  </MenuItem>
                  <MenuItem onClick={() => handlePageChange("viewUsers")}>
                    Usuarios Cadastrados
                  </MenuItem>
                  <MenuItem onClick={() => handlePageChange("configClass")}>
                    Turmas
                  </MenuItem>
                </SubMenu>
              )}
              <MenuItem onClick={signout}>Sair</MenuItem>
            </>
          )}
        </Menu>
      </Sidebar>
      <div className="content">
        <div className="page">
          {page === "alerts" && <AlertsPage className="alerts" user={user} />}
          {page === "configAlerts" && (
            <ConfigAlerts className="alerts" user={user} />
          )}
          {page === "configUsers" && (
            <CreateUsers className="alerts" user={user} />
          )}
          {page === "viewUsers" && (
            <TableUsers className="alerts" user={user} />
          )}
          {page === "configClass" && <CreateTurma className="alerts" />}
        </div>
      </div>
    </div>
  );
}

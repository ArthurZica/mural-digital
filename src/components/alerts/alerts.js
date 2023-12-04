import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

export default function AlertCard({ aviso }) {
  return (
    <>
      {aviso.prioridade && (
        <Badge color="primary" badgeContent=" " size="large">
          <Card sx={{ width: 345, height: 140 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {aviso.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {aviso.texto}
              </Typography>
              {/*  <Typography variant="body2" color="text.secondary">
                Data Inicio:
                {format(new Date(aviso.dtinicio), "dd/MM/yyyy HH:mm:ss")}
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                Data Final:
                {format(new Date(aviso.dtfim), "dd/MM/yyyy HH:mm:ss")}
              </Typography>
            </CardContent>
          </Card>
        </Badge>
      )}
      {aviso.prioridade !== true && (
        <Card sx={{ width: 345, height: 140 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {aviso.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {aviso.texto}
            </Typography>
            {/*   <Typography variant="body2" color="text.secondary">
              Data Inicio:
              {format(new Date(aviso.dtinicio), "dd/MM/yyyy HH:mm:ss")}
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              Data Final:
              {format(new Date(aviso.dtfim), "dd/MM/yyyy HH:mm:ss")}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}

import Login from "./components/login";
import "./App.css";
import { Card, Typography } from "@mui/material";
import homepageImage from './media/homepage.png';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="title-text">Bem vindo ao mural digital!</span>
        <div className="App-content">
        <Login></Login>
      </div>
      </header>
      <div className="homepage">
        <img src={homepageImage} alt="imagem" className="homepage-image"></img>
      </div>
    </div>
  );
}

export default App;

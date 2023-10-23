import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './login.css'
import { Box, Button, TextField } from '@mui/material';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{width: '25rem', boxShadow: '3px 3px 6px #00000029'}}>
                <form>
                <h4>Acesse ou crie uma conta</h4>
                <Box sx={{display: 'flex',flexDirection: 'column',marginTop: '2rem',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <TextField sx={{ marginTop: 1, width: '25ch' }} id="email" label="Email" variant="outlined" />
                    <TextField sx={{ marginTop: 1, width: '25ch' }} id="password" label="Senha" variant="outlined" />
                    <Box style={{display: 'flex',flexDirection: 'column',maxWidth: '100%'}}>
                       <Button variant='contained' sx={{marginTop:1}}>Entrar</Button>
                       <Button variant='contained' sx={{marginBottom:2,marginTop:1}}>Cadastrar</Button>
                    </Box>
                </Box>
               </form>

            </Card>
        </form>
    );
}

export default Login;

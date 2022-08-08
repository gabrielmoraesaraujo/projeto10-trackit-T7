import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";

import logo from "../assets/img/logo.png"
import { useState } from "react";


export default function Login(){
    const navigate = useNavigate();
    const { token, setToken, usuarioLogado, setUsuarioLogado } = useContext(TokenContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    function loginSucesso(resposta){
        console.log(resposta);
        setToken(resposta.data.token);
        setUsuarioLogado(resposta.data);
        //alert("Login efetuado com sucesso!");
        navigate("/hoje");
    }

    function validaInformacoes(){
        if(email !== "" && senha !== "") return true;
    }

    function logarUsuario(){
        if(validaInformacoes()){
            
            const usuario = {
                email: email,
                password: senha
            }

            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", usuario)
            .then(resposta => loginSucesso(resposta))
            .catch(
                resposta => {
                    console.log(resposta);
                    if(resposta.response.status === 409){
                        alert(resposta.response.data.message);
                    }
                    else if(resposta.response.status === 422){
                        let error = "";
                        for(let i=0;i<resposta.response.data.details.length;i++){ error = error + resposta.response.data.details[i] + "\n" }
                        alert(error);
                    }else{
                        alert(resposta.response.data.message);
                    }
                }
            );

        }else{
            alert("Preencha os campos corretamente!");
        }
    }

    return(

        <TelaLogin>
            <img src={logo} alt="TrackIt" />
            <input value={email}  onChange={e => setEmail(e.target.value)} placeholder="email" />
            <input value={senha}  onChange={e => setSenha(e.target.value)} placeholder="senha" type="password" />
            <ButtonEntrar onClick={logarUsuario}>Entrar</ButtonEntrar>
            <LinkCadastro onClick={() => {navigate("/cadastro")}}>Não tem uma conta? Cadastre-se!</LinkCadastro>
        </TelaLogin>

    );
}


const TelaLogin = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        width:85%;
        height: 8%;
        margin-top: 1%;
        margin-bottom: 1%;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
    img{
        width: 60%;
        margin-top: 15%;
        margin-bottom: 10%;
    }
`

const ButtonEntrar = styled.div`
    width:85%;
    height: 8%;
    background-color: #52B6FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
`

const LinkCadastro = styled.div`
    margin-top: 5%;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line:underline;
    color: #52B6FF;
`
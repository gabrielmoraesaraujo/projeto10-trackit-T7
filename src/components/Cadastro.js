import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo from "../assets/img/logo.png"


export default function Cadastro(){
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [foto, setFoto] = useState("");

    function cadastroSucesso(resposta){
        console.log(resposta);
        alert("Cadastro com sucesso!");
        navigate("/");
    }

    function validaInformacoes(){
        if (email !== null && senha !== null && nome !== null && foto !== null ) return true
    }

    function cadastrarUsuario(){
        if(validaInformacoes()) {
            const usuario = {
                email: email,
                name: nome,
                image: foto,
                password: senha
            }

            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", usuario)
            .then(resposta => cadastroSucesso(resposta))
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
        <TelaCadastro>
            <img src={logo} alt="TrackIt" />
            <input value={email}  onChange={e => setEmail(e.target.value)} placeholder="email" type="email" name="" id="" />
            <input value={senha}  onChange={e => setSenha(e.target.value)} placeholder="senha" type="password" />
            <input value={nome}  onChange={e => setNome(e.target.value)} placeholder="nome"  />
            <input value={foto}  onChange={e => setFoto(e.target.value)} placeholder="foto" />
            <ButtonCadastrar onClick={cadastrarUsuario} >Cadastrar</ButtonCadastrar>
            <LinkEntrar onClick={() => {navigate("/")}}>Já tem uma conta? Faça login!</LinkEntrar>
        </TelaCadastro>
    );
}

const TelaCadastro = styled.div`
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

const ButtonCadastrar = styled.div`
    width:85%;
    height: 8%;
    background-color: #52B6FF;
    margin-top: 2%;
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

const LinkEntrar = styled.div`
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
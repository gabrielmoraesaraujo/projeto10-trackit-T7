import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import Header from "./Header";
import Footer from "./Footer";
import lixo from "../assets/img/Vector.png"


function AdicionaHabito({setAdicionarHabito, salvaNovoHabito, setHabitos}){

    

    const [dias, setDias] = useState([]);
    const [nomeHabito, setNomeHabito] = useState("");


    function adicionaDia (dia){
        if(dias.includes(dia)){
            console.log("retira");
            const index = dias.indexOf(dia);
            if (index > -1) {
                dias.splice(index, 1);
                setDias([...dias]);
              }
        }else{
            setDias([...dias, dia]);
        }
    }

    function mandaSalvarNovoHabito(){

        if(dias.length > 0 && nomeHabito !== ""){
            salvaNovoHabito(dias, nomeHabito);
            setAdicionarHabito(false);
            setDias([]);
            setNomeHabito("");
        }else{
            alert("Preencha os dados!");
        }

    }

    function cancelar(){
       setAdicionarHabito(false);
    }

    return(
        <NovoHabitoContainer>
        <input value={nomeHabito} onChange={e => setNomeHabito(e.target.value)} placeholder={{nomeHabito} ? "Nome do hábito" : {nomeHabito}} type="text" />
        <DiasSemana>
            <DiaSemana cor={dias.includes(0) ? "#CFCFCF" : "white"} onClick={() => adicionaDia(0)}>D</DiaSemana>
            <DiaSemana cor={dias.includes(1) ? "#CFCFCF" : "white"}  onClick={() => adicionaDia(1)}>S</DiaSemana>
            <DiaSemana cor={dias.includes(2) ? "#CFCFCF" : "white"}  onClick={() => adicionaDia(2)}>T</DiaSemana>
            <DiaSemana cor={dias.includes(3) ? "#CFCFCF" : "white"}  onClick={() => adicionaDia(3)}>Q</DiaSemana>
            <DiaSemana cor={dias.includes(4) ? "#CFCFCF" : "white"}  onClick={() => adicionaDia(4)}>Q</DiaSemana>
            <DiaSemana cor={dias.includes(5) ? "#CFCFCF" : "white"}  onClick={() => adicionaDia(5)}>S</DiaSemana>
            <DiaSemana cor={dias.includes(6) ? "#CFCFCF" : "white"}  onClick={() => adicionaDia(6)}>S</DiaSemana>
        </DiasSemana>
        <Botoes>
            <BtnCancelar onClick={cancelar}>Cancelar</BtnCancelar>
            <BtnSalvar onClick={mandaSalvarNovoHabito}>Salvar</BtnSalvar>
        </Botoes>
        </NovoHabitoContainer>
    );
}

function Habito({habitod, index, excluirHabito}){

    

    console.log("habitod: " );
    console.log(habitod);
    
    
    console.log("tipo: " + habitod.days);

    function mandarExcluirHabito(e){
        excluirHabito(index);
    }
    
  
    return(
        <HabitoContainer>
            {habitod.name}
            <img src={lixo} onClick={mandarExcluirHabito}/>

            {typeof habitod.days !== "undefined" ? 
            <DiasSemana>
                <DiaSemana cor={habitod.days.includes(0) ? "#CFCFCF" : "white"} texto={habitod.days.includes(0) ? "white" : "#CFCFCF"}>D</DiaSemana>
                <DiaSemana texto={habitod.days.includes(1) ? "white" : "#CFCFCF"} cor={habitod.days.includes(1) ? "#CFCFCF" : "white"}>S</DiaSemana>
                <DiaSemana texto={habitod.days.includes(2) ? "white" : "#CFCFCF"} cor={habitod.days.includes(2) ? "#CFCFCF" : "white"}>T</DiaSemana>
                <DiaSemana texto={habitod.days.includes(3) ? "white" : "#CFCFCF"} cor={habitod.days.includes(3) ? "#CFCFCF" : "white"}>Q</DiaSemana>
                <DiaSemana texto={habitod.days.includes(4) ? "white" : "#CFCFCF"} cor={habitod.days.includes(4) ? "#CFCFCF" : "white"}>Q</DiaSemana>
                <DiaSemana texto={habitod.days.includes(5) ? "white" : "#CFCFCF"} cor={habitod.days.includes(5) ? "#CFCFCF" : "white"}>S</DiaSemana>
                <DiaSemana texto={habitod.days.includes(6) ? "white" : "#CFCFCF"} cor={habitod.days.includes(6) ? "#CFCFCF" : "white"}>S</DiaSemana>
            </DiasSemana>
            :
            <></>
            }

        </HabitoContainer>
    );

}

function ListaHabitos({habitos, setHabitos}){

    const { token, setToken, usuarioLogado, setUsuarioLogado } = useContext(TokenContext);
    
    console.log(habitos);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }


    
    useEffect(() => {
        
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, 
        config);

        promise.then((resposta) => {
            setHabitos([...resposta.data]);
            console.log("resposta habitos: " );
            console.log(resposta.data);
        });

    }, []);

    function excluirHabito(indexHabito){
        const excluirElemento = habitos[indexHabito];
        console.log("Excluir: ")
        console.log(excluirElemento);

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${excluirElemento.id}`, config);

        promise.then(resposta => {
            console.log("Habito excluido com sucesso");
            const habitosAtualizados = habitos.filter(habito => habito !== excluirElemento);
            setHabitos([...habitosAtualizados]);
        });

        promise.catch(resposta => {
            console.log("Ocorreu algum erro inesperado.");
        });
    }

    return(

        <ListaHabitosLayout>

            {habitos.length > 0 ? habitos.map((habito, index) => <Habito habitod={habito} index={index} excluirHabito={excluirHabito}/>) : "" }

            {habitos.length > 0 ? <Espaco></Espaco> : ""}
            
            

        </ListaHabitosLayout>

    )

}

export default function Habitos(){

    const { token, setToken, usuarioLogado, setUsuarioLogado, porcentagemConcluidos } = useContext(TokenContext);
    const [adicionarHabito, setAdicionarHabito] = useState(false);
    const [habitos, setHabitos] = useState([{}]);

    function salvaNovoHabito(dias, nomeHabito){
        console.log(dias, nomeHabito);
        console.log(token);

        const body = {
            name: nomeHabito,
            days: dias
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            body,
            config
        ).then(
            resposta => {console.log("Habito criado com sucesso"); console.log(resposta.data)
            setHabitos([...habitos, resposta.data]);
        }
        ).catch(
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

    }


    return(
        <>
        <Header/>
        <HabitosLayout>
            <Topo>
                <h1>Meus habitos</h1><BtnAdicionarHabito onClick={() => {setAdicionarHabito(true)}}>+</BtnAdicionarHabito>
            </Topo>

            {adicionarHabito ? <AdicionaHabito setAdicionarHabito={setAdicionarHabito} salvaNovoHabito={salvaNovoHabito} setHabitos={setHabitos}/> : <></>}

            <ListaHabitos habitos={habitos} setHabitos={setHabitos}/>

            {habitos.length < 1 ? <p>Você ainda não tem nenhum hábito</p> : "" }
        </HabitosLayout>
        <Footer porcentagemConcluidos={porcentagemConcluidos}/>
        </>
    );
}

const ListaHabitosLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const HabitoContainer = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    background: #FFFFFF;
    border-radius: 5px;
    img{
        width: 15px;
        height: 15px;
        margin: 10px 10px;
        
        top: 0;
        right: 0;
        position: absolute;
    }
`

const HabitosLayout = styled.div`
    width:100%;
    height: 100%;
    margin-top: 10%;
    padding: 10% 5%;
    background-color: #E5E5E5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    p{
        margin-top: 40px;
    }
`

const BtnAdicionarHabito = styled.div`
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 26.976px;
    line-height: 34px;
    /* identical to box height */
    text-align: center;
    color: #FFFFFF;
    border-radius: 4.63636px;
`


const Topo = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    /* identical to box height */
    color: #126BA5;
    }
`

const NovoHabitoContainer = styled.div`
    width: 100%;
    height: 25%;
    padding: 10px 10px;
    background-color: white;
    border-radius: 5px;
    input{
        width: 100%;
        height: 45px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        /* identical to box height */
color: #DBDBDB;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
`
const DiasSemana = styled.div`
    margin-top: 5px;
    display: flex;
`

const DiaSemana = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color:  ${props => props.texto};
    background: ${props => props.cor};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
`


const Botoes = styled.div`
    width: 100%;
    display: flex;
    justify-content: end; 
`

const BtnSalvar = styled.div`
    width: 84px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    /* identical to box height */
    text-align: center;
    color: #FFFFFF;
`

const BtnCancelar = styled.div`
    width: 84px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    /* identical to box height */
    text-align: center;
    color: #52B6FF;
`

const Espaco = styled.div`
    width: 100%;
    height: 120px;
`
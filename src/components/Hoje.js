import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

import TokenContext from "../contexts/TokenContext";
import Header from "./Header";
import Footer from "./Footer";

function HabitoHoje({habito, index, marcarConcluido, desmarcarConcluido}){

    const [color, setColor] = useState("#666666");

    function mandaMarcarConcluido(){
        //console.log(habito.done);        
        if(habito.done){
            desmarcarConcluido(index);
            setColor("666666");
        }else{
            marcarConcluido(index);
            setColor("green");
        }
    }

    return(
    <HabitoContainer>
        <Esquerda>
            <h2>{habito.name}</h2>
            <div>
                <SequenciaAtual cor={habito.currentSequence === habito.highestSequence? "green" : {color}}>Sequência atual: <span>{habito.currentSequence} dias</span></SequenciaAtual>
                <SeuRecorde cor={habito.currentSequence === habito.highestSequence? "green" : "#666666"}>Seu recorde: <span>{habito.highestSequence} dias </span></SeuRecorde>
            </div>
        </Esquerda>
        <Direita>
            <Concluido onClick={mandaMarcarConcluido} cor={habito.done ? "#8FC549" : "#E7E7E7"}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </Concluido>
        </Direita>
    </HabitoContainer>
    );
}

function DiaSemana(){
    const semana =  ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    const mes = ["01", "02", "03","04","05","06","07","08","09","10","11","12"];

    const diaSemana = new Date();
    const dia = dayjs().date();
    const diaMes = dayjs().month();

    return(
        <>{semana[diaSemana.getDay()]}, {dia}/{mes[diaMes]}</>
    )
}

function PorcentagemHabitos({porcentagem}){

    const percent = Math.floor(porcentagem());

    if(percent > 0){
        return(
            <p style={{color: "#8FC549"}}>{percent}% dos hábitos concluídos hoje</p>
        )
    }else{
        return(
            <p>Nenhum hábito concluído hoje</p>
        )
    }
    
}

export default function Hoje(){

    const { token, setToken, usuarioLogado, setUsuarioLogado, porcentagemConcluidos, setPorcentagemConcluidos } = useContext(TokenContext);
    const [habitosHoje, setHabitosHoje] = useState([{}]);
    

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function porcentagem(){
        const habitosConcluidos = habitosHoje.filter(habito => habito.done === true);
        const p = Number((habitosConcluidos.length / habitosHoje.length)*100);

        setPorcentagemConcluidos(p);
        return p;
    }

    function atualizaHabitosHoje(){
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, 
        config);

        promise.then((resposta) => {
            console.log("resposta habitos hoje: " );
            console.log(resposta.data);
            setHabitosHoje([...resposta.data]);
            
        });

        promise.catch((resposta) => {alert("Problema ao obter habitos.")});

    }

    useEffect(() => {
        atualizaHabitosHoje();
        porcentagem();
    }, []);

    function marcarConcluido(indexHabito){

        const concluirHabito = habitosHoje[indexHabito];
        const concluirHabitoId = concluirHabito.id;

        console.log(concluirHabitoId);

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${concluirHabitoId}/check`,  null,
        config);

        promise.then(resposta => {
            console.log("Habito concluído com sucesso.");
            atualizaHabitosHoje();
        })

    }


    function desmarcarConcluido(indexHabito){

        const desmarcarHabito = habitosHoje[indexHabito];
        const desmarcarHabitoID = desmarcarHabito.id;

        console.log(desmarcarHabito);

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${desmarcarHabitoID}/uncheck`, null,
        config);

        promise.then(resposta => {
            console.log("Habito desmarcado com sucesso.");
            atualizaHabitosHoje();
        });

       
        promise.catch(resposta => {
            console.log("Ocorreu algum erro inesperado.");
            console.log(resposta.data);
        });
    }

   

    return(
        <>
        <Header />
        <HojeLayout>
            <h1><DiaSemana/></h1>
            <p><PorcentagemHabitos porcentagem={porcentagem}/></p>

            <ListaHabitos>

                {habitosHoje.map((habito, index) => <HabitoHoje habito={habito} index={index} marcarConcluido={marcarConcluido} desmarcarConcluido={desmarcarConcluido}/>)}


            </ListaHabitos>


           
        </HojeLayout>
         <Footer porcentagemConcluidos={porcentagemConcluidos}/>
        </>
    );

}

const HojeLayout = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 25%;
    padding: 0 10px;
    
    background-color: #E5E5E5;
    h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5 !important;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
    }
`

const SequenciaAtual = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    
    span{
        color: ${props => props.cor};
    }
`

const SeuRecorde = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    span{
        color: ${props => props.cor};
    }
`


const HabitoContainer = styled.div`
    width: 100%;
    height: 90px;
    padding: 10px 10px;
    margin-top: 10px;
    
    display: flex;
    background-color: white;
    border-radius: 5px;
    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        /* identical to box height */
        color: #666666;
    }
`

const ListaHabitos = styled.div`
    margin-top: 30px;
`

const Esquerda = styled.div`
    width: 70%;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }
    div{
        margin-top: 5px;
    }
`

const Direita = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    ion-icon{
        font-size: 50px;
        color: white;
    }
`

const Concluido = styled.div`
    width: 60%;
    height: 85%;
    background: ${props => props.cor};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`
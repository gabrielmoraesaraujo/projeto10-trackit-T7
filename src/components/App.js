import {BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "../contexts/TokenContext";


import Login from "./Login";
import Cadastro from "./Cadastro";
import Hoje from "./Hoje";
import Historico from "./Historico";
import Habitos from "./Habitos";

export default function App(){

    const [token, setToken] = useState("");
    const [usuarioLogado, setUsuarioLogado] = useState("");
    const [porcentagemConcluidos, setPorcentagemConcluidos] = useState(0); 
    

        
    return(
        <BrowserRouter>
        <TokenContext.Provider value={{token, setToken, usuarioLogado, setUsuarioLogado, porcentagemConcluidos, setPorcentagemConcluidos}}>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/cadastro" element={<Cadastro/>}></Route>
                <Route path="/historico" element={<Historico />}></Route>
                <Route path="/habitos" element={<Habitos />}></Route>
                <Route path="/hoje" element={<Hoje />}></Route>
            </Routes>
        </TokenContext.Provider>
        </BrowserRouter>
    );
}
import styled from "styled-components";
import trackIt from "../assets/img/TrackIt.png"
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";

export default function Header(){
    const { token, setToken, usuarioLogado, setUsuarioLogado } = useContext(TokenContext);


    return(
        <HeaderLayout>
            <LogoHeader><img src={trackIt} alt="trackIt" /></LogoHeader>
            <ImgPerfil><img src={usuarioLogado.image} /></ImgPerfil>
        </HeaderLayout>
    );
}

const HeaderLayout = styled.div`
    width: 100%;
    height: 10%;
    padding: 0 3%;
    top: 0;
    left: 0;
    position: fixed; 
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`

const LogoHeader = styled.div`
    img{
        max-width: 100%;
        max-height: 100%;  
    }
`

const ImgPerfil = styled.div`
    width: 10%;
    height: 60%;
    img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
`
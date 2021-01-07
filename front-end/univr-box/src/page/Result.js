import React , {useState, useEffect}from 'react';
import styled from "styled-components";
import { useLocation,useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import constants from '../lib/constants';
import nicknamebg from '../asset/nicknamebg.png';

function Result({match}){
    let id = match.params.id;
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    const [user, setUser] = useState({
        nickname: '',
        item: '',
    })

    const {nickname, item} = user;
    useEffect(() => {
        axios({
            method: "POST",
            url: constants.HostUrl +`/user/info?id=${id}`,
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [location]);

    const _Completed = () => {
        history.push(`/`);
    }

    return(
        <>
        <Background style={{backgroundImage : "url("+nicknamebg+")"}}>
                <ResultBox>

                    <ResultText>{nickname}님은</ResultText>
                    <ResultText>{item}에 당첨되셨습니다.</ResultText>
                    <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={_Completed}>
                        돌아가기
                    </Button>
                </ResultBox>
            </Background>
        </>
    );
}

export default Result;
const Background = styled.div`
    width:100%;
    height:100vh;
    background-position: center;
    background-size: cover;
    overflow:auto;
`;


const ResultText = styled.div`
    text-align: center;
    font-size: 35px;
    line-height: 32px;
    font-family: 'Do Hyeon', sans-serif;
    margin: 20px 0;
    @media (max-width: 480px) {
        font-size: 23px;
        line-height: 25px;
    }
`;
const ResultBox = styled.div`
    width: 420px;
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -50%);
    background-color: white;
    padding: 2% 5% 3%;
    -webkit-box-shadow: 2px 2px 6px -1px rgba(0,0,0,0.42);
    -moz-box-shadow: 2px 2px 6px -1px rgba(0,0,0,0.42);
    box-shadow: 2px 2px 6px -1px rgba(0,0,0,0.42);
    @media (max-width: 768px) {
        width: 380px;

    }
    @media (max-width: 480px) {
        width: 70%;

    }
`;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: "5px auto",
        display: "block",
        "&.MuiButtonBase-root":{
            width: "386px",
            "@media (max-width: 768px)": {
                width: "366px"
            },
            "@media (max-width: 480px)": {
                width: "90%",
            }
        },
        
    }
  }));
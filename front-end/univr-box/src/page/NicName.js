import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useLocation,useHistory } from "react-router-dom";
import nicknamebg from '../asset/nicknamebg.png';
import constants from '../lib/constants';

function NicName({match}){
    let id = match.params.id;
    const location = useLocation();
    const history = useHistory();
    const [nickname, setNickname] = useState('');
    const classes = useStyles();

    const _onChange = (e) => {
        setNickname(e.target.value);
    }

    const _Completed = () => {
        if(nickname === ''){
            alert('닉네임을 입력해주세요.');
        }else{
            axios({
                method: 'POST',
                url: constants.HostUrl + `/user/join?id=${id}&nickname=${nickname}&token=univr`,
            }).then((response) => {
                history.push(`/randombox/${id}`);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    useEffect(()=>{
        axios({
            method: "POST",
            url: constants.HostUrl+`/user/login?id=${id}`,
        }).then((response)=>{
            if(response.data === 1){
                history.push(`/randombox/${id}`);
            }else if(response.data === 2){
                history.push(`/result/${id}`);
            }
        }).catch((error)=>{
            console.log(error);
        })

    },[location])

    return(
        <>
            <Background style={{backgroundImage : "url("+nicknamebg+")"}}>
                <LoginBox>
                    <TextBox>
                        <SubTitle>닉네임을 입력해주세요.</SubTitle>
                    </TextBox>
                    <TextField id="outlined-basic" label="닉네임" variant="outlined" className={classes.root} value={nickname} onChange={_onChange}/>
                    <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={_Completed}>
                        OK!
                    </Button>
                </LoginBox>
            </Background>
        </>
    );
}

export default NicName;

const Background = styled.div`
    width:100%;
    height:100vh;
    background-position: center;
    background-size: cover;
    overflow:auto;
`;



const TextBox = styled.div`
    margin-top: 5%;
    margin-bottom: 2%;
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 41px;
    line-height: 32px;
    font-family: 'Do Hyeon', sans-serif;
    @media (max-width: 480px) {
        font-size: 23px;
        line-height: 15px;
    }
`;

const LoginBox = styled.div`
    width: 400px;
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
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      "&.MuiFormControl-root": {
          width: "100%",
          margin: "10px auto"
      },

      "&.MuiOutlinedInput-input": {
          "@media (max-width: 480px)": {
            padding: "16.5px 14px"
          }
      }
    },
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
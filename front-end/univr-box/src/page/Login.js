import React from 'react';
import { useHistory } from "react-router-dom";
import KaKaoLogin from 'react-kakao-login';
import styled from "styled-components";
import axios from "axios";
import constants from '../lib/constants';
import loginbg from '../asset/loginbg.png';
function Login() {
    const history = useHistory();


    const responseKaKao = (res) => {
        {sessionStorage.clear()}
        axios({
            method: "POST",
            url: constants.HostUrl+`/user/login?id=${res.profile.id}`,
        }).then((response)=>{
            if(response.data === 0){
                history.push(`/nicname/${res.profile.id}`);
            }else if(response.data === 1){
                history.push(`/randombox/${res.profile.id}`);
            }else{
                history.push(`/result/${res.profile.id}`);
            }
        }).catch((error)=>{
            console.log(error);
        })

    }

    return (
        <>
            
            <Background style={{backgroundImage : "url("+loginbg+")"}}>
                    <KaKaoBtn
                        //styled component 통해 style을 입혀 줄 예정 
                        jsKey={'afc38fc6dbcef38edc16f34644fe6363'}
                        //카카오에서 할당받은 jsKey를 입력
                        buttonText='카카오 로그인'
                        //로그인 버튼의 text를 입력
                        onSuccess={responseKaKao}
                        //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
                        getProfile={true}
                    />
            </Background>

        </>
    );
}

export default Login;

const Background = styled.div`
    width:100%;
    height:100vh;
    background-position: center;
    background-size: cover;
    overflow:auto;
`;

const KaKaoBtn = styled(KaKaoLogin)`
position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -50%);
  padding: 0;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 8px !important;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  -webkit-box-shadow: 5px 5px 6px -1px rgba(0,0,0,0.42) !important;
  -moz-box-shadow: 5px 5px 6px -1px rgba(0,0,0,0.42) !important;
  box-shadow: 5px 5px 6px -1px rgba(0,0,0,0.42) !important;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

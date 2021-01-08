import React, { useState, useEffect } from 'react';

import stopimage from '../asset/stopimage.gif';

import logo from '../asset/logo.png';
import mark from '../asset/mark.png';

import one_zero from '../asset/gif/1_1.gif';
import one_one from '../asset/gif/1_2.gif';
import two_zero from '../asset/gif/2_1.gif';
import two_one from '../asset/gif/2_2.gif';
import three_zero from '../asset/gif/3_1.gif';
import three_one from '../asset/gif/3_2.gif';
import four_zero from '../asset/gif/4_1.gif';
import four_one from '../asset/gif/4_2.gif';
import five_zero from '../asset/gif/5_1.gif';
import five_one from '../asset/gif/5_2.gif';
import six_zero from '../asset/gif/6_1.gif';
import six_one from '../asset/gif/6_2.gif';
import seven_zero from '../asset/gif/7_1.gif';
import seven_one from '../asset/gif/7_2.gif';
import eight_zero from '../asset/gif/8_1.gif';
import eight_one from '../asset/gif/8_2.gif';
import nine_zero from '../asset/gif/9_1.gif';
import nine_one from '../asset/gif/9_2.gif';
import ten_zero from '../asset/gif/10_1.gif';
import ten_one from '../asset/gif/10_2.gif';

import Button from '@material-ui/core/Button';
import styled from "styled-components";

import axios from 'axios';
import constants from '../lib/constants';
import { useLocation, useHistory } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import GiftModal from './GiftModal';
import { yellow, purple } from '@material-ui/core/colors';

function RDBox({ match }) {
    let id = match.params.id;
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [user, setUser] = useState({
        nickname: '',
        item: '',
        token: 'univr',
    })
    const [openboxbtn, SetOpenboxbtn] = useState("block");
    const [backbtn, SetBackbtn] = useState("none");
    const [giftlist, SetGiftlist] = useState("block");
    const [isOpen, setOpen] = useState(false);
    const [list, setList] = useState([]);

    const bgimg = [one_zero,two_zero,three_zero,four_zero,five_zero,six_zero,seven_zero,eight_zero,nine_zero,ten_zero];
    const bgstopimg = [one_one,two_one,three_one,four_one,five_one,six_one,seven_one,eight_one,nine_one,ten_one];
    const [bg, Setbg] = useState(stopimage);

    const { nickname, item} = user;

    const _Open = () => {
        SetOpenboxbtn("none");
        SetGiftlist("none");
        axios({
            method: "POST",
            url: constants.HostUrl + `/user/open?id=${id}`,
        }).then((response) => {
            setUser({
                nickname: nickname,
                item: response.data.result,
            })
            setList(response.data.list);
            let number = -1;
            let gift = response.data.result;
            if(gift === "귤"){
                number = 1;
            }else if(gift === "토마호크(500g)"){
                number = 8;
            }else if(gift === "뿌링클"){
                number = 0;
            }else if(gift === "왕꿈틀이 한봉"){
                number = 7;
            }else if(gift === "비타500 한박스"){
                number = 6;
            }else if(gift === "Kf94 마스크"){
                number = 3;
            }else if(gift === "오뚜기미역국컵"){
                number = 5;
            }else if(gift === "된장"){
                number = 2;
            }else if(gift === "모종삽"){
                number = 4;
            }else if(gift === "핫팩(10개)"){
                number = 9;
            }else{
                alert("경품이 전부 소진 되었습니다.");
                history.push(`/`);
            }
            Setbg(bgimg[number]);
            setTimeout(() => {
                Setbg(bgstopimg[number]);
                SetBackbtn("block");
                SetGiftlist("block");
            }, 8000);
        }).catch((error) => {
            console.log(error);
        })

    }

    const _Back = () => {
        history.push(`/`);
    }

    useEffect(() => {
        axios({
            method: "POST",
            url: constants.HostUrl + `/user/info?id=${id}`,
        }).then((response) => {
            setUser(response.data);
            if(response.data.item === "x"){
                axios({
                    method: "POST",
                    url: constants.HostUrl+`/user/list`,
                }).then((response)=>{
                    setList(response.data);
                }).catch((error)=>{
                    console.log(error);
                })
                
            }else{
                history.push(`/result/${id}`)
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [location]);

    function openModal() {
        setOpen(true);
    }
    function closeModal() {
        setOpen(false);
    }

    return (<>
        <Background style={{ backgroundImage: `url(${bg})` }}>
            <LogoBox style={{ backgroundImage: `url(${logo})` }} />
            <MarkBox style={{ backgroundImage: `url(${mark})`, display: `${openboxbtn}` }} />
            <TextBox>
                <Textfield style={{ display: `${backbtn}` }}>{nickname}님 축하드립니다.</Textfield>
                <Textfield style={{ display: `${backbtn}` }}>{item} 당첨!</Textfield>
                <div>
                    <Button variant="contained" color="primary" disableElevation className={classes.button1} onClick={_Open} style={{ display: `${openboxbtn}` }}>
                        클릭하여 열기!
                    </Button>
                    <Button variant="contained" color="primary" disableElevation className={classes.button2} onClick={_Back} style={{ display: `${backbtn}` }}>
                        돌아가기
                </Button>
                    <ColorButton variant="contained" color="primary" className={classes.margin} style={{ display: `${giftlist}` }} onClick={() => { openModal() }}>
                        잔여 상품 조회 하기
                    </ColorButton>

                </div>



            </TextBox>


        </Background>
        <GiftModal isOpen={isOpen} list={list} closeModal={closeModal} />
    </>
    );
}

export default RDBox;

const ColorButton = withStyles((theme) => ({
    root: {
        fontFamily: "'Do Hyeon', sans-serif",
        fontSize: "20px",
        margin: "10px auto",
        display: "block",
        width: "355px",
        "@media (max-width: 480px)": {
            width: "90%",
        },
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: yellow[800],
        '&:hover': {
            backgroundColor: yellow[700],
        },
    },
}))(Button);

const LogoBox = styled.div`
    width: 225px;
    height: 73px;
    margin: 10px 20px;
    background-position: center;
    background-size: cover;
`;

const MarkBox = styled.div`
    width: 500px;
    height: 600px;
    background-position: center;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -60%);
    @media (max-width: 480px) {
        width: 250px;
        height: 255px;
    }
`;

const Background = styled.div`
    width:100%;
    height:100vh;
    background-position: center;
    background-size: cover;
    @media (max-width: 768px) {
        margin: 0 auto;
        width:90%;
    }
    @media (max-width: 480px) {
        width:90%;
        height:80vh;
    }
`;

const TextBox = styled.div`
        position: absolute;
        bottom: 100px;
        left: 0;
        right: 0;
        @media (max-width: 768px) {
            bottom: 40px;
        }
        @media (max-width: 480px) {
            bottom: 20px;
        }
`;

const Textfield = styled.div`
    font-family: 'Do Hyeon', sans-serif;
    text-align: center;
    font-size: 35px;
    color: rgb(232,232,232);
    @media (max-width: 768px) {
        font-size: 30px;
    }
    @media (max-width: 480px) {
        font-size: 25px;
    }
`;

const useStyles = makeStyles((theme) => ({
    button1: {
        margin: "50px auto 0px",
        display: "block",

        padding: "7px",
        fontSize: "20px",
        fontWeight: "bold",
        "&.MuiButtonBase-root": {
            width: "356px",
            "@media (max-width: 768px)": {
                width: "356px"
            },
            "@media (max-width: 480px)": {
                margin: "70px auto 0px",
                width: "90%",
            }
        },
    },
    button2: {
        margin: "50px auto 0px",
        display: "block",

        padding: "7px",
        fontSize: "20px",
        fontWeight: "bold",
        "&.MuiButtonBase-root": {
            width: "356px",
            "@media (max-width: 768px)": {
                width: "356px"
            },
            "@media (max-width: 480px)": {
                margin: "70px auto 0px",
                width: "90%",
            }
        },
    },

    giftlistbtn: {
        textAlign: "center",
        fontFamily: "'Do Hyeon', sans-serif",
        fontSize: "20px",
        cursor: "pointer",
        marginTop: "10px"
    }
}));
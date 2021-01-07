import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import one from '../asset/list/1.png';
import two from '../asset/list/2.jpg';
import three from '../asset/list/3.png';
import four from '../asset/list/4.png';
import five from '../asset/list/5.png';
import six from '../asset/list/6.png';
import seven from '../asset/list/7.png';
import eight from '../asset/list/8.png';
import nine from '../asset/list/9.png';
import ten from '../asset/list/10.png';

import Paper from '@material-ui/core/Paper';

function GiftModal({ isOpen, closeModal ,list}){

    const classes = useStyles();

    const images = [one, two, three, four, five, six, seven, eight, nine, ten];


    return(
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
            <Paper className={classes.paper} className={classes.container}>
                <Closebtn onClick={closeModal}>X</Closebtn>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <div className={classes.title}>
                            상품 목록
                        </div>
                    </Grid>
                    {list.map((gift, index) => (
                        <>
                            <Grid item xs={3} key={index}>
                                <div>
                                    <img src={images[index]} alt="" className={classes.giftimg} />
                                    <div className={classes.gifttext}>{gift.name}</div>
                                </div>
                            </Grid>
                            <Grid item xs={3} >
                                <div className={classes.countbox}>
                                    <div className={classes.textcount}>잔여량</div>
                                    <div className={classes.gifttext}>{gift.cnt}개</div>
                                </div>
                            </Grid>
                        </>
                    ))}


                </Grid>



                
            </Paper>
        
        
        </Modal>
    );
}

export default GiftModal;


Modal.setAppElement('#root');

const Closebtn = styled.div`
    border-radius : 50%;
    width : 15px;
    height: 15px;
    font-size: 10px;
    text-align: center;
    color: rgb(70,70,70);
    border: 1px solid rgb(70,70,70);
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: '10',
  },
};

const useStyles = makeStyles((theme) => ({
    button1: {
        margin: "50px auto 0px",
        display: "block",
        
        padding: "15px",
        fontSize: "20px",
        fontWeight: "bold",
        "&.MuiButtonBase-root":{
            width: "386px",
            "@media (max-width: 768px)": {
                width: "366px"
            },
            "@media (max-width: 480px)": {
                width: "90%",
            }
        },
    },
    button2: {
        margin: "50px auto 0px",
        display: "block",
        
        padding: "15px",
        fontSize: "20px",
        fontWeight: "bold",
        "&.MuiButtonBase-root":{
            width: "386px",
            "@media (max-width: 768px)": {
                width: "366px"
            },
            "@media (max-width: 480px)": {
                width: "90%",
            }
        },
    },
    container:{
        width: "700px",
        padding: "20px",
        "@media (max-width: 768px)": {
            width: "450px",
            height: "500px",
            overflowY: "scroll"
        },
        "@media (max-width: 480px)": {
            width: "280px",
        }
    },
    giftimg:{
        width: "70px",
        height: "55px",
        textAlign: "center",
        display: "block",
        margin: "0 auto"
    },
    gifttext:{
        fontFamily: "'Do Hyeon', sans-serif",
        textAlign: "center",
    },
    countbox:{
        marginTop: "25px"
    },
    textcount:{
        textAlign: "center",
        fontFamily: "'Do Hyeon', sans-serif",
        fontSize: "20px"

    },
    title:{
        fontFamily: "'Do Hyeon', sans-serif",
        fontSize: "28px",
        textAlign: "center",
        color: "rgb(27 160 182)"
    },
    giftlistbtn:{
        textAlign: "center",
        fontFamily: "'Do Hyeon', sans-serif",
        fontSize: "20px",
        cursor: "pointer",
        marginTop: "10px"
    }
  }));
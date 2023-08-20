import styled from '@emotion/styled';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import React from 'react'

type Props = {
    isOpen: boolean;
    title?: string;
    message?: string;
    close?: () => void;
    confirm?: () => void;
};

const CustomConfirm = ({ isOpen, title, message, close, confirm }: Props) => {

    const onEnterPress = React.useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            confirm && confirm();
            close && close();
        }
    }, []
    )


    return (
        <Wrapper onKeyDown={onEnterPress}>
            <Modal open={isOpen} onClose={close} slots={{ backdrop: Backdrop }} closeAfterTransition slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={isOpen}>
                    <Content>
                        <Top>
                            <Title>{title}</Title>
                            <CloseBtn onClick={close}>&#x2716;</CloseBtn>
                        </Top>
                        <Message>{message}</Message>
                        <BtnContainer>
                            <CancelBtn onClick={close} variant="outlined" size='small'>취소</CancelBtn>
                            <ConfirmBtn variant='contained' size='small'
                                onClick={() => {
                                    confirm && confirm();
                                    close && close();
                                }}
                            >
                                확인
                            </ConfirmBtn>
                        </BtnContainer>
                    </Content>
                </Fade>
            </Modal>

        </Wrapper>
    );
};

export default CustomConfirm;

const Wrapper = styled.div`
  transition:0.2s all ease;
  `;

const Content = styled(Box)`
    position: fixed;
    flex-direction:column;
    gap: 16px;
    top: 50%;
    left: 50%;
    padding: 16px;
    min-width: 200px;
    max-width: 400px;
    border-radius: 12px;
    overflow: hidden;
    background-color: white;
    transform: translate(-50%, -50%);
    white-space:pre-line;
    z-index: 5001;
  `;
const Top = styled.div`
flex:1;
    display: flex;
    justify-content: space-between;
    align-items:center;
  `;
const Title = styled.h1``;
const CloseBtn = styled.div`
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  `;
const Message = styled.p`
flex:2;
`;
const BtnContainer = styled.div`
    flex:0.7;
    display: flex;
    gap: 24px;
  `;
const CancelBtn = styled(Button)`
    flex: 1;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  `;
const ConfirmBtn = styled(Button)`
    flex: 1;
    text-align: center;
    color:white;
  `;
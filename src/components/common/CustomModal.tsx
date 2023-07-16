import styled from '@emotion/styled';
import { Box, Modal, Typography } from '@mui/material';
import React, { ReactNode } from 'react'

interface ModalProps {
    open: boolean,
    onClose?: () => void;
    title: string,
    content: string,
    children?:ReactNode,
}

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  border: 2px solid #000;
  border-radius:12px;
  box-shadow: 24;
  background-color:white;
  `


function CustomModal({ open, title, content, children }: ModalProps) {
    return (
        <Modal open={open} >

            <StyledBox>
                <Typography variant='h6' component={"h1"}>{title}</Typography>
                <Typography sx={{mt:2}}>{content}</Typography>
            </StyledBox>
        </Modal>
    )
}

export default CustomModal
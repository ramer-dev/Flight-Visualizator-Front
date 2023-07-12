
import styled from "@emotion/styled";

export const ModifyButton = styled.a`
    padding:3px 8px;
    text-decoration:none;
    transition:0.2s ease;
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: #D9D9D9;
    border-radius: 10px 0px 0px 10px;
    cursor:pointer;
    &:hover{
        background-color:#d9d9d9;
    }
`

export const DeleteButton = styled.a`
    padding:3px 8px;
    text-decoration:none;
    transition:0.2s ease;
    font-size:12px;
    border-width: 1px 1px 1px 0px;
    border-style: solid;
    border-color: #D9D9D9;
    border-radius:0 10px 10px 0;
    cursor:pointer;
    &:hover{
        background-color:#ff3737;
        border-color: #ff3737;
        color:#ffffff;
    }
    color:#ff3737;
`

export const PinButton = styled.div`
    margin-left:10px;
    width:25px;
    height:25px;
    border:#d9d9d9 solid 1px;
    border-radius:50%;
    transition:0.2s ease;
    text-align:center;
    line-height:25px;
    cursor:pointer;
    &:hover{
        background-color:#d9d9d9;
    }
    svg{
        position:relative;
        top:1px;
        margin:2px;
        width:20px;
        height:20px;
    }
    path{
        fill: #000;
    }
`
import styled from "@emotion/styled";
import { NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import InputText from "components/common/InputText";
import FlightItem from "./FlightItem";
import NavSideBar from "../NavSideBar";
import React from "react";
import Title from "components/common/Title";



const FlightContent = () => {

    return (
        <>
        <Title>비행검사</Title>
            {Array(5).fill(0).map((t, i) => {
                return <>
                    <HorizontalLine />
                    <FlightItem key={i} />
                </>
            })}
        </>
    )
}

export default FlightContent;
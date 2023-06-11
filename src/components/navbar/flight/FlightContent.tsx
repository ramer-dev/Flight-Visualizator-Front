import styled from "@emotion/styled";
import { NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import InputText from "components/common/InputText";
import FlightItem from "./FlightItem";
import NavSideBar from "../NavSideBar";
import React from "react";



const FlightContent = () => {

    return (
        <>
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
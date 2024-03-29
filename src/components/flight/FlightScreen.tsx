import { contentFormat } from 'common/store/atom'
import { ContentType } from 'common/type/NavBarType';
import React from 'react'
import { useRecoilValue } from 'recoil'
import FlightAdd from './FlightAdd';
import FlightEdit from './FlightEdit';
import FlightView from './FlightView';
import NavCloseButton from 'components/navbar/NavCloseButton';


const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <FlightAdd />;
        case 'EDIT':
            return <FlightEdit />;
        case 'VIEW':
            return <FlightView />;
        default:
            return null;
    }
}

export const FlightScreen = () => {
    const content = useRecoilValue(contentFormat);
    return (
        <>
            {selector(content)}
            

        </>
    )
}

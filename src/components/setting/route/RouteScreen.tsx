import { ContentType } from 'common/type/NavBarType'
import React from 'react'
import RouteAdd from './RouteAdd'
const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <RouteAdd />
            
        case 'EDIT':
            return <RouteAdd />
            
        default:
            return null;
    }
}

interface Props {
    content: ContentType
}

export const RouteScreen = ({ content }: Props) => {
    return (
        <>
            {selector(content)}
        </>
    )
}
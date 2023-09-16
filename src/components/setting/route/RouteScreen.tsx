import { ContentType } from 'common/type/NavBarType'
import React from 'react'
import RouteAdd from './RouteAdd'
import RouteEdit from './RouteEdit'
const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <RouteAdd />
            
        case 'EDIT':
            return <RouteEdit />
            
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
import { ContentType } from 'common/type/NavBarType'
import React from 'react'
import FixPointAdd from './FixPointAdd'
import FixPointEdit from './FixPointEdit'
const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <FixPointAdd />
            
        case 'EDIT':
            return <FixPointEdit />
            
        default:
            return null;
    }
}

interface Props {
    content: ContentType
}

export const FixPointScreen = ({ content }: Props) => {
    return (
        <>
            {selector(content)}
        </>
    )
}
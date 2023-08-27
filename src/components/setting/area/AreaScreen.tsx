import { ContentType } from 'common/type/NavBarType'
import React from 'react'
import AreaAdd from './AreaAdd'
import AreaEdit from './AreaEdit'
const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <AreaAdd />
            
        case 'EDIT':
            return <AreaEdit />
            
        default:
            return null;
    }
}

interface Props {
    content: ContentType
}

export const AreaScreen = ({ content }: Props) => {
    return (
        <>
            {selector(content)}
        </>
    )
}
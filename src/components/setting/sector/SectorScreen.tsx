import { ContentType } from 'common/type/NavBarType'
import React from 'react'
import SectorAdd from './SectorAdd'
import SectorEdit from './SectorEdit'
const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <SectorAdd />
            
        case 'EDIT':
            return <SectorEdit />
            
        default:
            return null;
    }
}

interface Props {
    content: ContentType
}

export const SectorScreen = ({ content }: Props) => {
    return (
        <>
            {selector(content)}
        </>
    )
}
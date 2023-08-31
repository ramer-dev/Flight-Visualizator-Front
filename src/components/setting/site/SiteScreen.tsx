import { ContentType } from 'common/type/NavBarType'
import React from 'react'
import SiteAdd from './SiteAdd'
import SiteEdit from './SiteEdit'
const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <SiteAdd />
            
        case 'EDIT':
            return <SiteEdit />
            
        default:
            return null;
    }
}

interface Props {
    content: ContentType
}

export const SiteScreen = ({ content }: Props) => {
    return (
        <>
            {selector(content)}
        </>
    )
}
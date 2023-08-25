import { ContentType } from 'common/type/NavBarType';
import React from 'react'
import FrequencyAdd from './FrequencyAdd';
import FrequencyEdit from './FrequencyEdit';

const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <FrequencyAdd />
            
        case 'EDIT':
            return <FrequencyEdit />
            
        default:
            return null;
    }
}

interface Props {
    content: ContentType
}

export const FrequencyScreen = ({ content }: Props) => {
    return (
        <>
            {selector(content)}
        </>
    )
}

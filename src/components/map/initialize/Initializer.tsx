import React from 'react'
import LoadFixPoint from './LoadFixPoint'
import LoadRoute from './LoadRoute'
import LoadSector from './LoadSector'
import LoadSites from './LoadSites'

function Initializer() {
    return (
        <>
            <LoadSector />
            <LoadSites />
            <LoadFixPoint/>
            <LoadRoute/>
        </>
    )
}

export default Initializer
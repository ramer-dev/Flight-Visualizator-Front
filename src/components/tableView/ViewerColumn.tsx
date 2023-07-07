import React from 'react'

interface ColumnType {
    type?: string
    pk: number,
    data?: number | string | null,
}

function ViewerColumn({ data, type }: ColumnType) {
    return (
        <div>
            {data}
        </div>
    )
}

export default ViewerColumn
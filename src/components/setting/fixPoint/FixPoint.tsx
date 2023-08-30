import styled from "@emotion/styled"
import { contentFormat } from "common/store/atom";
import { useGetPoint } from "components/hooks/useFixPoint";
import React from "react";
import { useRecoilValue } from "recoil";
import FixPointAutoComplete from "./FixPointAutoComplete";
interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
const Container = styled.div`

`

export default function FixPoint({ openEditWindow, changeData }: Props) {
    const { data, refetch, isLoading, isError } = useGetPoint();
    const options = data.map(t => { return { label: `${t.pointName}`, coord: t.pointCoordinate, id: t.id } })
    const content = useRecoilValue(contentFormat)

    React.useEffect(() => {
        if (content === 'NONE') refetch()
    }, [content])

    return (
        <Container>
            <FixPointAutoComplete options={options} openEditWindow={openEditWindow} changeData={changeData} isLoading={isLoading} isError={isError} />
        </Container>
    )
}  

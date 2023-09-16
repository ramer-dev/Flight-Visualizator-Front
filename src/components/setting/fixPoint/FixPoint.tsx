import styled from "@emotion/styled"
import { contentFormat } from "common/store/atom";
import { useGetPoint } from "components/hooks/useFixPoint";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import FixPointAutoComplete from "./FixPointAutoComplete";
interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
const Container = styled(motion.div)`

`

export default function FixPoint({ openEditWindow, changeData }: Props) {
    const { data, refetch, isLoading, isError } = useGetPoint();
    const options = data.map(t => { return { label: `${t.pointName}`, coord: t.pointCoordinate, id: t.id } })
    const content = useRecoilValue(contentFormat)

    React.useEffect(() => {
        if (content === 'NONE') refetch()
    }, [content])

    return (
        <Container initial={{y:'-100%', opacity:0}} animate={{y:'0', opacity:1}} transition={{damping:60}}>
            <FixPointAutoComplete options={options} openEditWindow={openEditWindow} changeData={changeData} isLoading={isLoading} isError={isError} />
        </Container>
    )
}  

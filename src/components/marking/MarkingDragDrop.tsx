import React, { Component, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from '@emotion/styled';
import MarkingCard from "./MarkingCard";
interface Props {
    children: Element[] | React.ReactNode[]
}
interface ItemType {
    id: string,
    content: string,
}

interface ListStyleType {
    isDraggingOver: boolean,
}

// fake data generator
const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = (list: ItemType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

// const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,

//     // change background colour if dragging
//     background: isDragging ? "lightgreen" : "grey",

//     // styles we need to apply on draggables
//     ...draggableStyle
// });


const StyledDragList = styled.div`
background: ${(props: ListStyleType) => props.isDraggingOver ? "lightgrey" : "white"};
height:100%;
overflow-y:auto;
`


export default function MarkingDragDrop<T>({children} : Props) {
    // const [items, setItems] = useState(getItems(10))
    const items = useRef(children)

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const orderedItems = reorder(
            items.current,
            result.source.index,
            result.destination.index
        );

        setItems(orderedItems)
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <StyledDragList
                        isDraggingOver={snapshot.isDraggingOver} {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}>
                                        <MarkingCard site={"부안"} distance={index} angle={index} index={index} isDragging={snapshot.isDragging}                                        // ref={provided.innerRef}
                                        // {...provided.draggableProps}
                                        // {...provided.dragHandleProps}
                                        // style={getItemStyle(
                                        //     snapshot.isDragging,
                                        //     provided.draggableProps.style
                                        // )}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </StyledDragList>
                )}
            </Droppable>
        </DragDropContext>
    );
}
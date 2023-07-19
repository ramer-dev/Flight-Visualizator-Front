import React, { Component, PropsWithChildren, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from '@emotion/styled';

interface ItemType {
    site: string;
    distance: number;
    angle: number;
    id: string,
    index:number,
}


interface ListStyleType {
    isDraggingOver: boolean,
}
 


const StyledDragList = styled.div`
background: 'white';
height:100%;
overflow-y:auto;
`

export default function MarkingDragDrop<T extends ReactNode[]>({ children }: PropsWithChildren<{ children: T }>) {
    // const [items, setItems] = useState(getItems(10))
    const [items, setItems] = useState<ReactElement[]>(React.Children.toArray(children).filter(React.isValidElement))
    useEffect(() => {
        // console.log(items)

    }, [items])

    const onDragEnd = (result: any) => {
        // dropped outside the list
        console.log(result)
        if (!result.destination) return;
        const data = [...items];
        const [reorderedItem] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, reorderedItem);
        setItems(data);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cardlists">
                {(provided, snapshot) => (
                    <StyledDragList
                        className="cardlists"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {items.map((item: ReactElement<ItemType>, index: number) => {
                            const itemPropsWithIndex = React.cloneElement(item, {index:index})

                            return <Draggable key={'mark-' + `${item.props.id}`} draggableId={'mark-' + `${item.props.id}`} index={index}>
                                {(provided, snapshot) => (
                                    <div {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}>
                                        {itemPropsWithIndex} 
                                    </div>
                                )}
                            </Draggable>
                        })}
                        {provided.placeholder}
                    </StyledDragList>
                )}
            </Droppable>
        </DragDropContext>
    );
}
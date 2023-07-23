import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from '@emotion/styled';
import { markingCards } from "common/store/atom";
import { useRecoilState } from "recoil";
import MarkingCard, { MarkingCardProps } from "./MarkingCard";

// interface ItemType {
//     // site: string;
//     // distance: number;
//     isDragging?: boolean,
//     id: string,
//     index: number,
// }

// interface Props {
//     item: ReactNode[]
// }

const StyledDragList = styled.div`
background: 'white';
height:100%;
overflow-y:auto;
`

// export default function MarkingDragDrop<T extends ReactNode[]>({ children }: PropsWithChildren<{ children: T }>) {
//     const [items, setItems] = useState<ReactElement[]>(React.Children.toArray(children) as ReactElement[])
//     console.log(items,children)

export default function MarkingDragDrop() {
    const [list, setList] = useRecoilState<MarkingCardProps[]>(markingCards);

    // const [items, setItems] = useState<ReactElement[]>(React.Children.toArray(children).filter(React.isValidElement))

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) return;
        const data = [...list];
        const [reorderedItem] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, reorderedItem);
        const newArray = data.map((t,i) => {return {...t, index:i}})
        setList(newArray);
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
                        {list.map((t, i) => {
                            return <Draggable key={`drag-${t.id}`} draggableId={`drag-${t.id}`} index={i}>
                                {(provided, snapshot) => {
                                    // const itemPropsWithIndex = React.cloneElement(t, { index: index, isDragging: snapshot.isDragging })

                                    return <div {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}>
                                        <MarkingCard id={t.id} site={t.site} distance={t.distance} angle={t.angle} index={i} level={t.level} />
                                    </div>
                                }}
                            </Draggable>
                        })}

                        {provided.placeholder}
                    </StyledDragList>
                )}
            </Droppable>
        </DragDropContext>
    );
}
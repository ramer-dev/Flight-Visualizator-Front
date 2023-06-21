import { ContentType, ContentViewType } from "common/type/NavBarType";

type propType = {
    content: ContentType;
    setContent: (a: ContentType) => void;
    contentView: ContentViewType;
    setContentView: (a: ContentViewType) => void;
}

export default function Marking(props: propType) {
    return(
        <div>Marking!</div>
    )
} 
import { CardWrapper } from "./styled";

export const Card = ({ children, className }) => {
    return (
        <CardWrapper
            className={className}
        >
            {children}
        </CardWrapper>
    )
}
import { useEffect, useRef } from "react";
import { BaseModalWrapper } from "./styled";

export const BaseModal = ({ children, open, onClose, height, width, className }) => {
    const modalRef = useRef();
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        const handleClickOutside = (e) => {
            if (open && modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("click", handleClickOutside);
        };
    }, [open, modalRef, onClose]);

    return (
        <BaseModalWrapper
            open={open}
            ref={modalRef}
            height={height}
            width={width}
            className={className}
        >
            {children}
        </BaseModalWrapper>
    )
}
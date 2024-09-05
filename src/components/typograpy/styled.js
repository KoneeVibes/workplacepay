import styled from "styled-components";


export const H1 = styled.h1(() => {
    return `
        font-family: Poppins;
        font-weight: 800;
        font-size: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const H2 = styled.h3(() => {
    return `
        font-family: Poppins;
        font-weight: 700;
        font-size: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const H3 = styled.h3(() => {
    return `
        font-family: Poppins;
        font-weight: 500;
        font-size: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const P = styled.p(() => {
    return `
        font-family: Poppins;
        font-weight: 400;
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const Span = styled.span(() => {
    return `
        font-family: Poppins;
        font-weight: 400;
        font-size: 16px;
        line-height: normal;
        overflow: hidden;
        text-overflow: ellipsis;
    `
})

export const A = styled.a(() => {
    return `
    font-family: Work sans;
    font-weight: 800;
    font-size: 12px;
    overflow: hidden;

    `
})

export const Li = styled.li(() => {
    return `
    font-family: Work sans;
    font-weight: 400;
    font-size: 16px;
`
})

export const Label = styled.label(() => {
    return `
    font-family: Work sans;
    font-weight: 600;
    font-size: 16px;
    line-hieght: 16.42px;
    text-alighn: left;
    overflow: hidden;
    text-overflow: ellipsis;
    `
})

export const Td = styled.td(() => {
    return `
    font-family: Work sans;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;

    `
})

export const Th = styled.th(() => {
    return `
    font-family: Work sans;
    font-size: 14px;
    font-weight: 600;
    overflow: Hidden;
    text-overflow: ellipsis;
    `
})

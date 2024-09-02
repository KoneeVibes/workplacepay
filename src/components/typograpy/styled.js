import styled from "styled-components"


export const H1 = styled.h1(() =>{
    return `
    font-family: Avenir-next;
    font-weight: 700;
    font-size: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    ` 
})

export const P = styled.p(() =>{
    return`
    font-family: Avenir-next;
    font-weight: 700;
    font-size: 40px;
    overflow: hidden;
    text-overflow: ellipsis;

    `
})

export const H3 = styled.h3(() =>{
    return`
    font-family: Work sans;
    font-weight: 700;
    font-size: 18px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    `
})

export const H2 = styled.h3(() =>{
    return `
    font-family: Aventir-next;
    font-weight: 700;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    `
})

export const A = styled.a(() =>{
    return `
    font-family: Work sans;
    font-weight: 800;
    font-size: 12px;
    overflow: hidden;

    `
})

export const L1 = styled.l1(() =>{
    return `
    font-family: Work sans;
    font-weight: 400;
    font-size: 16px;

        `
})

export const Label = styled.label(() =>{
    return`
    font-family: Work sans;
    font-weight: 600;
    font-size: 16px;
    line-hieght: 16.42px;
    text-alighn: left;
    overflow: hidden;
    text-overflow: ellipsis;
    `
})

export const Td = styled.td(() =>{
    return`
    font-family: Work sans;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;

    `
})

export const Th = styled.th(() =>{
    return `
    font-family: Work sans;
    font-size: 14px;
    font-weight: 600;
    overflow: Hidden;
    text-overflow: ellipsis;
    `
})
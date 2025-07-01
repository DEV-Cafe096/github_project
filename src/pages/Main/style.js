import styled, { keyframes, css } from "styled-components";



export const Container = styled.div`
    max-width: 700px;
    background: #f0f8ff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 60px auto;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 10px;
            color: #252A28;
        }
    }


`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? '#ff0000' : '#d3d3d3')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }`;

const animate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;




export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background-color: #252A28;
    /* background-color:rgb(23, 70, 38); */
    border: 0;
    border-radius: 4px;
    padding: 0 15px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s ease-in-out transform 0.2s ease-in-out;
    &:hover {
        background-color: #2f3639;


    }


    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    ${props => props.loading && css`
        svg {
            animation: ${animate} 2s linear infinite;
        }
    `}

`;

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & + li {
            border-top: 1px solid #eee;
        }

        a {
            color: #252A28;
            text-decoration: none;
        }
    }



`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})
`
    background: transparent;
    color: #252A28;
    border: 0;
    cursor: pointer;
    padding: 8px 10px;
    outline: none;
    border-radius: 4px;
`;

export const ErrorText = styled.p`
    color: #ff4d4d;
    margin-top: 10px;
    font-size: 13px;
`;

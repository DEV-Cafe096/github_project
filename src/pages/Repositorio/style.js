import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    padding: 30px;
    max-width: 700px;
    /* height: auto; */
    background-color: #fff;
    border-radius: 4px;
    box-shadow:  0 0 20px rgba(0, 0, 0, 0.1);
    margin: 50px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 24px;
        margin-bottom: 10px;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
    `;

    export const BackButton = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: #000;
    font-size: 12px;
    font-weight: bold;
    `;

    export const IssuesList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li{
            margin-top: 10px;
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #2f3639 ;             
        }

        div{
            flex: 1;
            margin-left: 15px;

            p{
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }
        }                                           

        strong{
            font-size: 15px;
            color: #000;

            
        
        }

        a{
            text-decoration: none;
            color: #000;
            font-size: 12px;

            &:hover{
                color: #0071db
            }   
        }

        span{
            background: #2f3639;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 2px 4px;
            margin-left: 10px;
        }

    }
`;
export const PageAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    button{
        font-size: 16px;
        border-radius: 4px;
        outline: 0;
        border: 0;
        padding: 10px 15px;
        margin-left: 10px;
        background-color: #2f3639;
        color: #fff;
        cursor: pointer;

        /* &:hover{
            background-color: #0071db;
            transition: ease-in-out 0.3s;
        } */

        &[disabled]{
            cursor: not-allowed;
            opacity: 0.6;
            
        }
    }
`;

export const FilterList = styled.div`
    margin: 15px 0;
    
    button{
        border: 0;
        padding: 8px;
        margin: 0 3px;
        border-radius: 4px;
        outline: 0;

        &:nth-child(${props => props.active + 1}){
            background-color: #2f3639;
            color: #fff;
        }

    }
`


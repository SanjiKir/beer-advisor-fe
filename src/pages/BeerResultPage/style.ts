import styled from 'styled-components';

export const BeerResultContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${props => props.theme.combinedPadding}
`;

export const FormContainer = styled.div`
    max-width: 20%;
    min-width: 24rem;
`;

export const SearchResultContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 3rem;
    box-sizing: border-box;
    max-width: 80%;
    width: 100%;
`;
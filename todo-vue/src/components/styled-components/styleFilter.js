import styled from "vue-styled-components";

export const SectionFilterBlock = styled.div`
    display: flex;
    position: relative;
    width: auto;
    height: 38px;
    padding: 0 20px 0;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    background: #fff;
    font-size: 14px;
    align-items: center;
    @media (max-width: 420px) {
        padding: 0;
        height: 78px;
        align-items: auto;
    }
`;

export const BtnListBlock = styled.ul`
    display: flex;
    position: absolute;
    top: 5px;
    right: 0;
    left: 30%;
    @media (max-width: 420px) {
        top: 40px;
    }
`;

export const FilterLeftText = styled.div`
    text-align: left;
    @media (max-width: 420px) {
        position: absolute;
        padding: 10px 0 0 10px;
        top: 5px;
    }
`;

export const FilterButton = styled.li`
    padding: 5px;
    margin-right: 15px;
    border: 2px solid transparent;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        border-color: rgba(175, 47, 47, 0.3);
    }
`;

export const FilterRightText = styled.div`
    position: absolute;
    right: 10px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

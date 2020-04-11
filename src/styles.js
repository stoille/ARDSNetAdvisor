import styled from "styled-components";

export const styles = {
  container: {
    padding: "10px",
    fontWeight: "100",
    lineHeight: "22px"
  },
  title: {
    fontWeight: "100"
  }
};

export const EscalationGrid = styled.div`
  padding: 10px;
  display: grid;
  grid-template-rows: 4.25rem 2rem;
  justify-items: left;
  grid-gap: 0.35rem;
  font-size: 1.25rem;
  border: 1px solid #321;
`;

export const EscalationValuesGrid = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 7rem 3em;
  justify-items: right;
  align-items: center;
  grid-gap: 0.35rem;
  font-size: 4rem;
  // border: 1px solid #321;
`;

export const EscalationValuesLabels = styled.div`
  font-size: 1.3rem;
  padding: 10px;
`;

export const EscalationModeGrid = styled.div`
  display: grid;
  grid-template-columns: 19rem;
  justify-items: center;
  align-items: center;
  grid-gap: 0.35rem;
  font-size: 1rem;
  border: 1px solid #321;
`;

export const HomeGrid = styled.div`
  max-width: 450px;
`;

export const LadderGrid = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 7rem 6rem 6rem;
  justify-items: left;
  grid-gap: 0.35rem;
  font-size: 1.25rem;
  border: 1px solid #321;
`;

export const LadderValueGrid = styled.div`
  display: grid;
  grid-template-columns: 6rem;
  grid-template-rows: 4rem 1rem;
  justify-items: right;
  align-items: center;
  grid-gap: 0.35rem;
  font-size: 4.25rem;
  // border: 1px solid #321;
`;

export const LadderValueLabel = styled.div`
  font-size: 1.3rem;
`;

export const LadderButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 3rem 9rem;
  justify-items: left;
  align-items: center;
  grid-gap: 0.35rem;
  font-size: 1.25rem;
  //border: 2px solid #321;
`;

export const LadderStepButtonsGrid = styled.div`
  display: grid;
  grid-template-rows: 3rem 3rem;
  justify-items: right;
  align-items: top;
  grid-gap: 0.35rem;
  font-size: 1.25rem;
  //border: 2px solid #321;
`;

export const LadderQuickButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 2.75rem 2.75rem 2.75rem;
  grid-template-rows: 2.75rem 2.75rem;
  grid-gap: 0.35rem;
  font-size: 1rem;
  // border: 2px solid #321;
`;

export const StepButton = styled.button`
  touch-action: manipulation;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  padding: 0;
  background: #0075a6;
  color: #fff;
  font-size: inherit;
  outline: 0; /* Spinbutton buttons should not be focusable */
  &:active {
    background-color: #004766;
    touch-action: manipulation;
  }
  &:disabled {
    background-color: #7bb0c6;
    touch-action: manipulation;
  }
`;
export const QuickButton = styled.button`
  touch-action: manipulation;
  border: none;
  padding: 0;
  background: #b3b3cc;
  font-size: inherit;
`;
export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

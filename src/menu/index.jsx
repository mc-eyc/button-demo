import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import modes from "../modes";

const StyledMenu = styled.div`
    h2 {
        color: white;
        &::before {
            content: "[ ";
        }
        &::after {
            content: " ]";
        }
    }
`;

const StyledSliderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -1em;

  h3 {
      color: white;
      font-size: 0.75em;
  }
`;

export function Menu({setMode, setAutoSpinsSelected, setAutoSpins, setFreeSpins }) {
    return (
        <StyledMenu>
            <h2>Modes</h2>
            {Object.values(modes).map((mode) => (
                <button key={mode} onClick={() => setMode(mode)}>
                    {mode}
                </button>
            ))}
            <h2>Counters</h2>
            <StyledSliderContainer>
                <CounterSlider title="Auto Spins Selected" setter={setAutoSpinsSelected} />
                <CounterSlider title="Auto Spins" setter={setAutoSpins} />
                <CounterSlider title="Free Spins" setter={setFreeSpins} />
            </StyledSliderContainer>
        </StyledMenu>
    );
}

function CounterSlider({ title, setter }) {
    return (
        <div>
            <h3>{title}</h3>
            <input type="range" defaultValue={0} min={0} max={999} onChange={(e) => setter(e.target.value)} />
        </div>
    );
}

export default connect(
    null,
    (dispatch) => ({
        setMode: (mode) => dispatch({ type: "mode.set", mode }),
        setAutoSpinsSelected: (value) => dispatch({ type: "counters.setAutoSpinsSelected", value }),
        setAutoSpins: (value) => dispatch({ type: "counters.setAutoSpins", value }),
        setFreeSpins: (value) => dispatch({ type: "counters.setFreeSpins", value }),
    }),
)(Menu);

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import modes from "../modes";
import ButtonContainer from "../buttons";
import Spin from "../buttons/spin";
import TurboSpin from "../buttons/turbo-spin";
import AutoSpinSelected from "../buttons/auto-spin-selected";
import AutoSpin from "../buttons/auto-spin";
import FreeSpin from "../buttons/free-spin";
import Close from "../buttons/close";
import Menu from "../buttons/menu";
import AutoConfig from "../buttons/auto-config";
import BetConfig from "../buttons/bet-config";
import SoundConfig from "../buttons/sound-config";
import StopSpin from "../buttons/stop-spin";

const StyledHud = styled.div`
    display: flex;
    flex-direction: ${props => props.orientation === "vertical" ? "column" : "row"};
    margin: auto;
    text-align: center;
    margin: 3em 0em;
    justify-content: center;
    align-content: center;
    align-items: center;
    border: 1px solid blue;
    flex-grow: 1;
    flex-shrink: 0;

    > .button-container {
        border: 1px solid red;
        box-sizing: border-box;
        margin: 1em;
    }

    .button-group {
        min-width: 38px;
        min-height: 38px;
        width: 38px;
        height: 38px;
        flex-basis: 64px;

        &.main {
            min-width: 64px;
            min-height: 64px;
            width: 64px;
            height: 64px;
            flex-basis: 96px;
        }

        &.side {
            position: absolute;
            transform: translateX(-50%) translateY(-50%);
        }
    }
`;

export function HUD({
    mode = "default",
    align,
    toggleMute,
    goToDefault,
    goToAutoConfig,
    goToBetConfig,
    goToMenu,
    spin,
    autoSpin,
}) {
    return (
        <StyledHud orientation={align.orientation}>
            {/* Audio Button */}
            <div className="button-group">
                <ButtonContainer mode={mode}>
                    <SoundConfig
                        onClick={toggleMute}
                        on={[
                            modes.Default,
                            modes.AutoSpinPreSelection,
                            modes.AutoSpinSelected,
                            modes.BetConfiguring,
                        ]}
                    />
                </ButtonContainer>
            </div>

            {/* Autoplay Config Button */}
            <div className="button-group">
                <ButtonContainer mode={mode}>
                    <AutoConfig
                        onClick={goToAutoConfig}
                        on={[modes.Default, modes.BetConfiguring]}
                    />
                    <Close
                        onClick={goToDefault}
                        on={[modes.AutoSpinPreSelection, modes.AutoSpinSelected]}
                    />
                </ButtonContainer>
            </div>

            {/* Optional Extra Button */}
            <div className="button-group side">
                <ButtonContainer mode={mode}>
                    <TurboSpin on={modes.SlamSpinning} />
                    <StopSpin on={modes.TurboSpinning} />
                </ButtonContainer>
            </div>

            {/* Spin Button */}
            <div className="button-group main">
                <ButtonContainer mode={mode}>
                    <Spin
                        onClick={spin}
                        on={[modes.Default, modes.AutoSpinPreSelection, modes.BetConfiguring]}
                    />
                    <StopSpin on={modes.SlamSpinning} />
                    <TurboSpin on={modes.TurboSpinning} />
                    <AutoSpinSelected onClick={autoSpin} on={modes.AutoSpinSelected} />
                    <AutoSpin on={modes.AutoSpinning} />
                    <FreeSpin on={modes.FreeSpinning} />
                </ButtonContainer>
            </div>

            {/* Bet Config Button */}
            <div className="button-group">
                <ButtonContainer mode={mode}>
                    <BetConfig
                        onClick={goToBetConfig}
                        on={[modes.Default, modes.AutoSpinPreSelection, modes.AutoSpinSelected]}
                    />
                    <Close onClick={goToDefault} on={modes.BetConfiguring} />
                </ButtonContainer>
            </div>

            {/* Menu Button */}
            <div className="button-group">
                <ButtonContainer mode={mode}>
                    <Menu
                        onClick={goToMenu}
                        on={[
                            modes.Default,
                            modes.AutoSpinPreSelection,
                            modes.AutoSpinSelected,
                            modes.BetConfiguring,
                        ]}
                    />
                    <Close onClick={goToDefault} on={modes.MenuOpened} />
                </ButtonContainer>
            </div>
        </StyledHud>
    );
}

export default connect(
    ({ mode, align }) => ({ mode, align }),
    (dispatch) => ({
        toggleMute: () => dispatch({ type: "audio.toggleMute" }),
        goToDefault: () => dispatch({ type: "mode.set", mode: modes.Default }),
        goToAutoConfig: () => dispatch({ type: "mode.set", mode: modes.AutoSpinPreSelection }),
        goToBetConfig: () => dispatch({ type: "mode.set", mode: modes.BetConfiguring }),
        goToMenu: () => dispatch({ type: "mode.set", mode: modes.MenuOpened }),
        spin: () => dispatch({ type: "mode.set", mode: modes.Spinning }),
        autoSpin: () => dispatch({ type: "mode.set", mode: modes.AutoSpinning }),
    }),
)(HUD);

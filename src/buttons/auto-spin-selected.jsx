import React from "react";
import styled from "styled-components";
import { TimelineMax, Back } from "gsap";
import { connect } from "react-redux";

import Button from "./button";
import modes from "../modes";

const StyledAutoSpinSelected = styled(Button)`
`;

export function AutoSpinSelected(props) {
    return <StyledAutoSpinSelected text={props.spins} {...props} />;
}

AutoSpinSelected.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(
        elem,
        0.5,
        { opacity: 0, y: 32 },
        { ease: Back.easeOut, opacity: 1, y: 0 },
    );
};

AutoSpinSelected.exit = (elem, from, to, done) => {
    if (to === modes.AutoSpinning) {
        return new TimelineMax()
            .fromTo(elem, 0.5, { opacity: 1 }, { opacity: 0 })
            .eventCallback("onComplete", done);
    } else {
        return new TimelineMax().eventCallback("onComplete", done);
    }
};

export default connect(({counters}) => ({ spins: counters.autoSpinsSelected }))(AutoSpinSelected);
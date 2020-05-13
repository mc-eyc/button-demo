import React from "react";
import styled from "styled-components";
import { TimelineMax, Back } from "gsap";
import { connect } from "react-redux";

import Button from "./button";
import modes from "../modes";

const StyledFreeSpin = styled(Button)`
`;

export function FreeSpin(props) {
    const { spins } = props;
    return <StyledFreeSpin text={spins > 0 && spins} {...props} />;
}

FreeSpin.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(
        elem,
        0.5,
        { opacity: 0, rotate: 0, scale: 1, y: -32 },
        { ease: Back.easeOut, opacity: 1, y: 0 },
    );
};

FreeSpin.exit = (elem, from, to, done) => {
    if (to === modes.Spinning || to === modes.TurboSpinning || to === modes.AutoSpinning) {
        return new TimelineMax()
            .fromTo(
                elem,
                0.5,
                { opacity: 1, rotate: 0, scale: 1, y: 0 },
                { ease: Back.easeIn, opacity: 0, y: -32 },
            )
            .eventCallback("onComplete", done);
    } else {
        return new TimelineMax().eventCallback("onComplete", done);
    }
};

export default connect(({ counters }) => ({ spins: counters.freeSpins }))(FreeSpin);

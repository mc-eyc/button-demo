import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";

const StyledBetConfig = styled(Button)`
`;

export default function BetConfig(props) {
    return <StyledBetConfig text="⛁" {...props} />;
}

BetConfig.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

BetConfig.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};




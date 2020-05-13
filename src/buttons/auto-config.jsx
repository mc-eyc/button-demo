import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";

const StyledAutoConfig = styled(Button)`
`;

export default function AutoConfig(props) {
    return <StyledAutoConfig text="🗘" {...props} />;
}

AutoConfig.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

AutoConfig.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};



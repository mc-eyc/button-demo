import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";

const StyledClose = styled(Button)`
`;

export default function Close(props) {
    return <StyledClose text="🗙" {...props} />;
}

Close.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

Close.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};

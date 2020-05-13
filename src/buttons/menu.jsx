import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";

const StyledMenu = styled(Button)`
`;

export default function Menu(props) {
    return <StyledMenu text="☰" {...props} />;
}

Menu.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

Menu.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};


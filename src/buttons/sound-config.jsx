import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";

const StyledSoundConfig = styled(Button)`
`;

export function SoundConfig(props) {
    return <StyledSoundConfig text={props.mute ? "🔇" : "🔊"} {...props} />;
}

SoundConfig.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

SoundConfig.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};

export default connect(({ audio }) => ({ mute: audio.mute }))(SoundConfig);

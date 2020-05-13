import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

const StyledButton = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;

    .body {
        fill: ${(props) => props.theme.background};
    }

    .border {
        stroke: ${props => props.theme.border};
        stroke-width: 2px;
        fill: none;
    }

    text {
        text-rendering: optimizeLegibility;
        fill: ${(props) => props.theme.color};
    }
`;

export default function Button({ text, onClick, enabled, theme, className, children }) {
    const [hasText, setHasText] = useState(false);

    useEffect(() => {
        setHasText(text !== null && typeof text !== "undefined");
    }, [text]);

    return (
        <StyledButton className={classNames(className, "button")} theme={theme} onClick={onClick}>
            <svg viewBox="0 0 64 64" width="100%" height="100%">
                <ButtonBody />
                {hasText && <ButtonText>{text}</ButtonText>}
            </svg>
        </StyledButton>
    );
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    onClick: PropTypes.func,
    enabled: PropTypes.bool.isRequired,
    on: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    align: PropTypes.oneOf(["top", "right", "bottom", "left", "center"]),
    theme: PropTypes.shape({
        background: PropTypes.string.isRequired,
        border: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
};

Button.defaultProps = {
    enabled: true,
    on: [],
    align: "center",
    theme: {
        background: "rgba(0, 0, 0, 0.75)",
        border: "white",
        color: "white",
    },
};

function ButtonBody() {
    return (
        <g transform="translate(32, 32)">
            <circle className="body" r="32" />
            <circle className="border" r="30" />
        </g>
    );
}

function ButtonText({ children }) {
    return (
        <g transform="translate(32, 32)">
            <text textAnchor="middle" alignmentBaseline="central">
                {children}
            </text>
        </g>
    );
}

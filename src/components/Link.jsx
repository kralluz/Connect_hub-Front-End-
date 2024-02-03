import React from "react";

const Link = ({ to, children }) => {
    return (
        <button onClick={() => (window.location.href = to)}>{children}</button>
    );
};

export default Link;

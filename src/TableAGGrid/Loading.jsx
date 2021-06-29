import React from "react";
import ReactLoading from "react-loading";

export default ({height, width, style, color}) => {

    return (
        <div className="loading-template" style={style}>
            <ReactLoading type="spin" color={color ? color : "#3AA33A"} height={height} width={width}/>
        </div>
    );
};

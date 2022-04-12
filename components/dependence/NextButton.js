import React from "react";

export default function NextButton(props) {
    return <div role="btn" className="s-next-btn flex jc-center a-center" onClick={props.Action}>
      <span className="s-next-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" style={
          {
            stroke: props.Color
          }
        } fill="none"><path d="M1.469 8H15.53m-6.561 6.682L15.53 8 8.97 1.318" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
      </span>
    </div>
  }
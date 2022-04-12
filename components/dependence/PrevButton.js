
export default function PrevButton(props) {
    return <div role="btn" className="s-prev-btn flex jc-center a-center" onClick={props.Action}>
      <span className="s-prev-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" style={
          {
            stroke: props.Color
          }
        } fill="none"><path d="M15.531 8H1.47m6.561 6.682L1.47 8l6.56-6.682" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
      </span>
    </div>
  }
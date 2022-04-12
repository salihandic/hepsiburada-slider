import React from "react";

export default function Header({ Content, Current, Color, Action }) {
    return Content.length && (
      <div className="s-header">
        <ul className="s-header-list flex">
          {
            Content.map((h, k) => {
              return <li className="s-header-item" key={k}>
                <div role="button" className={`s-header-btn ${k === Current.tab && 'Open'}`}
                  onClick={
                    () => Action(k)
                  }
                  style={
                    { color: k !== Current.tab ? Color.text : 'inherit' }
                  }
                >
                  {h.name}
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
}
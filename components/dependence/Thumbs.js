
export default function Thumbs({ Thums, Action, Current }) {
    return <ul className="flex row s-thumb-list">
      {
        Thums.map((e, k) => {
          return <li className="s-thumb-item" key={k}>
            <a className={`s-item-btn ${k === Current && 'Open'}`} onClick={() => Action(k)}>
              <div className="s-thumb-bg" style={{ backgroundImage: `url(${e.thumb})` }}></div>
            </a>
          </li>
        })
      }
    </ul>
  }
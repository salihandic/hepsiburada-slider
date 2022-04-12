
export default function MainContainer({ Content, Current, Color }) {
    return <div className="s-slider">
      <div className="flex w100 row" id="s-slider">
        {
          Content.map((e, k) => {
            return <div className={`s-slider-item flex ${Current.slide === k && 'Open'}`} key={k}>
              <div className='flex row jc-betweeen br10 w100'>
                <div className='flex s-left column fl1'>
                  <div className='flex s-head column jc-center'>
                    <span className='s-head-title'>{e.title}</span>
                    <span className='s-head-title-2'>{e.subtitle}</span>
                  </div>
                  <a className='btn-slider' href="#1" style={{ backgroundColor: Color.bg }}>
                    <span className="btn-text" style={{ color: Color.text }}>{e.btn}</span>
                  </a>
                </div>
  
                <div className='s-right'>
                  <a href="#1">
                    <div className="s-img-container">
                      <div className="s-img-pdt"></div>
                      <div className="img-item">
                        <img src={e.image}></img>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
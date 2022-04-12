import React, { useEffect, useState } from "react";

/**
 * Slider bağımlılıkları
 */
import Header from "./dependence/Header";
import MainContainer from "./dependence/MainContainer";
import Thumbs from "./dependence/Thumbs";
import PrevButton from "./dependence/PrevButton";
import NextButton from "./dependence/NextButton";
 
/**
 * Slider Verileri
 */
import { DATA } from './Data'



export default function Slider() {

  /**
   * Slider İşlemleri (Aktif olan Seçenek, Aktif olan Slayt)
   */
  const [getSlide, setSlide] = useState({ tab: 0, slide: 0 });

  /**
   * Aktif olan slayt fotoğraftan üretilen Arkaplan ve Metin rengi
   */
  const [getColor, setColor] = useState({ bg: 'rgb(236 236 236)', text: null });

  /**
   * Aktif Seçeniğin veri bilgisi (Aktif seçenek index numarasına göre varsayılan 0'dır)
   */
  const getActvieSlider = DATA[getSlide.tab];

  /**
   * Slaytın otomatik dönmesini sağlar
   */
  const sliderAutoplay = () => {
    const timer = setTimeout(Next, 3000);
    console.log(timer)
    clearTimeout(timer)

  };

  let timer;

  /**
   * @info Sonraki slayt (Buton Aksiyonu)
   */
  const Next = () => {
    /**
     * Sonraki slayt için varsayım
     */
    const nextItem = (getSlide.slide + 1);

    /**
     * Varsıyım gerçekleşebilir mi?
     */
    if (getActvieSlider.content.length > nextItem) {
      /**
       * Varsayımı gerçekleşir
       * Sonraki slaytı aktif eder
       */
      setSlide({ ...getSlide, slide: nextItem })
    }

    /**
    * Varsayım toplam aktif olan Seçenekteki slayt sayısına eşit ise
    * Ve Seçenek sayısı aktif olan seçenekten büyük ise 
    * Sonraki yeni Seçeneği aktif eder ve Aktif slaytı 0 olarak ayarlar
    */
    else if (getActvieSlider.content.length === nextItem && DATA.length > (getSlide.tab + 1)) {
      setSlide({ tab: getSlide.tab + 1, slide: 0 })
    }
    /**
     * Varsayımlar geçersiz ise ilk Seçeneğin ilk slaydını aktif eder
     */
    else {
      setSlide({ tab: 0, slide: 0 })
    }
  };

  const Prev = () => {
    /**
     * Aktif slayt 0'dan büyükse bir önceki slaytı aktif eder
     */
    if (getSlide.slide > 0) {
      setSlide({ ...getSlide, slide: getSlide.slide - 1 })
    }
    /**
     * Aktif slayt 0'a eşitse Seçenekler kontrol edilir
     */
    else if (getSlide.slide === 0) {
      /**
       * Aktif Seçenek 0'dan büyükse bir önceki Seçeneği aktif eder
       * Önceki butonu tıklandığı için Seçenekteki son slayt aktif edilir 
       */
      if (getSlide.tab > 0) {
        setSlide({ tab: getSlide.tab - 1, slide: DATA[getSlide.tab - 1].content.length - 1 })
      }
      /**
       * Aktif Seçenek 0'a eşitse Mevcut seçeneklerin sayısından 1 düşürülürek son Seçenek aktif edilir.
       * Son seçeneğin son slaytı aktif edilir
       */
      else if (getSlide.tab === 0) {
        const newTab = (DATA.length - 1);
        setSlide({ tab: newTab, slide: DATA[newTab].content.length - 1 })
      }
    }
  };


  // timer = setInterval( Next, 3000);
  /**
   * 
   */
  const changeBackgroundColor = async () => {
    /**
     * Color thief (Fotoğraftaki baskın rekleri ayıklar)
     */
    const colorThief = new ColorThief();

    /**
     * Arka plan rengine göre metin rengini Siyah/Beyaz olarak çevirir
     * @param {array} h 
     */
    const textColor = function (h) {
      const r = (h[0] * 299) + (h[1] * 587) + (h[2] * 114);
      const k = Math.round(r / 1080);
      return k > 190 ? '#484848' : '#ffffff';
    };

    /**
     * Slayt fotoğrafından baskın rengi alır
     * @param {html} image 
     */
    const detectColor = (image) => {
      // Baskın rengi birleştirir
      const bg = colorThief.getColor(image).join(',')
      // Baskın ilk rengi metin için çevir
      const text = textColor(colorThief.getPalette(image, 2)[0]);

      setColor({
        bg: `rgb(${bg})`,
        text: text
      })
    };

    /**
     * Arkaplan rengi oluşturmak için fotoğrafı işler
     */
    const image = new Image();
    image.src = DATA[getSlide.tab].content[getSlide.slide].image;
    image.crossOrigin = 'Anonymous';
    image.complete ? await detectColor(image) : image.addEventListener('load', async function () {
      return await detectColor(image)
    })
  };

  useEffect(() => {
    // sliderAutoplay()
    // clearInterval(timer)
    
    /**
     * Aktif fotoğraftan baskın rengi alır
     */
    changeBackgroundColor(getSlide.slide)

  }, [getSlide])

  return (
    <div className='sliderRoot'>
      <div className='flex column w100 h100'>

        <div className="s-content" style={{ backgroundColor: getColor.bg }}>

          <div className="s-conteiner">

            <Header
              Content={DATA}
              Current={getSlide}
              Color={getColor}
              Action={(k) => setSlide({ tab: k, slide: 0 })}
            ></Header>

            <MainContainer Content={getActvieSlider.content} Current={getSlide} Color={getColor}></MainContainer>

            <div className="s-thumb-content flex row jc-center">
              
              <PrevButton Action={Prev} Color={getColor.text}></PrevButton>
              
              <Thumbs
                Thums={getActvieSlider.content}
                Action={(k) => setSlide({ ...getSlide, slide: k })}
                Current={getSlide.slide}
              ></Thumbs>

              <NextButton Action={Next} Color={getColor.text}></NextButton>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}













import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import './styles/styles.scss';
import {Box, Flex, useColorMode} from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useCustomTheme from "@/hooks/useTheme";

// const isEqual = require("react-fast-compare");

export function CustomCarousel(props: any) {
  const [slideTotal, setSlideTotal] = useState(0);
  const [slideCurrent, setSlideCurrent] = useState(-1);
  const [slides, setSlides]: any = useState([]);
  const [height, setHeight] = useState('0px');
  const intervalRef: any = useRef(null);
  const nextRef: any = useRef(null);
  const handlers = useSwipeable({
    onSwipedLeft: () => slideRight(),
    onSwipedRight: () => slideLeft(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();


  useEffect(() => {
    const locSlides: any = [];
    props.slides.forEach((slide: any) => {
      const slideobject = {
        class: 'slider-single proactivede',
        element: slide,
      };
      locSlides.push(slideobject);
    });
    if(props.slides.length === 2){
      props.slides.forEach((slide: any) => {
        const slideobject = {
          class: 'slider-single proactivede',
          element: slide,
        };
        locSlides.push(slideobject);
      });
    }
    setSlides(locSlides);
    setSlideTotal(locSlides.length - 1);
    setSlideCurrent(-1);
    if (slideCurrent === -1) {
      setTimeout(() => {
        nextRef.current?.click();
        if (props.autoplay) {
          intervalRef.current = setTimeout(() => {
            nextRef?.current?.click();
        }, props.interval);}
      }, 500);
    }
  }, [props.slides]);
  useEffect(()=>{ 
    if(slideCurrent === -1){
      setTimeout(() => {
        slideRight();
      }, 500);
    }
  },[slides,slideCurrent]);

  
  const slideRight = () => {
    let preactiveSlide;
    let proactiveSlide;
    let slideCurrentLoc = slideCurrent;
    
    const activeClass = 'slider-single active';
    const slide = [...slides];
    if (slideTotal > 1) {
      if (slideCurrentLoc < slideTotal) {
        slideCurrentLoc++;
      } else {
        slideCurrentLoc = 0;
      }
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      const activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }

      slide.forEach((slid, index) => {
        if (slid.class.includes('preactivede')) {
          slid.class = 'slider-single proactivede';
        }
        if (slid.class.includes('preactive')) {
          slid.class = 'slider-single preactivede';
        }
      });

      preactiveSlide.class = 'slider-single preactive';
      activeSlide.class = activeClass;
      proactiveSlide.class = 'slider-single proactive';
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);

      if (document.getElementsByClassName('slider-single active').length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName('slider-single active').length > 0) {
            const height = document.getElementsByClassName('slider-single active')[0].clientHeight;
            setHeight(`${height  }px`);
          }
        }, 500);
      }
      props.onSlideChange(slideCurrentLoc);
      if (props.autoplay) {
        clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(() => {
          nextRef?.current?.click();
        }, props.interval);
      }
    } else if (slide[0] && slide[0].class !== activeClass) {
      slide[0].class = activeClass;
      setSlides(slide);
      setSlideCurrent(0);
    }
  };
  const slideLeft = () => {
    if (slideTotal > 1) {
      let preactiveSlide;
      let proactiveSlide;
      let slideCurrentLoc = slideCurrent;
      const slide = [...slides];
      if (slideCurrentLoc > 0) {
        slideCurrentLoc--;
      } else {
        slideCurrentLoc = slideTotal;
      }

      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }
      let activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      slide.forEach((slid, index) => {
        if (slid.class.includes('proactivede')) {
          slid.class = 'slider-single preactivede';
        }
        if (slid.class.includes('proactive')) {
          slid.class = 'slider-single proactivede';
        }
      });
      preactiveSlide.class = 'slider-single preactive';
      activeSlide.class = 'slider-single active';
      proactiveSlide.class = 'slider-single proactive';
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);
      props.onSlideChange(slideCurrentLoc);
      if (document.getElementsByClassName('slider-single active').length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName('slider-single active').length > 0) {
            const height = document.getElementsByClassName('slider-single active')[0].clientHeight;
            setHeight(`${height }px`);
          }
        }, 500);
      }
    }
  };

  const sliderClass = (direction: any) => {
    let sliderClass = `slider-${direction}`;
    if (!props.arrows) {
      sliderClass = 'slider-disabled';
    } else if (props.arrows && !props.arrowBorders) {
      sliderClass = `slider-${direction}-noborders`;
    }
    return sliderClass;
  };

  return (
    <div className="react-3d-carousel" style={{ height }} {...handlers}>
          {slides && slides.length > 0
                && <div className="slider-container" >

                  <div className="slider-content">
                      {slides.map((slider: any, index: any) => (
                                <div className={slider.class} key={index}>
                                    <div className={sliderClass('left')} onClick={slideLeft}>
                                        <Flex justifyContent={"center"} alignItems={"center"} borderWidth={"1px"} borderColor={borderColor} width={"40px"} height={"40px"} rounded={"lg"} >
                                          <IoIosArrowBack color={colorMode === "light" ? "#5D70F9":bodyTextColor} size={"25px"} />
                                        </Flex>
                                    </div>
                                    <div className={sliderClass('right')} onClick={slideRight} ref={nextRef}>
                                        <Flex justifyContent={"center"} alignItems={"center"} borderWidth={"1px"} borderColor={borderColor} width={"40px"} height={"40px"} rounded={"lg"} >
                                            <IoIosArrowForward color={colorMode === "light" ? "#5D70F9":bodyTextColor} size={"25px"} />
                                        </Flex>
                                    </div>

                                    <div className="slider-single-content">
                                        {slider.element}
                                    </div>
                                </div>
                      ))}
                    </div>

                </div>}
        </div>
  );
}
CustomCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.element),
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
  arrows: PropTypes.bool,
  arrowBorders: PropTypes.bool,
  onSlideChange:PropTypes.func
};
CustomCarousel.defaultProps = {
  autoplay: false,
  interval: 3000,
  arrows: true,
  arrowBorders: true,
  onSlideChange:function(){

  }
};
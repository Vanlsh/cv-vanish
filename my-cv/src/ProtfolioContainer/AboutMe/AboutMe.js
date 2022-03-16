import React, {useEffect} from 'react';
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import './AboutMe.css'

const AboutMe = (props) => {
    let  fadeInScreenHandler = (screen) => {
        if(screen.fadeInScreen !== props.id)
            return
        Animations.animations.fadeInScreen(props.id)
    }
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    const SCREEN_CONSTANTS = {
        description: 'I am Ivan, programmer-beginner. When I had finished studying KPI I realized that electrical engineering is not the way I would like to grow up. That`s why I decided to try myself in web developing. I started with three basic, connected languages: Javascript, CSS, HTML. During my studying I have been using Youtube, learn.javascript.ru and David Flanagan`s book “JavaScript: The Definitive Guide: Activate Your Web Pages” as a source of additional information. Now I study React and try to find job at the position of wed developing.',
        highlight: {
            bullets:[
                "Web development",
                "Node.js",
                "React.js",
                "Managing database",
            ],
            heading: "Here are a Few Highlights:"
        }
    }
    const renderHighlight = () => {
      return SCREEN_CONSTANTS.highlight.bullets.map((value, i) => {
          return(
              <div className='highlight' key={i}>
                  <div className='highlight-blob'></ div>
                  <span>{value}</span>
              </div>
              )
          })
    }
    useEffect(() => {
        return () => {
            /* UNSUBSCRIBE THE SUBSCRIPTIONS */
            fadeInSubscription.unsubscribe();
        };
    }, [fadeInSubscription]);
    return (
        <div className='about-me-container screen-container fade-in' id={props.id || ""}>
            <div className='about-me-parent'>
                <ScreenHeading title={'About Me'} subHeading={'Why Choose Me?'}/>
                <div className='about-me-card'>
                    <div className='about-me-profile'></div>
                    <div className='about-me-details'>
                        <span className='about-me-description'>{SCREEN_CONSTANTS.description}</span>
                        <div className='about-me-highlights'>
                            <div className='highlights-heading'>
                                <span>{SCREEN_CONSTANTS.highlight.heading}</span>
                            </div>
                            {renderHighlight()}
                        </div>
                        <div className='about-me-options'>
                            <button className="btn primary-btn"
                            onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
                            >
                                {""}
                                Hire me{" "}
                            </button>
                            <a href="ivan.pdf" download="Ivan ivan.pdf">
                                <button className="btn highlighted-btn">Get Resume</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
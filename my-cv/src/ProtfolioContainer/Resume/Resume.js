import React, {useState,useEffect} from 'react';
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import './Resume.css'

const Resume = (props) => {
    const [selectedBulletIndex,setSelectedBulletIndex] = useState(0)
    const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({})

    let  fadeInScreenHandler = (screen) => {
        if(screen.fadeInScreen !== props.id)
            return
        Animations.animations.fadeInScreen(props.id)
    }
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    const ResumeHeading = (props) => {
        return (
            <div className='resume-heading'>
                <div className='resume-main-heading'>
                    <div className='heading-bullet'></div>
                        <span>{props.heading ? props.heading: ''}</span>
                        {props.fromDate && props.toDate ? (
                            <div className='heading-date'>
                                {props.fromDate + "-" + props.toDate}
                            </div>
                        ): (
                            <div></div>
                        )}
                </div>
                <div className='resume-sub-heading'>
                    <span>{props.subHeading ? props.subHeading : ''}</span>
                </div>
                <div className='resume-heading-description'>
                    <span>{props.description ? props.description: ''}</span>
                </div>
            </div>
        )
    }

    const resumeBullets = [
        {label: "Education", logoScr: 'education.png'},
        {label: "Skills", logoScr: 'programming-skills.png'},
        {label: "Project", logoScr: 'project.png'},
        {label: "Interests", logoScr: 'interests.png'}
    ]
    const programmingSkillDetails = [
        {skill: "JavaScript", ratingPercentage: 70},
        {skill: "React JS", ratingPercentage: 60},
        {skill: "Express JS", ratingPercentage: 40},
        {skill: "Node JS", ratingPercentage: 60},
        {skill: "CSS", ratingPercentage: 60},
        {skill: "HTML", ratingPercentage: 40},
        {skill: "SQL", ratingPercentage: 40},
    ];

    const projectDetails = [
        {
            title: "Personal Portfolio Website",
            duration: { fromDate: "2020", toDate: "2021" },
            description:
                "A Personal Portfolio website to showcase all my details and projects at one place.",
            subHeading: "Technologies Used: React JS, Bootstrap",
        },
        {
            title: "Ecommerce Website ",
            duration: { fromDate: "2020", toDate: "2021" },
            description:
                "Online ecommerce website for showcasing and selling products online with payment system integration, both Paypal and Stripe",
            subHeading:
                "Technologies Used: Mongo DB, Express Js, React Js, Node JS, Redux, Bootstrap.",
        },
    ]

    const resumeDetails = [
        <div className='resume-screen-container' key="education">
            <ResumeHeading
             heading={"Statute of the National Technical University of Ukraine “KPI”"}
             subHeading={"Institute of Energy Conservation and Energy Management"}
             fromDate={"2017"}
             toDate={"2021"}
             ></ResumeHeading>
        </div>,
        <div className='resume-screen-container programming-skills-container'
        key='programming-skills'
        >
            {programmingSkillDetails.map((skill, index) => {
                return (
                    <div className='skill-parent' key={index}>
                        <div className='heading-bullet'></div>
                        <span>{skill.skill}</span>
                        <div className='skill-percentage'>
                            <div style={{width: skill.ratingPercentage + '%'}}
                            className='active-percentage-bar'>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>,
        <div className='resume-screen-container' key='projects'>
            {projectDetails.map((projectDetails, index) => {
                return (
                    <ResumeHeading key={index}
                    heading={projectDetails.title}
                    subHeading={projectDetails.subHeading}
                    description={projectDetails.description}
                    toDate={projectDetails.duration.toDate}></ResumeHeading>
                )
            })}
        </div>,
        <div className='resume-screen-container' key='interests'>
            <ResumeHeading
            heading='Equestrian sports'
            description='I have been doing equestrian spots since I was 11 years old.'
             />
            <ResumeHeading
            heading='Competitive Gaming'
            description='In free time I like to play in CS:GO and others competitive shooters.'
            />
        </div>
    ]

    const  handleCarousal = (index) => {
        let offsetHeight = 360;
        let newCarousalOffset = {
            style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
        };
        setCarousalOffSetStyle(newCarousalOffset);
        setSelectedBulletIndex(index);
    };

    const getResumeScreen = () => {
        return (
            <div
            style={carousalOffSetStyle.style}
            className='resume-details-carousal'
            >{resumeDetails.map((resumeDetail) => resumeDetail)}
            </div>
        )
    }

    const getBullets = () => {
        return resumeBullets.map((bullet, index) => {
            return (
                <div
                onClick={() => handleCarousal(index)}
                className={index=== selectedBulletIndex ? "bullet  selected-bullet" : "bullet"}
                key={index}
                >
                    <img className='size bullet-logo'
                    src={require(`../../assets/Resume/${bullet.logoScr}`)}
                    alt='oops... no internet connection'
                    />
                    <span className="bullet-label">{bullet.label}</span>
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

    return(
        <div className='resume-container screen-container fade-in' id={props.id || ""}>
            <div className='resume-content'>
                <ScreenHeading title={'Resume'} subHeading={'My Formal Bio Details'}/>
                <div className='resume-card'>
                    <div className='resume-bullets'>
                        <div className='bullet-container'>
                            <div className='bullet-icon'></div>
                            <div className='bullets'>{getBullets()}</div>
                        </div>
                    </div>
                    <div className='resume-bullet-details'>{getResumeScreen()}</div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
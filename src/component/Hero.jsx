import React, { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideo = 4;
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  const upComingVideoIndex = (currentIndex % totalVideo) + 1;
  const nextVideoRef = useRef(null);

  useEffect(() => {
    if (loadedVideo === totalVideo-1) {
      setIsLoading(false);
    }
  }, [loadedVideo]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };

  const handleVideoLoad = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden ">
      {isLoading && (
        <div className="flex-center absolute z-[100] bg-violet-50 h-dvh w-screen overflow-hidden">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniVdClick}
            >
              <video
                loop
                muted
                autoPlay
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                src={getVideoSrc(upComingVideoIndex)}
                ref={nextVideoRef}
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            loop
            muted
            autoPlay
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideo - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            onLoadedData={handleVideoLoad}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
        <h1 className="special-font z-40 text-blue-75 absolute bottom-5 right-5 hero-heading">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 ">
              Enter the Metagae Layes <br />
              Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font text-black absolute bottom-5 right-5 hero-heading">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;

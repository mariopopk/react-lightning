import React, { useState } from "react";
import styles from "./Carousel.css";
import cx from "classnames";
import AspectRatioBox from "../AspectRatioBox";

export interface CarouselProps {
  slides: CarouselItem[];
  height: number;
  viewableSlides: number;
}

export interface CarouselItem {
  id: string;
  link: string;
  img: string;
}

export interface CarouselItemProps extends CarouselItem {
  i: number;
  activeIndex: number;
  viewableSlides: number;
  height: number;
}

export default function Carousel({
  slides,
  viewableSlides = 4,
  height = 450,
}: CarouselProps) {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) viewableSlides = 2;

  let [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (moveForward: boolean) => {
    if (moveForward) {
      next();
    } else {
      prev();
    }
  };

  const canSlideLeft = activeIndex > 0;
  const canSlideRight = activeIndex < slides.length - viewableSlides;

  function next() {
    if (canSlideRight) setActiveIndex(activeIndex + 1);
  }

  function prev() {
    if (canSlideLeft) setActiveIndex(activeIndex - 1);
  }

  if (!slides || !slides.length)
    return <div className="alert alert-secondary">Nothing to show</div>;
  else
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          {slides.map(({ id, link, img }: CarouselItem, i: number) => {
            return (
              <CarouselItem
                key={id}
                viewableSlides={viewableSlides}
                activeIndex={activeIndex}
                link={link}
                img={img}
                i={i}
                height={height}
                id={id}
              />
            );
          })}
        </div>
        <button
          onClick={() => {
            handleClick(false);
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            handleClick(true);
          }}
        >
          Next
        </button>
      </div>
    );
}

function CarouselItem({
  link,
  img,
  i,
  activeIndex,
  viewableSlides,
  height,
}: CarouselItemProps) {
  const lastSlideInRange = activeIndex + viewableSlides - 1;
  const isSlideViewable = i >= activeIndex && i <= lastSlideInRange;

  return (
    <div
      style={{ width: isSlideViewable ? 100 / viewableSlides + "%" : 0 }}
      className={cx(styles["multicarousel-slide"], {
        [styles.show]: isSlideViewable,
      })}
    >
      <AspectRatioBox aspectRatio={{ w: 16, h: 9 }}>
        <a href={link} style={{ marginRight: "1rem" }}>
          <img
            alt=""
            src={img}
            style={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </a>
      </AspectRatioBox>
    </div>
  );
}

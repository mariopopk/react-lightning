import React, { useState } from "react";
import styles from "./Carousel.css";
import cx from "classnames";

export interface CarouselProps {
  slides: CarouselItem[];
  height: number;
  viewableSlides: number;
  carouselName: string;
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
  carouselName,
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

  const handleKeyDown = (event: any) => {
    event.target.parentElement.focus();
    console.log(event.key);
    if (event.key === "ArrowRight") {
      next();
    } else if (event.key === "ArrowLeft") {
      prev();
    } else if (event.key === "Enter") {
      event.target.parentElement.querySelector(".show a").click();
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

  console.log(activeIndex);
  if (!slides || !slides.length)
    return <div className="alert alert-secondary">Nothing to show</div>;
  else
    return (
      <div className={styles.carousel}>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          {slides.map(
            ({ id, link, title, price, img }: CarouselItem, i: number) => {
              return (
                <CarouselItem
                  key={id}
                  viewableSlides={viewableSlides}
                  activeIndex={activeIndex}
                  link={link}
                  title={title}
                  price={price}
                  img={img}
                  i={i}
                  height={height}
                />
              );
            }
          )}
        </div>
        <button
          onClick={() => {
            handleClick(false);
          }}
          tabIndex={-1}
        >
          Previous
        </button>
        <button
          onClick={() => {
            handleClick(true);
          }}
          tabIndex={-1}
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

  function calcSlideWidth(isSlideViewable: boolean, viewableSlides: number) {
    return isSlideViewable ? 100 / viewableSlides + "%" : 0;
  }

  return (
    <div
      style={{ width: calcSlideWidth(isSlideViewable, viewableSlides) }}
      className={cx(styles["multicarousel-slide"], {
        [styles.show]: isSlideViewable,
      })}
    >
      <a className=" text-decoration-none" href={link}>
        <div className={styles["multicarousel-slide-container"]}>
          <img
            alt=""
            src={img}
            style={{
              height: height,
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
      </a>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./Carousel.css";

export interface CarouselProps {
  slides: CarouselItem[];
  height: number;
  viewableSlides: number;
  carouselName: string;
}

export interface CarouselItem {
  id: string;
  link: string;
  title: string;
  price: number;
  img: string;
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
      <div className="carousel">
        <div className="row flex-nowrap">
          {slides.map(
            ({ id, link, title, price, img }: CarouselItem, i: number) => {
              return (
                <TestingSlide
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
          className={
            "carousel-control-prev " + (canSlideLeft ? "" : "disabled")
          }
          type="button"
          data-bs-target={"#" + carouselName}
          data-bs-slide="prev"
          onClick={() => {
            handleClick(false);
          }}
          tabIndex={-1}
        >
          <i className="bi bi-arrow-left-short text-primary display-5"></i>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className={
            "carousel-control-next " + (canSlideRight ? "" : "disabled")
          }
          type="button"
          data-bs-target={"#" + carouselName}
          data-bs-slide="next"
          onClick={() => {
            handleClick(true);
          }}
          tabIndex={-1}
        >
          <i className="bi bi-arrow-right-short text-primary display-5"></i>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
}

function TestingSlide({
  link,
  title,
  price,
  img,
  i,
  activeIndex,
  viewableSlides,
  height,
}: any) {
  const lastSlideInRange = activeIndex + viewableSlides - 1;
  const isSlideViewable = i >= activeIndex && i <= lastSlideInRange;

  function calcSlideWidth(isSlideViewable: boolean, viewableSlides: number) {
    return isSlideViewable ? 100 / viewableSlides + "%" : 0;
  }

  return (
    <div
      style={{ width: calcSlideWidth(isSlideViewable, viewableSlides) }}
      className={"multicarousel-slide " + (isSlideViewable ? "show" : "")}
    >
      <a className=" text-decoration-none" href={link}>
        <div className="multicarousel-slide-container">
          <img
            // src={resolveHost(img.url)}
            alt={img.alt}
            style={{
              height: height,
              objectFit: "cover",
              width: "100%",
            }}
          />
          <div className="">
            <p className="small-title my-2 overflow-hidden text-nowrap text-truncate">
              {title}
            </p>
            <span className="text-muted">{price}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

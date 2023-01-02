import React, { useEffect, useRef, useState, RefObject } from "react";
import styles from "./Carousel.css";
import cx from "classnames";
import AspectRatioBox from "../AspectRatioBox";
import Button from "../Button";

export interface CarouselProps {
  items: CarouselItemProps[];
  inScreenItems: number;
}

export interface CarouselItemProps {
  id: string;
  link: string;
  img: string;
}

export interface useSlideCarouselProps {
  inScreenItems: number;
  totalItems: number;
  carouselRef: RefObject<HTMLDivElement>;
}

function useSlideCarousel({
  inScreenItems,
  totalItems,
  carouselRef,
}: useSlideCarouselProps) {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [positionX, setPositionX] = useState(0);
  // Assumes each item is the same width
  const totalWidth = (containerWidth / inScreenItems) * totalItems;
  const offScreenItemsWidth = totalWidth - containerWidth;
  const itemWidth = totalWidth / totalItems;

  // Resizing
  useEffect(() => {
    // TODO: Throttle for performance
    const getCarouselWidth = () => {
      setContainerWidth(carouselRef.current?.clientWidth || 0);
    };
    getCarouselWidth();
    window.addEventListener("resize", getCarouselWidth);
    return () => {
      window.removeEventListener("resize", getCarouselWidth);
    };
  }, []);

  function enforceBounds(x: number) {
    const lowerBound = 0;
    const upperBound = -offScreenItemsWidth;

    // Bounds
    if (x < upperBound) x = upperBound;
    if (x > lowerBound) x = lowerBound;

    return x;
  }

  function move(direction: "left" | "right", multiplier: number = 1) {
    setPositionX((positionX) => {
      const moveDirection = direction === "left" ? 1 : -1;
      let currentItem = Math.round(positionX / itemWidth);

      currentItem += moveDirection * multiplier;
      return enforceBounds(currentItem * itemWidth);
    });
  }

  return {
    positionX,
    move,
  };
}

export default function Carousel({ items, inScreenItems = 4 }: CarouselProps) {
  // State
  const carouselRef = useRef<HTMLDivElement>(null);

  const { positionX, move } = useSlideCarousel({
    carouselRef,
    inScreenItems,
    totalItems: items.length,
  });

  return (
    <div style={{ padding: "0 5%", position: "relative", overflow: "hidden" }}>
      <div className={cx(styles["carousel-button-container"], styles.left)}>
        <Button
          style={{ width: "100%" }}
          onPress={() => {
            move("left", inScreenItems);
          }}
          backgroundColor="transparent"
          color="light"
        >
          {"<"}
        </Button>
      </div>

      <div
        className={styles["carousel-inner"]}
        ref={carouselRef}
        style={{
          whiteSpace: "nowrap",
          transform: `translate(${positionX}px, 0px)`,
          transition: "ease-out 0.75s",
          overflowX: "unset",
        }}
      >
        {items.map(({ id, link, img }: CarouselItemProps, i: number) => {
          return (
            <div
              key={id}
              className={styles["carousel-item"]}
              style={{
                width: `${100 / inScreenItems}%`,
              }}
            >
              <AspectRatioBox aspectRatio={{ w: 16, h: 9 }}>
                <div style={{ margin: "0.1rem" }}>
                  <img
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      width: "100%",
                    }}
                    src={img}
                  />
                </div>
              </AspectRatioBox>
            </div>
          );
        })}
      </div>

      <div className={cx(styles["carousel-button-container"], styles.right)}>
        <Button
          style={{ width: "100%" }}
          onPress={() => {
            move("right", inScreenItems);
          }}
          backgroundColor="transparent"
          color="light"
        >
          {/* Next */}
          {">"}
        </Button>
      </div>
    </div>
  );
}

function CarouselItem({ link, img }: CarouselItemProps) {
  return (
    <AspectRatioBox aspectRatio={{ w: 16, h: 9 }}>
      <img
        alt=""
        src={img}
        style={{
          height: "100%",
          objectFit: "cover",
          width: "100%",
        }}
      />
    </AspectRatioBox>
  );
}

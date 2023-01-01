import React, {
  createRef,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Carousel.css";
import cx from "classnames";
import AspectRatioBox from "../AspectRatioBox";
import Button from "../Button";
import { useMove } from "react-aria";

export interface CarouselProps {
  items: CarouselItemProps[];
  inScreenItems: number;
}

export interface CarouselItemProps {
  id: string;
  link: string;
  img: string;
}

export interface useSlideCarouselProps {}

const useSlideCarousel = ({}: useSlideCarouselProps) => {};

export default function Carousel({ items, inScreenItems = 4 }: CarouselProps) {
  // style
  const itemMarginXInRem: number = 0.25;

  // State
  const carouselRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

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

  let { moveProps } = useMove({
    onMove(e) {
      // Assumes each item is the same width
      const totalWidth = (containerWidth / inScreenItems) * items.length;
      const offScreenItemsWidth = totalWidth - containerWidth;

      setPosition(({ x, y }) => {
        // Normally, we want to allow the user to continue
        // dragging outside the box such that they need to
        // drag back over the ball again before it moves.
        // This is handled below by clamping during render.
        // If using the keyboard, however, we need to clamp
        // here so that dragging outside the container and
        // then using the arrow keys works as expected.
        if (e.pointerType === "keyboard") {
          // x = clamp(x);
          // y = clamp(y);
        }

        // Update x value
        x += e.deltaX;

        const lowerBound = 0;
        const upperBound = -offScreenItemsWidth;

        // Bounds;
        if (x < upperBound) {
          x = upperBound;
        }
        if (x > lowerBound) {
          x = lowerBound;
        }

        return { x, y };
      });
    },
  });

  return (
    <div style={{ padding: "0 5%", position: "relative", overflow: "hidden" }}>
      <div
        className={cx(styles["carousel-button"], styles.left)}
        style={{ left: 0 }}
      >
        <Button backgroundColor="light">Previous</Button>
      </div>

      <div
        ref={carouselRef}
        {...moveProps}
        style={{
          whiteSpace: "nowrap",
          transform: `translate(${position.x}px, 0px)`,
        }}
        tabIndex={0}
      >
        {items.map(({ id, link, img }: CarouselItemProps, i: number) => {
          return (
            <div
              className={styles["carousel-item"]}
              style={{
                width: `${
                  (100 - (inScreenItems - 1) * itemMarginXInRem) / inScreenItems
                }%`,
                marginRight: i > inScreenItems ? "0" : `${itemMarginXInRem}rem`,
              }}
            >
              <AspectRatioBox aspectRatio={{ w: 16, h: 9 }}>
                {/* <a href="/"> */}
                <img
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    width: "100%",
                  }}
                  src={img}
                />
                {/* </a> */}
              </AspectRatioBox>
            </div>
          );
        })}
      </div>

      <div
        className={cx(styles["carousel-button"], styles.right)}
        style={{ right: 0 }}
      >
        {/* <Button backgroundColor="light">Next</Button> */}
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

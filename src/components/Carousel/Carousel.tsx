import React, {
  createRef,
  CSSProperties,
  useEffect,
  useRef,
  useState,
  RefObject,
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

  const moveOne = (direction: "left" | "right") =>
    setPositionX((positionX) => {
      const moveDirection = direction === "left" ? 1 : -1;
      let currentItem = Math.round(positionX / itemWidth);

      currentItem += moveDirection;
      return enforceBounds(currentItem * itemWidth);
    });

  function moveMany(direction: "left" | "right") {
    const moveDirection = direction === "left" ? 1 : -1;
    let currentItem = Math.round(positionX / itemWidth);
    currentItem += moveDirection * inScreenItems;
    return enforceBounds(currentItem * itemWidth);
  }

  const { moveProps } = useMove({
    onMove(e) {
      setPositionX((x) => {
        // Normally, we want to allow the user to continue
        // dragging outside the box such that they need to
        // drag back over the ball again before it moves.
        // This is handled below by clamping during render.
        // If using the keyboard, however, we need to clamp
        // here so that dragging outside the container and
        // then using the arrow keys works as expected.
        if (e.pointerType === "keyboard") {
          // x = clamp(x);
        }

        // Update x value
        x += e.deltaX;

        return enforceBounds(x);
      });
    },
  });

  return {
    moveProps: {
      ...moveProps,
    },
    positionX,
    moveOne,
    moveMany,
  };
}

export default function Carousel({ items, inScreenItems = 4 }: CarouselProps) {
  // State
  const carouselRef = useRef<HTMLDivElement>(null);

  const { moveProps, positionX, moveOne, moveMany } = useSlideCarousel({
    carouselRef,
    inScreenItems,
    totalItems: items.length,
  });

  return (
    <div style={{ padding: "0 5%", position: "relative", overflow: "hidden" }}>
      <div
        className={cx(styles["carousel-button"], styles.left)}
        style={{ left: 0 }}
      >
        <Button
          style={{ width: "100%" }}
          onPress={() => moveOne("left")}
          backgroundColor="transparent"
          color="light"
        >
          {"<"}
        </Button>
      </div>

      <div
        ref={carouselRef}
        {...moveProps}
        style={{
          whiteSpace: "nowrap",
          transform: `translate(${positionX}px, 0px)`,
          transition: "ease-out",
        }}
        onWheel={(e) => {
          const direction = e.deltaX === 1 ? "right" : "left";
          console.log(direction, "throttle?");
          throttle(() => {
            console.log("once");
          }, 1000);
        }}
        tabIndex={0}
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

      <div
        className={cx(styles["carousel-button"], styles.right)}
        style={{ right: 0 }}
      >
        <Button
          style={{ width: "100%" }}
          onPress={() => moveOne("right")}
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

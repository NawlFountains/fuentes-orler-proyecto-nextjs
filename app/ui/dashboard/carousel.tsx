'use client';
import { Product } from "@/app/lib/definitions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from 'next/link'

  
 
export function CarouselTransition( { products } : { products : Product[] } ) {
    const theme = {
        carousel: {
          defaultProps: {
            prevArrow: ({ loop, handlePrev, firstIndex }: { loop: boolean, handlePrev: () => void, firstIndex: boolean }) => {
              return (
                <button
                  onClick={handlePrev}
                  disabled={!loop && firstIndex}
                  className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
                >
                  <ChevronLeftIcon strokeWidth={3} className="-ml-1 h-7 w-7" />
                </button>
              );
            },
            nextArrow: ({ loop, handleNext, lastIndex }: { loop: boolean, handleNext: () => void, lastIndex: boolean }) => (
              <button
                onClick={handleNext}
                disabled={!loop && lastIndex}
                className="!absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
              >
                <ChevronRightIcon strokeWidth={3} className="ml-1 h-7 w-7" />
              </button>
            ),
            navigation: ({ setActiveIndex, activeIndex, length }: { setActiveIndex: (index: number) => void, activeIndex: number, length: number }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-3 w-3 cursor-pointer rounded-full transition-colors content-[''] ${
                      activeIndex === i ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            ),
            autoplay: false,
            autoplayDelay: 5000,
            transition: {
              type: "tween",
              duration: 0.5,
            },
            loop: false,
            className: "",
          },
          styles: {
            base: {
              carousel: {
                position: "relative",
                width: "w-full",
                height: "h-full",
                overflowX: "overflow-x-hidden",
                display: "flex",
              },
       
              slide: {
                width: "w-full",
                height: "h-full",
                display: "inline-block",
                flex: "flex-none",
              },
            },
          },
        },
      };
      
  return (
    // Add to carousel the theme defined above
    <Carousel 
    prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 flex h-10 w-10 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 flex h-10 w-10 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-black" : "w-4 bg-black/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )} >
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
        <Image key={product.id} src={product.image_url} alt={"Image of "+product.name} className="rounded-xl w-full h-full object-cover" width={800} height={800}/>
        </Link>
      ))}
    </Carousel>
  );
}
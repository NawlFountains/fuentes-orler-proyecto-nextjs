'use client';
import { Product } from "@/app/lib/definitions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Carousel, CarouselStylesType } from "@material-tailwind/react";
import Image from "next/image";
import Link from 'next/link'

  
 
export function CarouselTransition( { products } : { products : Product[] } ) {
    console.log("In carousel transition"+products)
    const theme = {
        carousel: {
          defaultProps: {
            prevArrow: ({ loop, handlePrev, firstIndex }: { loop: boolean, handlePrev: () => void, firstIndex: boolean }) => {
              return (
                <button
                  onClick={handlePrev}
                  disabled={!loop && firstIndex}
                  className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-black hover:bg-black/10 active:bg-black/30 grid place-items-center"
                >
                  <ChevronLeftIcon strokeWidth={3} className="-ml-1 h-7 w-7 " />
                </button>
              );
            },
            nextArrow: ({ loop, handleNext, lastIndex }: { loop: boolean, handleNext: () => void, lastIndex: boolean }) => (
              <button
                onClick={handleNext}
                disabled={!loop && lastIndex}
                className="!absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-black hover:bg-black/10 active:bg-black/30 grid place-items-center"
              >
                <ChevronRightIcon strokeWidth={3} className="ml-1 h-7 w-7 text-black" />
              </button>
            ),
            navigation: ({ setActiveIndex, activeIndex }: { setActiveIndex: (index: number) => void, activeIndex: number, length: number }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-3 w-3 cursor-pointer rounded-full transition-colors content-[''] ${
                      activeIndex === i ? "bg-black" : "bg-black/50"
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
    <Carousel transition={{ duration: 1 }} className="rounded-xl shadow-sm border border-gray-200 text-black">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
        <Image key={product.id} src={product.image_url} alt={"Image of "+product.name} className="rounded-xl w-full h-full object-cover" width={800} height={800}/>
        </Link>
      ))}
    </Carousel>
  );
}
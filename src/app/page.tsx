import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
export default function Home() {
  return (
    <main className="bg-primarydark overflow-x-hidden ">
      <section className=" relative">
        <img alt="" src="/pomegranate1.png" className="absolute  left-0 bottom-0" />

        <MaxWidthWrapper className="pb-24  pt-10 lg:grid lg:grid-cols-5 justify-between sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-4 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-white text-5xl md:text-4xl lg:text-5xl">
                Your Image on a{" "}
                <span className="bg-primary px-2  text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-gold" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-gold" />5 year print
                    guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-gold" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col  sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-1.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-2.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-3.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-4.jpg"
                    alt="user image"
                  />
                  <img
                    className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-5.jpg"
                    alt="user image"
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-gold fill-gold" />
                    <Star className="h-4 w-4 text-gold fill-gold" />
                    <Star className="h-4 w-4 text-gold fill-gold" />
                    <Star className="h-4 w-4 text-gold fill-gold" />
                    <Star className="h-4 w-4 text-gold fill-gold" />
                  </div>

                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
              <img alt="" src="/onestar.png" className="absolute -left-20 bottom-10" />
              <img
                alt=""
                src="/moonstar.png"
                className="absolute w-[100px] right-28 bottom-20"
              />
            </div>
          </div>

          <div className="col-span-full relative lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-52 lg:mx-0 lg:mt-28 h-fit">
            <div className="relative md:max-w-xl">
              <img
                alt=""
                src="/twostarts.png"
                className="absolute w-[98px]  right-60 -top-40 select-none hidden sm:block lg:hidden xl:block"
              />

              <p className="absolute text-4xl text-white left-40 -top-32 select-none hidden sm:block lg:hidden xl:block">
                Your
                <br />
                Painting
              </p>
              <img
                alt=""
                src="/line.png"
                className="absolute  -right-20 -top-6 select-none"
              />
              <Phone className="w-64" imgSrc="/paintingclip.png" />
            </div>
            <img
              alt=""
              src="/pomegranate.png"
              className="absolute  -right-40 -bottom-20 select-none"
            />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="h-full relative" >
        
      <img
        aria-hidden='true'
        alt=''
        src='/twostarts.png'
        className='absolute select-none hidden xl:block right-20 top-10'
      />
        <img
        aria-hidden='true'
        alt=''
        src='/pomegranatestar.png'
        className='absolute select-none hidden xl:block right-0 -bottom-28'
      />
        <Reviews />
      </section>
      <section className=" relative">
      <img
        aria-hidden='true'
        alt=''
        src='/twostarts.png'
        className='absolute select-none hidden xl:block right-52 bottom-32'
      />
        <img
        aria-hidden='true'
        alt=''
        src='/pomegranate.png'
        className='absolute select-none hidden xl:block left-0 bottom-10'
      />
        <MaxWidthWrapper className="py-24 relative">
          <img alt="" src="moonstar.png" className="absolute -left-10 top-32" />
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-white">
                Upload your photo and get{" "}
                <span className="relative px-2 bg-primary text-white">
                  your own case
                </span>{" "}
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                alt=""
                src="/arrow.png"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />

              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img
                  alt="Example custom phone case"
                  src="/fullpainting.png"
                  className="rounded-md object-cover border-white border-[20px] rounded-[2rem] shadow-2xl h-full w-full"
                />
              </div>

              <Phone className="w-60" imgSrc="/paintingclip.png" />
            </div>
          </div>

          <ul className=" mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-gold inline mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-gold inline mr-1.5" />
              Scratch- and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-gold inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-gold inline mr-1.5" />5 year print
              warranty
            </li>

          </ul>
            <div className="flex mx-auto justify-center">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
                href="/configure/upload"
              >
                Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}

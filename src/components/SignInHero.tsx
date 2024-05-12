import React from 'react'
import {StaticImageData} from "next/image";
import  Image  from 'next/image';

interface HeroProps  {
    ImgData: StaticImageData;
    title: string;
}

const SignInHero = (props: HeroProps) => {
  return (
    <div className="relative h-screen">
        <div className="absolute -z-10 inset-0">
            <Image
                src={props.ImgData}
                alt={props.title}
                style={{objectFit: 'cover'}}
                fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900"></div>
        </div>
        <div className="pt-48 flex justify-center items-center">
            <h1 className="text-white text-6xl">{props.title}</h1>
        </div>
    </div>
  )
}

export default SignInHero
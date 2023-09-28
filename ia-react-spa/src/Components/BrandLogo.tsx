import React from 'react';

const BrandLogo: React.FC = () => {
    const letterStlyes:string = "my-1 px-0.25 animate-bounce"

    return(
        <div className="
            flex justify-evenly mt-3 px-2
            text-4xl
            text-primary
            font-serif font-bold
            select-none
        ">
            <span className={`${letterStlyes}`}>I</span>
            <span className={`${letterStlyes} animation-delay-[1000ms]`}>V</span>
            <span className={`${letterStlyes} animation-delay-[1500ms]`}>Y</span>
            <span className="m-0.5 w-1"> </span>
            <span className={`${letterStlyes} animation-delay-[2000ms]`}>A</span>
            <span className={`${letterStlyes} animation-delay-[2500ms]`}>L</span>
            <span className={`${letterStlyes} animation-delay-[3000ms]`}>C</span>
            <span className={`${letterStlyes} animation-delay-[3500ms]`}>H</span>
            <span className={`${letterStlyes} animation-delay-[4000ms]`}>E</span>
            <span className={`${letterStlyes} animation-delay-[4500ms]`}>M</span>
            <span className={`${letterStlyes} animation-delay-[5000ms]`}>Y</span>
        </div>
    )
}

export default BrandLogo
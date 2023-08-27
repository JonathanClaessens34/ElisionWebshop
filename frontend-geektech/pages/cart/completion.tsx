import Link from 'next/link';
import { useEffect } from 'react';

const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";

export default function Completion() {
    useEffect(() => {
        localStorage.setItem('cart', '[]'); 
        localStorage.setItem('counter', '0');
        window.dispatchEvent(new Event("storage"));
    })
    return (
        <>
            <div className="grid grid-cols-1 gap-4 place-items-center ">
                <img className="rounded-t-lg h-72 m-auto p-5 scale-75 md:scale-100 lg:h-64 xl:h-56" src={`${AwsUrl}success.jpg`} />
                <h1 className="flex-initial pt-1 text-center text-main-text-color font-Lato text-4xl">Bedankt voor uw bestelling!</h1>
                <h1 className="flex-initial pt-1 text-main-text-color">Uw order is met succes geplaatst.</h1>
                <Link href="/"><button className='bg-button-color px-5 mt-3 text-white rounded-lg p-2 hover:drop-shadow-2xl'>Terug naar home</button></Link>
            </div>
        </>
    )
}
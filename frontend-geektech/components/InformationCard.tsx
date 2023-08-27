import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'; 
import {HiPencil} from 'react-icons/hi';
import {ImCross} from 'react-icons/im';
import {saveUser} from '../services/global';

export default function InformationCard(){
    interface User{
        streetName: string, 
        houseNumber: string, 
        postalCode: string, 
        city: string, 
        country: string, 
        email: string; 
    }

    const {register, handleSubmit, formState: {errors}} = useForm<User>(); 




    const [editInformation, setEditInformation] = useState(false); 
    const [user, setUser] = useState<User>(); 

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, []);

    const onSubmit = (data: any) => {
        saveUser(data); 
        setEditInformation(false); 
        setUser(JSON.parse(localStorage.getItem('user') || '{}'));
        window.dispatchEvent(new Event("user"));
    }

    return(
        <div className="border border-gray-300 rounded-xl p-3 mt-5 mb-5">
            <div className="flex w-full justify-between my-2">
                <h1 className="font-Lato text-xl font-bold text-main-text-color">Gegevens kader</h1>
                <button className="justify-self-end mr-3 text-gray-600 rounded-full font-bold" onClick={() => {setEditInformation(!editInformation)}}>{editInformation ? <ImCross className="mx-auto text-sm"></ImCross> : <HiPencil className="mx-auto text-xl"></HiPencil>}</button>
            </div>
            <div>
                {editInformation ? 
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col">
                                <label htmlFor="streetName">Straatnaam:<span className="text-error-color text-xl">*</span></label>
                                <input {...register("streetName", {required: "Straatnaam is verplicht.", value: user?.streetName})} name="streetName" placeholder="bv. Hoogstraat" type="text"  className="border rounded-full p-1 px-2 clear-both"></input>
                                <p className="text-error-color italic text-sm">{errors.streetName?.message}</p>
                            </div>
                            <div className="flex flex-col">
                                <label>HuisNr.:<span className="text-error-color text-xl">*</span></label>
                                <input {...register("houseNumber", {required: "Huisnummer is verplicht.", value: user?.houseNumber})} name="houseNumber" placeholder="bv. 15/2" type="text" className="border rounded-full p-1 px-2 clear-both"></input>
                                <p className="text-error-color italic text-sm">{errors.houseNumber?.message}</p>
                            </div>
                            <div className="flex flex-col">
                                <label>Postcode:<span className="text-error-color text-xl">*</span> </label>
                                <input 
                                {...register("postalCode", 
                                    {    
                                        required: "Postcode is verplicht.", 
                                        minLength: {value: 4, message: "Een postcode bevat miniaaml 4 cijfers."}, 
                                        maxLength: {value: 4, message: "Een postcode bevat maximaal 4 cijfers."},
                                        pattern: {value: /^[\d]*$/, message: "Een postcode bevat enkel cijfers."},
                                        value: user?.postalCode,
                                    }
                                )} name="postalCode" placeholder="bv. 1000" type="text" className="border rounded-full p-1 px-2 clear-both"></input>
                                <p className="text-error-color italic text-sm">{errors.postalCode?.message}</p>
                            </div>               
                            <div className="flex flex-col">
                                <label>Gemeente:<span className="text-error-color text-xl">*</span></label>
                                <input {...register("city", {required: "Gemeente is verplicht.", value: user?.city})} name="city" placeholder="bv. Brussel" type="text" className="border rounded-full p-1 px-2 clear-both"></input>
                                <p className="text-error-color italic text-sm">{errors.city?.message}</p>
                            </div>
                            <div className="flex flex-col">
                                <label>Land:<span className="text-error-color text-xl">*</span></label>
                                <input {...register("country", {required: "Land is verplicht.", value: user?.country})} name="country" placeholder="bv. België" type="text" className="border rounded-full p-1 px-2 clear-both"></input>
                                <p className="text-error-color italic text-sm">{errors.country?.message}</p>
                            </div>
                            <div className="flex flex-col">
                                <label>E-mail:<span className="text-error-color text-xl">*</span></label>
                                <input {...register("email", {required: "E-mail is verplicht.", value: user?.email})} name="email" placeholder="bv. Jan.Smets@gmail.com" type="email" className="border rounded-full p-1 px-2 clear-both"></input>
                                <p className="text-error-color italic text-sm">{errors.email?.message}</p>
                            </div>
                            <div className="w-full mt-5">
                                <button className="bg-button-color grid place-items-center text-white w-full py-1 rounded-2xl font-bold" type="submit">Opslaan</button>
                            </div>
                        </form>
                    </div>
                :
                    <div>
                        {user?.email != undefined ? 
                            <div className="flex flex-col">
                                <p className="font-bold my-3">{user?.email}</p>

                                <p>{user?.streetName} {user?.houseNumber}</p>
                                <p>{user?.postalCode.toString()} {user?.city}</p>
                                <p>{user?.country}</p>
                            </div>
                        :
                            <div>
                                <p className="italic text-sm mt-5">Er zijn geen gebruikers gegevens gekend.</p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
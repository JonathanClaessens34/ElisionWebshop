import React from 'react'
import { BiX } from 'react-icons/bi';

const CategoryBar = () => {
    const path = "http://localhost:3000/product?Geektech[refinementList][category][0]=";
    const pathSale = "http://localhost:3000/product?Geektech[refinementList][sale][0]=";
    return (
        <div className='categoryBar categoryBarLargeDisplay'>
            <ul className="categoryBarLgScreen">
                <li className='navbarItem flexMid'><a href={`${path}Smartphone`} className='navbarItemText'>Smartphones</a></li>
                <li className='navbarItem flexMid'><a href={`${path}Laptop`} className='navbarItemText'>Laptops</a></li>
                <li className='navbarItem flexMid'><a href={`${path}Televisie`} className='navbarItemText'>Televisies</a></li>
                <li className='navbarItem flexMid'><a href={`${path}Audio`} className='navbarItemText'>Geluidstoestellen</a></li>
                <li className='navbarItem flexMid'><a href={`${pathSale}Ja`} className='navbarItemText'>Acties</a></li>
            </ul>

            <div className="categoryBarSmScreen">
                <div className='categoryBarSmScreenHeader'>
                    <h3>Kies je categorie</h3>
                    <BiX className="categoryBarIcon" onClick={closeCategoryMenu} />
                </div>
                <ul className='categoryBarContent'>
                    <li className='categoryBarItem'><a href={`${path}Smartphone`} className='navbarItemText'>Smartphones</a></li>
                    <li className='categoryBarItem'><a href={`${path}Laptop`} className='navbarItemText'>Laptops</a></li>
                    <li className='categoryBarItem'><a href={`${path}Televisie`} className='navbarItemText'>Televisies</a></li>
                    <li className='categoryBarItem'><a href={`${path}Audio`} className='navbarItemText'>Geluidstoestellen</a></li>
                    <li className='categoryBarItem'><a href={`${pathSale}Ja`} className='navbarItemText'>Acties</a></li>
                </ul>
            </div>
        </div>
    )
    function closeCategoryMenu() {
        let categoryBar = document.getElementsByClassName('categoryBar') as HTMLCollectionOf<HTMLElement>;
        let categoryBarSmScreen = document.getElementsByClassName('categoryBarSmScreen') as HTMLCollectionOf<HTMLElement>;
        let navbar = document.getElementsByClassName('navbar') as HTMLCollectionOf<HTMLElement>;

        navbar[0].classList.remove("navbarIndex");
        categoryBar[0].classList.remove("categoryBarSmallDisplay");
        categoryBarSmScreen[0].classList.remove("categoryBarSmScreenBlock");
    }
}

export default CategoryBar
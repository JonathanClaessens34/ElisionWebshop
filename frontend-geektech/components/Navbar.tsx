import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch-hooks-web';
import { BiMenu, BiSearch, BiCart } from 'react-icons/bi';
import Link from 'next/link'

const Navbar = () => {
    const [searchResults, setSearchResults] = useState(false); 
    const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        setCounter(JSON.parse(localStorage.getItem('counter') || '0'));
        function checkCounter() {
            const data = JSON.parse(localStorage.getItem('counter') || '0');
            setCounter(data);
        }
        window.addEventListener('storage', checkCounter)
      
        return () => {
          window.removeEventListener('storage', checkCounter)
        }
      }, []);

    const searchClient = algoliasearch(
        'DWP4FJYQR3',
        '22ca09b492399bfa6561d190cf7e2516'
    );
    
    const Hit = ({ hit } : any) => (
        <a className='flex' href={`/detail/${hit.id}`}>
            <div className='w-1/4 grid place-content-center'>
                <img className="object-contain scale-110 rounded-sm h-14 float-left" src={`${AwsUrl}${hit.images[0]}`} alt="image product" />
            </div>
            <div className='w-3/4'>
                <p className='font-bold hover:underline-offset-1'>{hit.name}</p> 
            </div>
        </a>
    );

    function toggleVisible(){
        setSearchResults(!searchResults); 
    }

    return (
        <nav className="navbar">
            <div className="contentOfNavbar flexBetween">
                <div className='dropDownMenuNavBar flexLeft'>
                    <div className='navbarIconItem' onClick={openCategoryMenu} >
                        <BiMenu className="dropDownMenuIcon"/>
                    </div>
                </div>
                <a href={'/'} className='outerBoxLogo flexLeft'>
                    <img className="logo" src="https://geektechpictures.s3.us-west-2.amazonaws.com/images/geektech.svg" alt="Logo" />
                </a>
                <div className="search-box flexMid">
                    <InstantSearch
                    searchClient={searchClient} 
                    indexName='Geektech'
                    routing={true} 
                    >
                        <div id="navbarSearch">
                            <SearchBox className='searchbox' placeholder='Welkom, zoek een product'
                                onFocus={toggleVisible} 
                                onBlur={() => {
                                    setTimeout(() => {
                                        toggleVisible();
                                    }, 100); 
                                }}/>
                            <InfiniteHits hitComponent={Hit} className={"absolute " + (searchResults ? "" : "collapse") } />
                        </div>
                    </InstantSearch>
                    <button className="search-btn flexMid"><BiSearch className="searchIcon" /></button>
                </div>
                <div className='flexMid'>
                    <div className="navbarIconBlock flexBetween">
                        <div className='outerBoxLogo'>
                            <Link href='/cart/items' className='relative flex justify-end align-middle navbarIconItem float-right '>
                                <BiCart className="navbarIcon" />
                                {counter == 0 ? 
                                    ""
                                :
                                    <div className="cartCounter flexMid">
                                        <p className='cartCounterText'>{counter}</p>
                                    </div>    
                                }
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

    function openCategoryMenu() {
        let categoryBarSmScreen = document.getElementsByClassName('categoryBarSmScreen') as HTMLCollectionOf<HTMLElement>;
        let categoryBar = document.getElementsByClassName('categoryBar') as HTMLCollectionOf<HTMLElement>;
        let navbar = document.getElementsByClassName('navbar') as HTMLCollectionOf<HTMLElement>;


        navbar[0].classList.add("navbarIndex");
        categoryBar[0].classList.add("categoryBarSmallDisplay");
        categoryBarSmScreen[0].classList.add("categoryBarSmScreenBlock");
    }
}

export function Hit({hit}: any) {
    let product = {id: hit.id, name: hit.name, price: hit.price, description: hit.description, color: hit.color, images: hit.images, category: hit.category, brand: hit.brand};
    return <div>{product.name}</div>
}

export default Navbar

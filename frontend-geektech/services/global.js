let cart;
let itemAlreadyInCart = false;
let product; 

export function handleAddToCart(addedProduct) {
    product = addedProduct; 

    cart = JSON.parse(localStorage.getItem("cart") || '{}');
    
    //If there is already a cart => add new item to local storage or else => cartItem.amount =+ 1
    if (localStorage.getItem("cart")) {
        itemAlreadyInCart = false;
        cart.forEach(loopThroughCart);
        if (!itemAlreadyInCart) {
            let cartItem = {
                product: product,
                amount: 1
            };
            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    //No cart in local storage yet => create one with the cartItem that is clicked
    else {
        cart = [];
        let cartItem = {
            product: product,
            amount: 1
        };
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        
    }
    localStorage.setItem('counter', JSON.parse(localStorage.getItem('counter')) + 1);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("addProduct"));
};

function loopThroughCart(cartItem) {
    if (cartItem.product.id == product.id) {
        itemAlreadyInCart = true;
        cartItem.amount++;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

//LocalStorage (gast) user
export function saveUser(information = {}){
    const user = information; 
    localStorage.setItem("user", JSON.stringify(user)); 
} 

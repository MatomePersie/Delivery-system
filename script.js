function addToCart(name, price){

    let cart= JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem= cart.find(item=>item.name ===  name);
    if(existingItem){
        existingItem.quantity++;

    }
    else{
        cart.push({name,price,quantity:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert('${name} added to cart!');
}

function displayCart(){
    const cart= JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer=document.getElementById("cart-items");
    const totalPrice=document.getElementById("total-price");

    if(!cartItemsContainer || !totalPrice) return;
    
    cartItemsContainer.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{
        const itemTotal = item.price*item.quantity;
        total+= itemTotal;

        const itemHTML = `
        <div class="cart-item">
        <h3>${item.name}</h3>
        <p>R${item.price}x ${item.quantity} = R${itemTotal}</p>
        <div class="cart-controls">
            <button onclick="updateQuantity(${index},-1)">-</button>
            <button onclick="updateQuantity(${index},1)">+</button>
            <button onclick="RemoveItem(${index})">Remove</button>
         </div>
        </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    totalPrice.innerText = total.toFixed(2);
}

function updateQuantity(index,change){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if(cart[index].quantity <=0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function RemoveItem(index){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function checkout(){

    alert("checkout functionality coming soon");

}

window.onload = displayCart;
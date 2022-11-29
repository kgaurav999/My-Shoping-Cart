//In starting cart data is not availabe so we have to pull the data from local storage;

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("itemData")) || [];

//console.log(basket);
///for dislpay the the item in cart
let calculation = () => {
  let cartItem = document.getElementById("cartAmount");
  console.log(basket.map((data) => data.item).reduce((data, y) => data + y, 0));
  cartItem.innerHTML = basket
    .map((data) => data.item)
    .reduce((data, y) => data + y, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    // console.log("basket is not empty")
    return (shoppingCart.innerHTML = basket
      .map((data) => {
        let { id, item } = data;
        let search = shopItemsData.find((y) => y.id === id) || []; //y come from data.js and id come from basket
        return `
        <div class="cart-item">
            <img width='100' src=${search.img} alt=""/>
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>
                            ${search.name}
                        </p>
                        <p class="cart-item-price">
                            $ ${search.price}
                        </p>
                     
                    </h4>
                          <i onclick="removeItem(${id})" class="bi bi-x-lg"></i> 
                </div>

                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div> 
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>

                <h3>
                    $ ${item * search.price}
                </h3>
            </div>
        </div>
        `;
      })
      .join(""));
  } else {
    // console.log("basket is not empty");
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
       `;
  }
};

generateCartItems();



let increment = (id) => {
  //console.log(id)
  //let selectedItem = id;
  let search = basket.find((data) => data.id === id);
  if (search === undefined) {
    basket.push({ id: id, item: 1 });
  } else {
    search.item += 1;
  }

  //console.log(basket);
   generateCartItems();
  update(id);
    localStorage.setItem("itemData", JSON.stringify(basket));
};
let decrement = (id) => {
  let search = basket.find((data) => data.id === id);
  if (search === undefined)
    return; //if local storage is clear then we donot have to return any thing so if we find undefined just return
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(basket);
  update(id);

  
//when cart is zero then below lne run 
  basket = basket.filter((data) => data.item !== 0); // we are editing the local storage data if any item is not there the data from the local storage of such froduct removed
  generateCartItems();//when the cart have zero item for some product it will be dissapear because generatCartItem rerender all the item 
  localStorage.setItem("itemData", JSON.stringify(basket));
};


let update = (id) => {
  //console.log(id)

  let search = basket.find((data) => data.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};



let removeItem = (id)=>{
    basket = basket.filter((data)=>data.id!==id)
    generateCartItems();
    totalAmount();
    calculation()
      localStorage.setItem("itemData", JSON.stringify(basket));


}


//clear cart fun
let clearCart =()=>{
    basket=[]
    generateCartItems();
    calculation();
    localStorage.setItem("itemData", JSON.stringify(basket));
}

//removeItem();

//to get the total amount we go to data.js from their we will fetch the price and in local storage we can ssee that their is id and number of item we can multipy the the item with price to get the total amount
let totalAmount = ()=>{
    if(basket.length!==0){
        let amount = basket.map((data) => {
          let { item, id } = data;
          let search = shopItemsData.find((y) => y.id === id) || []; //y come from data.js and id come from basket
          return item*search.price;
          
        }).reduce((x,y)=>x+y,0)
   // console.log(amount);
   label.innerHTML = `
   <h2>Total Bill : $ ${amount}</h2>
   <button class="checkout">Checkout</button>
   <button onclick="clearCart()" class="removeAll">Clear Cart</button>         
   `;

    }
    else{
        return;
    }
}
totalAmount();
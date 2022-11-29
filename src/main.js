let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("itemData")) || [] //pulling the data from local storage;

//console.log(shop)
let generateShop=()=>{
    return (shop.innerHTML = shopItemsData.map(
      (data) =>
       {
        let{id,name,price,desc,img}=data;
        let search = basket.find((data)=>data.id===id) || []    //on every time we refrest value of the quantity will be search and stored
        return `
        <div id=product-id-${id}   class="item">
           <img width="220" src=${data.img} alt="">
           <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item===undefined ? 0 : search.item}</div> 
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
           </div> 

        </div>
        `;

       }).join(""));
};
generateShop()


let increment = (id)=>{
    
    //console.log(id)
    //let selectedItem = id;
    let search = basket.find((data)=> data.id === id);
    if(search===undefined) {
        basket.push({id:id,item:1});
    } 
    else{
        search.item += 1;
    }  
    localStorage.setItem("itemData",JSON.stringify(basket));
    //console.log(basket);
    update(id);

}
let decrement = (id)=>{
    let search = basket.find((data) => data.id === id);
    if(search===undefined)return;  //if local storage is clear then we donot have to return any thing so if we find undefined just return
    else if (search.item===0 ) return;
    else {
      search.item -= 1;
    }
   // console.log(basket);
    update(id);
   
    basket= basket.filter((data)=>data.item!==0);// we are editing the local storage data if any item is not there the data from the local storage of such froduct removed

    
     localStorage.setItem("itemData", JSON.stringify(basket));

}
let update = (id)=>{
    //console.log(id)

    let search = basket.find((data)=>data.id===id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = ()=>{
    let cartItem= document.getElementById("cartAmount");
    console.log(basket.map((data)=>data.item).reduce((data,y)=>data+y,0))
    cartItem.innerHTML = basket
      .map((data) => data.item)
      .reduce((data, y) => data + y,0);

}
calculation();  //this will help for run one time and get the total value in local storage and put it on card box.
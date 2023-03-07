// inicio declaracion de variables del menu

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// // fin de la declaracion de variables

// funcion para abrir el carrito
cartIcon.onclick = () =>{
    cart.classList.add("active");

}
// funcion para cerrar el carrito
closeCart.onclick = () =>{
    cart.classList.remove("active");

}
 
// funciones del carrito
//carga de carrito
if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

// funcion para borrar
function ready(){
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for(var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // funcion de cambiar cantidades
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // agregar al carrito
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }
    //declaracion del boto de compra
    document.getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClick);

}

//funcion de la compra
function buyButtonClick(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'compra finalizada gracias por comprar',
        showConfirmButton: false,
        timer: 1500
      })
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();

}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

//funcio de cantidad---evitamos que la cantidad se mayor a 1
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//funcion de agregar
//funcion de optencion de datos  
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerHTML;
    var price = shopProducts.getElementsByClassName("price")[0].innerHTML;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductTocart(title,price,productImg);
    updatetotal();
}

// funcion de agregar al carrito
function addProductTocart(title, price, productImg){
    var cartshopbox = document.createElement("div");
    cartshopbox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByTagName("cart-product-title");
    for(var i = 0; i < cartItemNames.length; i++){
        return;
    }

var cartBoxContent = ` 
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--boton de eliminar-->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartshopbox.innerHTML = cartBoxContent;
    cartItems.append(cartshopbox);
    cartshopbox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
    cartshopbox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", quantityChanged);
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1500,
        width: '20%'
      })
}
// funcion para actualizar
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceelement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityelement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceelement.innerHTML.replace("$",""));
        var quantity = quantityelement.value;
        total = total + price * quantity;
    }
        //funcion de suma con decimales o centavos
        total =Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerHTML = "$" + total;
        console.log(updatetotal);
}
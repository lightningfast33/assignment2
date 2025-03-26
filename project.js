const AGroupProducts = () =>
{
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
      .then((resp) => resp.json())
      .then((data) => {
          DisplayData(data)
      })
      .catch((err) => {
          console.log(err);
      })
}
const RGroupProducts = () => 
{
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=r")
      .then((resp) => resp.json())
      .then((data) => {
          DisplayData(data)
      })
      .catch((err) => {
          console.log(err);
      })
}
const IGroupProducts = () => 
{
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=i")
      .then((resp) => resp.json())
      .then((data) => {
          DisplayData(data)
      })
      .catch((err) => {
          console.log(err);
      })
}

let modalCount = 1;
const DisplayData = (products, search = false) =>
 {
  drinks = products.drinks
  const ProductContainer = document.getElementById('products');
  ProductContainer.innerHTML = "";
  drinks.forEach((drink) => {
      const ProductBox = document.createElement('div');
      ProductBox.classList.add('border')
      ProductBox.classList.add('border-secondary')
      ProductBox.style.borderRadius = '1rem';
      ProductBox.style.textAlign = 'center';
      ProductBox.style.maxWidth = '18rem';
      ProductBox.style.paddingBottom = '0.70rem';
      ProductBox.innerHTML = `
      <img src="${drink.strDrinkThumb}" class="w-100 rounded-top-4 mb-4" />
      <h5>Name: ${drink.strDrink}</h5>
      <p><strong>Category</strong>: ${drink.strCategory}</p>
      <p><strong>Instructions</strong>: ${drink.strInstructions.slice(0, 15)}...</p>
      <div class="d-flex justify-content-around">
          <button type="button" class="border-2 border-warning text-warning bg-transparent" onclick="AddToCart('${drink.strDrinkThumb}', '${drink.strDrink}')">Add to Cart</button>
          <button type="button" class="border-2 border-success text-success bg-transparent" data-bs-toggle="modal" data-bs-target="#product-details-${modalCount}" onclick="SeeDetails('${drink.strDrinkThumb}', '${drink.strDrink}', '${drink.strCategory}', '${drink.strAlcoholic}', '${drink.strInstructions}')">See Details</button>
      </div>
      `

      ProductContainer.appendChild(ProductBox);
      console.log(drinks);
  })
}

const SearchProducts = (query) =>
   {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then((resp) => resp.json())
      .then((data) => 
      {
          DisplayData(data, true);
      })
      .catch((err) => 
      {
          console.log(err);
      });
}
document.getElementById('search-btn').addEventListener('click', () =>
 {
  const query =document.getElementById('search-bar').value;
  SearchProducts(query);
});

let CartItems = 0;
document.getElementById('cart-items-count').innerText = 0;
const AddToCart = (drinkImg, drinkName) => 
  {
  if (CartItems == 7)
      alert("you can't add more than 7 items to the cart");
  else
   {
      const cart = document.getElementById("cart-items-holder");
      cart.classList.add('d-flex')
      cart.classList.add('flex-column')
      cart.classList.add('gap-3')
      const NewCartItem = document.createElement('div');
      NewCartItem.classList.add('cart-item');
      NewCartItem.classList.add('d-flex');
      NewCartItem.classList.add('gap-3');
      CartItems++;
      document.getElementById('cart-items-count').innerText = CartItems;
      NewCartItem.innerHTML = `
          <p>${CartItems}</p>
          <img src="${drinkImg}" style="width: 2.5rem; border-radius: 100%;" />
          <p>${drinkName}</p>
      `;
      cart.appendChild(NewCartItem);
  }
}

const SeeDetails = (drinkImg, drinkName, drinkCateg, drinkAlco, drinkInstruct) => 
  {
  ProductContainer = document.getElementById('products');
  DetailsModal = document.createElement('div');
  DetailsModal.innerHTML = `
              <div class="modal fade" id="product-details-${modalCount}" tabindex="-1" aria-labelledby="modal-h4-label-${modalCount}" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h4 class="modal-title" id="modal-h4-label-${modalCount}">${drinkName}</h4>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body text-start">
                              <img src="${drinkImg}" class="w-100 rounded-top-4 mb-4" />
                              <h6>Details</h6>
                              <p>Category: <strong>${drinkCateg}</strong></p>
                              <p>Alcoholic: <strong>${drinkAlco}</strong></p>
                              <p>${drinkInstruct}</p>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">OK</button>
                          </div>
                      </div>
                  </div>
              </div>
              `
  modalCount++;
  ProductContainer.appendChild(DetailsModal);
}
AGroupProducts()
IGroupProducts()
RGroupProducts()
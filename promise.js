
const menuList = document.getElementById('menu-list'); 
const placeOrderBtn = document.getElementById('place-order-btn'); 
const orderStatusDiv = document.getElementById('order-status');  
// getMenu() function
async function getMenu() { 
    try { 
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json'); 
        const data = await response.json(); 
        console.log(data); // Debugging: Check JSON structure
        const menuItems = data.menu || []; // Ensure correct property access

        if (!menuList) {
            console.error("menuList element not found in DOM.");
            return;
        }

        menuItems.forEach((menuItem) => { 
            const listItem = document.createElement('li'); 
            listItem.textContent = `${menuItem.name} - ${menuItem.price}`; 
            menuList.appendChild(listItem); 
        }); 
    } catch (error) { 
        console.error('Error fetching menu:', error); 
    } 
}  

// takeOrder() function
function takeOrder() { 
    return new Promise((resolve) => { 
        setTimeout(() => { 
            const burgers = [ 
                { name: 'Burger 1', price: 10 }, 
                { name: 'Burger 2', price: 15 }, 
                { name: 'Burger 3', price: 20 }, 
            ]; 
            resolve({ order: burgers, order_status: false, paid: false }); 
        }, 2500); 
    }); 
}  

// orderPrep() function
function orderPrep(order) { 
    return new Promise((resolve) => { 
        setTimeout(() => { 
            resolve({ ...order, order_status: true }); 
        }, 1500); 
    }); 
}  

// payOrder() function
function payOrder(order) { 
    return new Promise((resolve) => { 
        setTimeout(() => { 
            resolve({ ...order, paid: true }); 
        }, 1000); 
    }); 
}  

// thankyouFnc() function
function thankyouFnc() { 
    alert('Thank you for eating with us today!'); 
}  

// Event listener for place order button
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', async () => { 
        const order = await takeOrder(); 
        if (orderStatusDiv) orderStatusDiv.textContent = 'Order placed. Preparing order...'; 
        
        const preparedOrder = await orderPrep(order); 
        if (orderStatusDiv) orderStatusDiv.textContent = 'Order prepared. Paying...'; 
        
        const paidOrder = await payOrder(preparedOrder); 
        if (orderStatusDiv) orderStatusDiv.textContent = 'Order paid. Thank you!'; 
        
        thankyouFnc(); 
    }); 
} else {
    console.error("placeOrderBtn element not found in DOM.");
}
// Call getMenu() function on page load
document.addEventListener('DOMContentLoaded', getMenu);

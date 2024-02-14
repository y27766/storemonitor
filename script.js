document.addEventListener('DOMContentLoaded', function () {
    const inventoryDiv = document.getElementById('inventory');
    const takeButton = document.getElementById('takeButton');
    const returnButton = document.getElementById('returnButton');
    const addButton = document.getElementById('addButton');
    const deleteButton = document.getElementById('deleteButton');
    const quantityInput = document.getElementById('quantityInput');
    const passwordInput = document.getElementById('passwordInput');
    const password = "ncc@nmit";

    // Retrieve inventory data from local storage or use default data
    let inventoryItems = JSON.parse(localStorage.getItem('inventoryItems')) || [
        { name: 'Item 1', quantity: 10, taken: 0 },
        { name: 'Item 2', quantity: 5, taken: 0 },
        { name: 'Item 3', quantity: 20, taken: 0 }
    ];

    // Function to display inventory items
    function displayInventory() {
        inventoryDiv.innerHTML = '';
        inventoryItems.forEach(function (item) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `<strong>${item.name}</strong> - Available: ${item.quantity}, Taken: ${item.taken}`;
            inventoryDiv.appendChild(itemDiv);
        });
    }

    // Display initial inventory
    displayInventory();

    // Function to save inventory data to local storage
    function saveInventoryToLocalStorage() {
        localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
    }

    // Function to take items
    takeButton.addEventListener('click', function () {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        const itemName = prompt('Enter the name of the item:');
        const item = inventoryItems.find(item => item.name === itemName);
        if (item) {
            if (quantity <= item.quantity) {
                item.quantity -= quantity;
                item.taken += quantity;
                displayInventory();
                saveInventoryToLocalStorage();
            } else {
                alert('Not enough items available.');
            }
        } else {
            alert('Item not found in inventory.');
        }
        quantityInput.value = '';
    });

    // Function to return items
    returnButton.addEventListener('click', function () {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        const itemName = prompt('Enter the name of the item:');
        const item = inventoryItems.find(item => item.name === itemName);
        if (item) {
            if (quantity <= item.taken) {
                item.quantity += quantity;
                item.taken -= quantity;
                displayInventory();
                saveInventoryToLocalStorage();
            } else {
                alert('You are trying to return more items than taken.');
            }
        } else {
            alert('Item not found in inventory.');
        }
        quantityInput.value = '';
    });

    // Function to add a new item
    addButton.addEventListener('click', function () {
        if (passwordInput.value === password) {
            const itemName = prompt('Enter the name of the new item:');
            const quantity = parseInt(prompt('Enter the quantity of the new item:'));
            if (itemName && !isNaN(quantity) && quantity > 0) {
                inventoryItems.push({ name: itemName, quantity: quantity, taken: 0 });
                displayInventory();
                saveInventoryToLocalStorage();
            } else {
                alert('Invalid input. Please try again.');
            }
        } else {
            alert('Unauthorized access. Please try again.');
        }
        passwordInput.value = '';
    });

    // Function to delete an existing item
    deleteButton.addEventListener('click', function () {
        if (passwordInput.value === password) {
            const itemName = prompt('Enter the name of the item to delete:');
            const index = inventoryItems.findIndex(item => item.name === itemName);
            if (index !== -1) {
                inventoryItems.splice(index, 1);
                displayInventory();
                saveInventoryToLocalStorage();
            } else {
                alert('Item not found in inventory.');
            }
        } else {
            alert('Unauthorized access. Please try again.');
        }
        passwordInput.value = '';
    });
});

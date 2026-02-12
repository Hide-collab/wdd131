// Product Array
const products = [
    { id: "p1", name: "Solar Panel X100" },
    { id: "p2", name: "EcoLight LED" },
    { id: "p3", name: "Smart Thermostat Z" },
    { id: "p4", name: "Water Filter Pro" },
    { id: "p5", name: "EnergySaver Heater" }
];

// Populate product select options dynamically
const productSelect = document.getElementById('productSelect');

products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id; // id as value
    option.textContent = product.name; // name as display
    productSelect.appendChild(option);
});

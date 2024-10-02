import BundleItem from './bundleItem.js';


class Bundle {
    constructor(name, price) {
        this.name = name; 
        this.price = price;
        this.items = []; 
    }

    addItem(bundleItem) {
        this.items.push(bundleItem);
    }

    getTotalItems() {
        return this.items.length;
    }
}

// Exportar la clase
export default Bundle;
const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,

    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },

    calculateItemSummary: function() {
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
          );
          const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
          );
          itemNumElement.innerText = this.list.length;
          // calculate the total of all the items in the cart
          const amounts = this.list.map((item) => item.FinalPrice);
          this.itemTotal = amounts.reduce((sum, item) => sum + item);
          summaryElement.innerText = "$" + this.itemTotal;
    },

    calculateOrdertotal: function() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
          parseFloat(this.itemTotal) +
          parseFloat(this.shipping) +
          parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    },

    displayOrderTotals: function() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
            this.outputSelector + " #orderTotal"
        );
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }
}

export default checkoutProcess;
const app = Vue.createApp({
    data() {
        return {
            premium: true,
            cart: []
        };
    },
    methods: {
        // Method to add items to the cart
        updateCart(id) {
            const existingProduct = this.cart.find(item => item.id === id);

            if (existingProduct) {
                // If the product is already in the cart, increment the quantity
                existingProduct.quantity++;
            } else {
                // If not, add a new product entry with quantity 1
                this.cart.push({ id: id, quantity: 1 });
            }
        },

        // Method to remove one item from the cart
        removeFromCart(id) {
            const productInCart = this.cart.find(item => item.id === id);

            if (productInCart && productInCart.quantity > 0) {
                productInCart.quantity--;

                // If the quantity goes to 0, remove it from the cart
                if (productInCart.quantity === 0) {
                    const index = this.cart.indexOf(productInCart);
                    this.cart.splice(index, 1);
                }
            }
        }
    },
    computed: {
        // Computed property to display the number of items in the cart
        cartSummary() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },

        // This will give you a complete summary of each product in the cart
        cartDetails() {
            return this.cart.map(item => {
                const variant = this.$root.variants.find(v => v.id === item.id);
                return {
                    product: variant,
                    quantity: item.quantity
                };
            });
        }
    }
});

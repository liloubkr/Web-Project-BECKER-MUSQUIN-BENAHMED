app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: /*html*/`
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" />
            </div>

            <div class="product-info">
                <h1>{{ productName }}</h1>
                <p v-if="currentQuantity > 0">In Stock ({{ currentQuantity }} left)</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div class="color-circle"
                    v-for="(variant, index) in variants" 
                    :key="variant.id"
                    :style="{ backgroundColor: variant.color }"
                    @mouseover="updateProduct(index)">
                </div> 

                <div class="button-container">
                    <button class="button" v-on:click="addToCart" 
                        :disabled="!canAddToCart"
                        :class="{ disabledButton: !canAddToCart }">
                        Add to cart
                    </button>
                    <button class="button" v-on:click="removeFromCart" 
                        :disabled="cartQuantity === 0"
                        :class="{ disabledButton: cartQuantity === 0 }">
                        Remove 
                    </button>
                </div>
            </div>
        </div>

        <review-list :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    data() {
        return {
            product: 'Luxury Cars',
            brand: 'GC Cars',
            selectedVariant: 0,
            totalCart: 0,
            maxCart: 100,
            details: ["Perfectly irrational.The 718 models were made for the sport of it. They are mid-engined roadsters that unite the sporting spirit of the legendary Porsche 718 with the sports car of tomorrow – and transfer it to the roads of today’s world. With one goal: to take the everyday out of every day"],
            variants: [
                {
                    id: 2234,
                    color: 'black',
                    image: './assets/images/i1.png',
                    quantity: 7,
                    cartQuantity: 0
                },
                {
                    id: 2235,
                    color: 'gray',
                    image: './assets/images/i2.png',
                    quantity: 0,
                    cartQuantity: 0
                },
                {
                    id: 2236,
                    color: 'white',
                    image: './assets/images/i3.png',
                    quantity: 2,
                    cartQuantity: 0
                },
                {
                    id: 2237,
                    color: 'red',
                    image: './assets/images/i4.png',
                    quantity: 3,
                    cartQuantity: 0
                }
            ],
            reviews: [],
            tabs: ['review-form', 'review-list'],
            activeTab: 'review-form'
        }
    },
    methods: {
        addToCart() {
            if (this.canAddToCart) {
                this.totalCart++; // Increment total cart count
                this.variants[this.selectedVariant].quantity--; // Decrement available quantity
                this.variants[this.selectedVariant].cartQuantity++; // Increment cart quantity for this variant
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
            }
        },

        removeFromCart() {
            if (this.cartQuantity > 0) {
                this.totalCart--; // Decrement total cart count
                this.variants[this.selectedVariant].quantity++; // Increment available quantity
                this.variants[this.selectedVariant].cartQuantity--; // Decrement cart quantity for this variant
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
            }
        },

        updateProduct(index) {
            this.selectedVariant = index;
        },

        addReview(review) {
            this.reviews.push(review);
        }
    },
    computed: {
        productName() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        currentQuantity() {
            return this.variants[this.selectedVariant].quantity;
        },
        cartQuantity() {
            const cartItem = this.$root.cart.find(item => item.id === this.variants[this.selectedVariant].id);
            return cartItem ? cartItem.quantity : 0;
        },
        canAddToCart() {
            return this.currentQuantity > 0 && this.totalCart < this.maxCart;
        },
        shipping() {
            return this.premium ? 'Free' : 2.99;
        }
    }
});


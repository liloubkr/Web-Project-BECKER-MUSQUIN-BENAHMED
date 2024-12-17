app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
        `
   <div class="product-display">
        
    <div class="product-container">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ productName }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <p>Items remaining: {{ cartCounter }}</p> <!-- Display the cart counter -->

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div class="color-circle"
          v-for="(variant, index) in variants" 
          :key="variant.id"
          :style="{ backgroundColor: variant.color }"
          @mouseover="updateProduct(index)"
          >
        </div> 

        <button class="button" v-on:click="addToCart" 
          :disabled="!canAddToCart"
          :class="{ disabledButton: !canAddToCart }"
          >
        Add to cart
        </button>
        <p v-if="cartCounter === 0" class="warning">Cannot add more items to the cart</p> <!-- Warning message -->
      </div>
    </div>

    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview" ></review-form>
  </div>
   `,
    data() {
        return {
            product: 'Luxury Cars',
            brand: 'GC Cars',
            selectedVariant: 0,
            cartCounter: 10, // Initialize the maximum allowed items in the cart
            details: ["Perfectly irrational.The 718 models were made for the sport of it. They are mid-engined roadsters that unite the sporting spirit of the legendary Porsche 718 with the sports car of tomorrow – and transfer it to the roads of today’s world. With one goal: to take the everyday out of every day."],
            variants: [
                {
                    id: 2234,
                    color: 'black',
                    image: './assets/images/i1.png',
                    quantity: 7
                },
                {
                    id: 2235,
                    color: 'gray',
                    image: './assets/images/i2.png',
                    quantity: 0
                },
                {
                    id: 2236,
                    color: 'white',
                    image: './assets/images/i3.png',
                    quantity: 2
                },
                {
                    id: 2237,
                    color: 'red',
                    image: './assets/images/i4.png',
                    quantity: 3
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
                this.cartCounter--; // Decrement the cart counter
                this.variants[this.selectedVariant].quantity--; // Decrement the variant quantity
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
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
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0;
        },
        canAddToCart() {
            // Restrict adding to cart based on stock and cart counter
            return this.inStock && this.cartCounter > 0;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }
            return 2.99;
        }
    }
});

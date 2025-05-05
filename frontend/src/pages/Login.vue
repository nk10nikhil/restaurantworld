<template>
    <div class="login-container">
        <div class="login-form-container">
            <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>LOGIN</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="email" id="uEmail" name="uEmail" class="form-control" placeholder="enter your email"
                        v-model="loginObj.email" />
                </div>

                <div class="form-group">
                    <input type="password" id="uPass" name="uPass" class="form-control"
                        placeholder="enter your password" v-model="loginObj.pass" />
                </div>

                <div class="form-group">
                    <input type="submit" value="login now" class="btn">
                    <p>don't have an account? <router-link @click="scrollToTop()" to="/register">create one
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    name: 'Login',

    data() {
        return {
            loginObj: { email: "", pass: "" },
            matchUser: undefined,
            errors: [],
            redirect: null
        }
    },

    created() {
        // Check if we have a redirect parameter in the URL
        const params = new URLSearchParams(window.location.search);
        this.redirect = params.get('redirect');
    },

    methods: {
        ...mapMutations(["setUser"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },

        // Add guest cart items to the user's cart in the database
        async mergeGuestCart(userId) {
            const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
            
            if (guestCart.length > 0) {
                // For each item in the guest cart, add it to the user's cart
                for (const item of guestCart) {
                    try {
                        // Check if this item already exists in the user's cart
                        const existItem = await axios.get(`/cartItem/${userId}/${item.food_id}`);
                        
                        if (existItem.data) {
                            // Update quantity if item exists
                            await axios.put('/cartItem/', {
                                user_id: userId,
                                food_id: item.food_id,
                                item_qty: parseInt(existItem.data.item_qty) + parseInt(item.qty)
                            });
                        } else {
                            // Add new item if it doesn't exist
                            await axios.post('/cartItem/', {
                                user_id: userId,
                                food_id: item.food_id,
                                item_qty: parseInt(item.qty)
                            });
                        }
                    } catch (error) {
                        console.error('Error merging cart item:', error);
                    }
                }
                
                // Clear guest cart after merging
                localStorage.removeItem('guestCart');
            }
        },

        async handleSubmit(e) {
            this.errors = [];

            if (!this.loginObj.email) {
                this.errors.push("Entering a email is required");
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)) {
                    this.errors.push('Email must be valid');
                }
            }

            if (!this.loginObj.pass) {
                this.errors.push('Password is required');
            }

            if (!this.errors.length == 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                await this.getMatchUser(this.loginObj.email);
                if (!this.matchUser) {
                    this.errors.push("Incorrect email or password!")
                }
                else {
                    if (this.matchUser.user_password === this.loginObj.pass) {
                        // Save the user in store
                        this.matchUser.user_password = "";
                        this.setUser(this.matchUser);
                        
                        // Merge guest cart with user cart
                        await this.mergeGuestCart(this.matchUser._id);
                        
                        // Redirect to the appropriate page
                        if (this.redirect === 'checkout') {
                            this.$router.push("/checkout");
                        } else {
                            this.$router.push("/");
                        }
                    }
                    else {
                        this.errors.push("Incorrect email or password!")
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    padding: 2rem 9%;
}

.login-container .login-form-container {
    background-color: #fff;
    height: 90vh;
}

.login-container .login-form-container form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: .5rem;
    animation: fadeUp .4s linear;
}

.login-container .login-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.login-container .login-form-container form .form-control {
    margin: .7rem 0;
    border-radius: .5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border: none;
}

.login-container .login-form-container form .btn {
    margin-bottom: 1rem;
    margin-top: 1rem;
    width: 100%;
}

.login-container .login-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.login-container .login-form-container form p a {
    color: #27ae60;
}

.login-container .login-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.login-container .login-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 2px;
    font-size: 12px;
    margin-bottom: 20px;
}

.login-container .login-form-container form .error-box ul {
    list-style-type: none;
    margin: 0;
    padding: 10px 0px;
}

.login-container .login-form-container form .error-box ul li {
    padding-left: 10px;
    color: rgb(182, 0, 0);
}
</style>
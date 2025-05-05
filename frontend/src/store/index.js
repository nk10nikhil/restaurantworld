import { createStore } from "vuex"
import axios from "axios"

// Direct menu data for the restaurant
const menuItems = [
    // TACOS
    {
        food_id: 1,
        food_name: "Carne Asada Tacos",
        food_star: "4.5",
        food_vote: "999",
        food_price: "12.00",
        food_discount: "0.00",
        food_desc: "03 pieces per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "taco",
        food_src: "taco/taco-1.png"
    },
    {
        food_id: 2,
        food_name: "Shrimp Tacos",
        food_star: "4.5",
        food_vote: "875",
        food_price: "15.00",
        food_discount: "3.00",
        food_desc: "03 pieces per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "taco",
        food_src: "taco/taco-2.png"
    },
    {
        food_id: 3,
        food_name: "Barbacoa Tacos",
        food_star: "4.5",
        food_vote: "500",
        food_price: "12.00",
        food_discount: "0.00",
        food_desc: "03 pieces per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "taco",
        food_src: "taco/taco-3.png"
    },
    {
        food_id: 4,
        food_name: "Tacos Al Pastor",
        food_star: "4.5",
        food_vote: "720",
        food_price: "13.00",
        food_discount: "2.00",
        food_desc: "03 pieces per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "taco",
        food_src: "taco/taco-4.png"
    },
    {
        food_id: 5,
        food_name: "Tinga Tacos",
        food_star: "4.0",
        food_vote: "450",
        food_price: "11.00",
        food_discount: "0.00",
        food_desc: "03 pieces per serving",
        food_status: "normal",
        food_type: "meat",
        food_category: "taco",
        food_src: "taco/taco-5.png"
    },
    {
        food_id: 6,
        food_name: "Vegan Tacos",
        food_star: "4.5",
        food_vote: "350",
        food_price: "9.00",
        food_discount: "2.00",
        food_desc: "03 pieces per serving",
        food_status: "new dishes",
        food_type: "vegan",
        food_category: "taco",
        food_src: "taco/taco-8.png"
    },

    // BURRITOS
    {
        food_id: 7,
        food_name: "Wet Burrito",
        food_star: "4.5",
        food_vote: "600",
        food_price: "14.00",
        food_discount: "0.00",
        food_desc: "01 roll per serving",
        food_status: "new dishes",
        food_type: "meat",
        food_category: "burrito",
        food_src: "burrito/burrito-1.png"
    },
    {
        food_id: 8,
        food_name: "Poncho Burrito",
        food_star: "4.5",
        food_vote: "999",
        food_price: "15.00",
        food_discount: "3.00",
        food_desc: "01 roll per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "burrito",
        food_src: "burrito/burrito-2.png"
    },
    {
        food_id: 9,
        food_name: "Bean & Cheese Burrito",
        food_star: "4.5",
        food_vote: "820",
        food_price: "14.00",
        food_discount: "0.00",
        food_desc: "01 roll per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "burrito",
        food_src: "burrito/burrito-3.png"
    },
    {
        food_id: 10,
        food_name: "Breakfast Burrito",
        food_star: "4.5",
        food_vote: "750",
        food_price: "12.00",
        food_discount: "2.00",
        food_desc: "01 roll per serving",
        food_status: "new dishes",
        food_type: "meat",
        food_category: "burrito",
        food_src: "burrito/burrito-4.png"
    },
    {
        food_id: 11,
        food_name: "California Burrito",
        food_star: "4.5",
        food_vote: "999",
        food_price: "14.00",
        food_discount: "0.00",
        food_desc: "01 roll per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "burrito",
        food_src: "burrito/burrito-5.png"
    },

    // NACHOS
    {
        food_id: 12,
        food_name: "Nacho Tots",
        food_star: "4.0",
        food_vote: "699",
        food_price: "12.00",
        food_discount: "2.00",
        food_desc: "01 tray per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "nachos",
        food_src: "nachos/nachos-1.png"
    },
    {
        food_id: 13,
        food_name: "Root Beer Pork Nachos",
        food_star: "4.5",
        food_vote: "850",
        food_price: "12.00",
        food_discount: "0.00",
        food_desc: "01 tray per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "nachos",
        food_src: "nachos/nachos-2.png"
    },
    {
        food_id: 14,
        food_name: "Shrimp Nachos",
        food_star: "4.5",
        food_vote: "780",
        food_price: "17.00",
        food_discount: "2.00",
        food_desc: "01 tray per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "nachos",
        food_src: "nachos/nachos-3.png"
    },
    {
        food_id: 15,
        food_name: "Chicken Nachos",
        food_star: "4.5",
        food_vote: "999",
        food_price: "11.00",
        food_discount: "0.00",
        food_desc: "01 tray per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "nachos",
        food_src: "nachos/nachos-4.png"
    },
    {
        food_id: 16,
        food_name: "Guacamole",
        food_star: "4.5",
        food_vote: "690",
        food_price: "5.00",
        food_discount: "2.00",
        food_desc: "01 bowl per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "nachos",
        food_src: "nachos/salsa-5.png"
    },

    // SIDES
    {
        food_id: 17,
        food_name: "Corn Salad",
        food_star: "3.5",
        food_vote: "450",
        food_price: "5.00",
        food_discount: "1.00",
        food_desc: "01 bowl per serving",
        food_status: "new dishes seasonal dishes",
        food_type: "vegan",
        food_category: "sides",
        food_src: "side/side-1.png"
    },
    {
        food_id: 18,
        food_name: "Keto Taquitos",
        food_star: "4.5",
        food_vote: "720",
        food_price: "9.00",
        food_discount: "0.00",
        food_desc: "05 pieces per serving",
        food_status: "best seller",
        food_type: "meat",
        food_category: "sides",
        food_src: "side/side-2.png"
    },
    {
        food_id: 19,
        food_name: "Mexican Rice",
        food_star: "4.0",
        food_vote: "520",
        food_price: "5.00",
        food_discount: "0.00",
        food_desc: "01 bowl per serving",
        food_status: "normal",
        food_type: "vegan",
        food_category: "sides",
        food_src: "side/side-3.png"
    },
    {
        food_id: 20,
        food_name: "Cilantro Lime Rice",
        food_star: "4.0",
        food_vote: "480",
        food_price: "5.00",
        food_discount: "0.00",
        food_desc: "01 bowl per serving",
        food_status: "new dishes",
        food_type: "vegan",
        food_category: "sides",
        food_src: "side/side-4.png"
    },

    // DESSERTS
    {
        food_id: 21,
        food_name: "Churros",
        food_star: "4.5",
        food_vote: "999",
        food_price: "7.00",
        food_discount: "0.00",
        food_desc: "05 pieces per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "dessert",
        food_src: "dessert/dessert-1.png"
    },
    {
        food_id: 22,
        food_name: "Fried Ice Cream",
        food_star: "4.5",
        food_vote: "850",
        food_price: "5.00",
        food_discount: "1.00",
        food_desc: "01 piece per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "dessert",
        food_src: "dessert/dessert-2.png"
    },
    {
        food_id: 23,
        food_name: "Dulce de Leche",
        food_star: "4.5",
        food_vote: "550",
        food_price: "4.00",
        food_discount: "0.00",
        food_desc: "01 bowl per serving",
        food_status: "new dishes",
        food_type: "vegan",
        food_category: "dessert",
        food_src: "dessert/dessert-3.png"
    },
    {
        food_id: 24,
        food_name: "Sopapillas",
        food_star: "4.0",
        food_vote: "630",
        food_price: "4.00",
        food_discount: "0.00",
        food_desc: "10 pieces per serving",
        food_status: "normal",
        food_type: "vegan",
        food_category: "dessert",
        food_src: "dessert/dessert-5.png"
    },

    // DRINKS
    {
        food_id: 25,
        food_name: "Margarita",
        food_star: "4.5",
        food_vote: "999",
        food_price: "5.00",
        food_discount: "0.00",
        food_desc: "01 glass per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "drink",
        food_src: "drink/drink-1.png"
    },
    {
        food_id: 26,
        food_name: "Michelada",
        food_star: "4.5",
        food_vote: "875",
        food_price: "5.00",
        food_discount: "0.00",
        food_desc: "01 glass per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "drink",
        food_src: "drink/drink-2.png"
    },
    {
        food_id: 27,
        food_name: "Paloma",
        food_star: "4.5",
        food_vote: "780",
        food_price: "5.00",
        food_discount: "0.00",
        food_desc: "01 glass per serving",
        food_status: "new dishes seasonal dishes",
        food_type: "vegan",
        food_category: "drink",
        food_src: "drink/drink-3.png"
    },
    {
        food_id: 28,
        food_name: "Fruit Detox",
        food_star: "3.5",
        food_vote: "650",
        food_price: "3.00",
        food_discount: "0.00",
        food_desc: "01 glass per serving",
        food_status: "seasonal dishes best seller",
        food_type: "vegan",
        food_category: "drink",
        food_src: "drink/drink-5.png"
    },
    {
        food_id: 29,
        food_name: "Coca Cola",
        food_star: "4.5",
        food_vote: "999",
        food_price: "3.00",
        food_discount: "0.00",
        food_desc: "01 glass per serving",
        food_status: "best seller",
        food_type: "vegan",
        food_category: "drink",
        food_src: "drink/drink-6.png"
    }
];

const store = createStore({
    state() {
        return {
            allFoods: menuItems, // Initialize with direct menu data
            user: undefined,
            admin: undefined,
        }
    },
    mutations: {
        setFoodsData(state, payload) {
            state.allFoods = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setAdmin(state, payload) {
            state.admin = payload;
        }
    },
    actions: {
        async getFoodsData(context) {
            try {
                // Optionally try to get foods from API first
                await axios.get('/foods')
                    .then(function (response) {
                        context.commit("setFoodsData", response.data);
                    })
                    .catch(function (error) {
                        console.log("Using local menu data:", error);
                        // If API fails, data is already loaded from local
                    });
            } catch (error) {
                console.log("Error loading food data, using local data:", error);
                // Data is already loaded from local, no action needed
            }
        },
    }
})

export default store;
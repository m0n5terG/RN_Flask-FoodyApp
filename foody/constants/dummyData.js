import images from "./images"

const trendingRecipes = [
    {
        id: 1,
        title: "Spaghetti With Shrimp Sauce",
        image: images.spagetti,
        duration: "30 mins",
        serving: 1,
        isBookmark: false,
        category: "Pasta",
        author: {
            name: "Maria",
        },
        ingredients: [
            {
                id: 1,
                description: "Spaghetti pasta",
                quantity: "100g"
            },
            {
                id: 2,
                description: "Olive Oil",
                quantity: "2 tbsp"
            },
            {
                id: 3,
                description: "Fresh Shrimp",
                quantity: "100g"
            },
            {
                id: 4,
                description: "Campari tomatoes",
                quantity: "100g"
            },
            {
                id: 5,
                description: "Salt",
                quantity: "¾ tbsp"
            },
            {
                id: 6,
                description: "Black Pepper",
                quantity: "¼ tbsp"
            },

        ]
    },
    {
        id: 2,title: "Malaysian Chicken Satay",
        image: images.satay,
        duration: "50 mins",
        serving: 10,
        isBookmark: true,
        category: "Local",
        author: {
            name: "Mandy",
        },
        ingredients: [
            {
                id: 1,
                description: "Boneless Chicken Thighs",
                quantity: "1kg"
            },
            {
                id: 2,
                description: "Lemongrass stalk",
                quantity: "1 stalk"
            },
            {
                id: 3,
                description: "Large Onion",
                quantity: "1"
            },
            {
                id: 4,
                description: "Garlic cloves",
                quantity: "5"
            },
            {
                id: 5,
                description: "Coriander",
                quantity: "1 tsp"
            },

        ],
    },
    {
        id: 3,
        title: "Sarawak Laksa",
        image: images.laksa,
        duration: "30 mins",
        serving: 1,
        isBookmark: true,
        category: "Local",
        author: {
            name: "Jessie",
        },
        ingredients: [
            {
                id: 1,
                description: "Garlic cloves",
                quantity: "3"
            },
            {
                id: 2,
                description: "Lemongrass",
                quantity: "2 stalks"
            },
            {
                id: 3,
                description: "Egg",
                quantity: "2"
            },
            {
                id: 4,
                description: "Fresh Shrimp",
                quantity: "100g"
            },
            {
                id: 5,
                description: "Shallot",
                quantity: "4"
            },
            {
                id: 6,
                description: "vermicelli",
                quantity: "100g"
            },
        ],
    },
    {
        id: 4,
        title: "Nasi Lemak",
        image: images.nasiLemak,
        duration: "1 hour",
        serving: 10,
        isBookmark: true,
        category: "Local",
        author: {
            name: "Ali Baba",
        },
        ingredients: [
            {
                id: 1,
                description: "Dried Chilli",
                quantity: "30g"
            },
            {
                id: 2,
                description: "Garlic cloves",
                quantity: "3"
            },
            {
                id: 3,
                description: "Egg",
                quantity: "10"
            },
            {
                id: 4,
                description: "rice",
                quantity: "1kg"
            },
            {
                id: 5,
                description: "Dried anchovies",
                quantity: "3 cups"
            },
        ],
    },

]

const categories = trendingRecipes

export default {
    trendingRecipes,
    categories
}
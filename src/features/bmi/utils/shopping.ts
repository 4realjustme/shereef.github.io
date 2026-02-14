export interface ShoppingItem {
    id: number;
    name: string;
    category: 'Supplement' | 'Grocery' | 'Fitness';
    emoji: string;
    description: string;
    links: {
        label: string;
        url: string;
        color: string;
    }[];
}

export const shoppingItems: ShoppingItem[] = [
    {
        id: 1,
        name: "Multivitamin Tablets",
        category: "Supplement",
        emoji: "💊",
        description: "Daily essential vitamins & minerals for overall health",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=multivitamin+tablets", color: "bg-orange-500" },
            { label: "Flipkart", url: "https://www.flipkart.com/search?q=multivitamin+tablets", color: "bg-blue-600" },
        ],
    },
    {
        id: 2,
        name: "Whey Protein Powder",
        category: "Supplement",
        emoji: "💪",
        description: "High-quality protein for muscle growth & recovery",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=whey+protein+powder", color: "bg-orange-500" },
            { label: "Healthkart", url: "https://www.healthkart.com/search/all?q=whey+protein", color: "bg-green-600" },
        ],
    },
    {
        id: 3,
        name: "Omega-3 Fish Oil",
        category: "Supplement",
        emoji: "🐟",
        description: "Heart & brain health with EPA and DHA fatty acids",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=omega+3+fish+oil", color: "bg-orange-500" },
            { label: "Flipkart", url: "https://www.flipkart.com/search?q=omega+3+fish+oil", color: "bg-blue-600" },
        ],
    },
    {
        id: 4,
        name: "Organic Oats & Muesli",
        category: "Grocery",
        emoji: "🥣",
        description: "Fiber-rich breakfast for sustainable energy",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=organic+oats+muesli", color: "bg-orange-500" },
            { label: "BigBasket", url: "https://www.bigbasket.com/ps/?q=organic+oats", color: "bg-green-700" },
        ],
    },
    {
        id: 5,
        name: "Green Tea Collection",
        category: "Grocery",
        emoji: "🍵",
        description: "Metabolism-boosting antioxidant-rich tea",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=green+tea", color: "bg-orange-500" },
            { label: "Flipkart", url: "https://www.flipkart.com/search?q=green+tea", color: "bg-blue-600" },
        ],
    },
    {
        id: 6,
        name: "Mixed Nuts & Seeds",
        category: "Grocery",
        emoji: "🥜",
        description: "Almonds, walnuts, pumpkin seeds – healthy fats & protein",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=mixed+nuts+seeds+healthy", color: "bg-orange-500" },
            { label: "BigBasket", url: "https://www.bigbasket.com/ps/?q=mixed+nuts+seeds", color: "bg-green-700" },
        ],
    },
    {
        id: 7,
        name: "Resistance Bands Set",
        category: "Fitness",
        emoji: "🏋️",
        description: "Portable workout bands for home fitness",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=resistance+bands+set", color: "bg-orange-500" },
            { label: "Flipkart", url: "https://www.flipkart.com/search?q=resistance+bands", color: "bg-blue-600" },
        ],
    },
    {
        id: 8,
        name: "Yoga Mat Premium",
        category: "Fitness",
        emoji: "🧘",
        description: "Non-slip, eco-friendly mat for yoga & exercise",
        links: [
            { label: "Amazon", url: "https://www.amazon.in/s?k=yoga+mat+premium", color: "bg-orange-500" },
            { label: "Decathlon", url: "https://www.decathlon.in/search?Ntt=yoga+mat", color: "bg-sky-600" },
        ],
    },
];

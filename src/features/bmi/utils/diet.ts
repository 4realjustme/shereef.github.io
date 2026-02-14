export type DietType = 'veg' | 'non-veg';

export interface DietPlan {
    name: string;
    meals: string[];
    nutrition: {
        calories: number;
        protein: string;
        carbs: string;
        fats: string;
    };
}

const vegPlans: DietPlan[] = [
    {
        name: "Classic Balanced",
        meals: [
            "🌅 Breakfast: Oatmeal with banana, chia seeds & almonds",
            "🌿 Lunch: Lentil dal, brown rice, cucumber raita & salad",
            "🍎 Snack: Greek yogurt with mixed berries",
            "🌙 Dinner: Paneer tikka with quinoa & sautéed broccoli",
        ],
        nutrition: { calories: 1650, protein: "72g", carbs: "190g", fats: "52g" },
    },
    {
        name: "High-Protein Veg",
        meals: [
            "🌅 Breakfast: Moong dal chilla with mint chutney",
            "🌿 Lunch: Chickpea curry, multigrain roti & spinach",
            "🍎 Snack: Roasted chana & a handful of walnuts",
            "🌙 Dinner: Tofu stir-fry with bell peppers & brown rice",
        ],
        nutrition: { calories: 1700, protein: "85g", carbs: "170g", fats: "55g" },
    },
    {
        name: "Mediterranean Veg",
        meals: [
            "🌅 Breakfast: Whole-grain toast with avocado & cherry tomatoes",
            "🌿 Lunch: Falafel wrap with hummus, tabbouleh & olives",
            "🍎 Snack: Trail mix with dried apricots & dark chocolate",
            "🌙 Dinner: Grilled halloumi with roasted vegetables & couscous",
        ],
        nutrition: { calories: 1750, protein: "65g", carbs: "200g", fats: "62g" },
    },
    {
        name: "Indian Comfort",
        meals: [
            "🌅 Breakfast: Idli with sambar & coconut chutney",
            "🌿 Lunch: Rajma chawal with onion salad & pickle",
            "🍎 Snack: Masala buttermilk & roasted makhana",
            "🌙 Dinner: Palak paneer with 2 rotis & cucumber raita",
        ],
        nutrition: { calories: 1600, protein: "68g", carbs: "185g", fats: "48g" },
    },
];

const nonVegPlans: DietPlan[] = [
    {
        name: "Lean & Clean",
        meals: [
            "🌅 Breakfast: Scrambled eggs with spinach & whole-grain toast",
            "🌿 Lunch: Grilled chicken breast, sweet potato & mixed greens",
            "🍎 Snack: Protein shake with a boiled egg",
            "🌙 Dinner: Baked salmon with steamed broccoli & quinoa",
        ],
        nutrition: { calories: 1800, protein: "140g", carbs: "130g", fats: "65g" },
    },
    {
        name: "Muscle Builder",
        meals: [
            "🌅 Breakfast: Omelette with mushrooms, cheese & avocado",
            "🌿 Lunch: Turkey meatballs with pasta & marinara sauce",
            "🍎 Snack: Cottage cheese with pineapple chunks",
            "🌙 Dinner: Grilled prawns with garlic butter & brown rice",
        ],
        nutrition: { calories: 2000, protein: "155g", carbs: "160g", fats: "72g" },
    },
    {
        name: "Asian Fusion",
        meals: [
            "🌅 Breakfast: Egg fried rice with vegetables & soy sauce",
            "🌿 Lunch: Chicken teriyaki bowl with edamame & pickled ginger",
            "🍎 Snack: Tuna onigiri or seaweed snack",
            "🌙 Dinner: Fish curry with steamed jasmine rice & bok choy",
        ],
        nutrition: { calories: 1850, protein: "120g", carbs: "185g", fats: "58g" },
    },
    {
        name: "Desi Power",
        meals: [
            "🌅 Breakfast: Egg bhurji with multigrain paratha",
            "🌿 Lunch: Chicken biryani (small portion) with raita",
            "🍎 Snack: Grilled chicken tikka (3 pcs) & green tea",
            "🌙 Dinner: Fish fry with dal & brown rice",
        ],
        nutrition: { calories: 1900, protein: "135g", carbs: "170g", fats: "68g" },
    },
];

let vegIndex = -1;
let nonVegIndex = -1;

export const getNextDietPlan = (type: DietType): DietPlan => {
    if (type === 'veg') {
        vegIndex = (vegIndex + 1) % vegPlans.length;
        return vegPlans[vegIndex];
    } else {
        nonVegIndex = (nonVegIndex + 1) % nonVegPlans.length;
        return nonVegPlans[nonVegIndex];
    }
};

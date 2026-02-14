export const quotes = [
    "The only bad workout is the one that didn't happen.",
    "Take care of your body. It's the only place you have to live. — Jim Rohn",
    "Health is not about the weight you lose, but about the life you gain.",
    "Success starts with self-discipline.",
    "Your health is an investment, not an expense.",
    "Small progress is still progress. Keep going.",
    "A healthy outside starts from the inside. — Robert Urich",
    "The greatest wealth is health. — Virgil",
    "Don't count the days, make the days count. — Muhammad Ali",
    "It does not matter how slowly you go, as long as you do not stop. — Confucius",
    "You don't have to be extreme, just consistent.",
    "Happiness is the highest form of health. — Dalai Lama",
];

export const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

export type Gender = 'male' | 'female';

export interface UserInput {
    weight: number; // kg
    height: number; // cm
    age: number;
    gender: Gender;
}

export interface BmiResult {
    bmi: number;
    category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
    healthyRange: {
        min: number;
        max: number;
    };
    calories: {
        maintenance: number;
        loss: number;
        gain: number;
    };
    prediction: string;
}

export const calculateBMI = (input: UserInput): BmiResult => {
    const { weight, height, age, gender } = input;
    const heightInMeters = height / 100;

    // BMI Calculation
    const bmi = weight / (heightInMeters * heightInMeters);

    // Category
    let category: BmiResult['category'] = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 18.5 && bmi < 24.9) category = 'Normal';
    else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
    else category = 'Obese';

    // Healthy Weight Range (BMI 18.5 - 24.9)
    const minHealthyWeight = 18.5 * heightInMeters * heightInMeters;
    const maxHealthyWeight = 24.9 * heightInMeters * heightInMeters;

    // Calories (Mifflin-St Jeor)
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') bmr += 5;
    else bmr -= 161;

    // Assuming sedentary/light activity for baseline (1.2)
    const maintenance = Math.round(bmr * 1.2);
    const loss = maintenance - 500;
    const gain = maintenance + 500;

    // Prediction Text
    let prediction = '';
    if (category === 'Normal') {
        prediction = "You're in a healthy range! Keep maintaining your lifestyle.";
    } else if (category === 'Underweight') {
        prediction = "With consistent nutrition, you can reach a healthy weight in a few months.";
    } else {
        // Estimate weight to lose
        const weightToLose = weight - maxHealthyWeight;
        const months = Math.max(1, Math.round(weightToLose / 2)); // 2kg per month safely
        prediction = `With consistency, you may reach a healthy range in about ${months} months.`;
    }

    return {
        bmi: parseFloat(bmi.toFixed(1)),
        category,
        healthyRange: {
            min: parseFloat(minHealthyWeight.toFixed(1)),
            max: parseFloat(maxHealthyWeight.toFixed(1)),
        },
        calories: {
            maintenance,
            loss,
            gain,
        },
        prediction,
    };
};

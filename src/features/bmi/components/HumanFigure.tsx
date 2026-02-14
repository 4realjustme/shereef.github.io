import React from 'react';

interface HumanFigureProps {
    category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
    gender: 'male' | 'female';
}

const HumanFigure: React.FC<HumanFigureProps> = ({ category, gender }) => {
    const isMale = gender === 'male';

    // Solid colors as requested: Blue for male, Pink for female
    const bodyColor = isMale ? "#3b82f6" : "#ec4899";

    // MALE SHAPES (Shoulders broad, hips narrow)
    const MaleUnderweight = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="25" r="12" fill={bodyColor} />
            {/* Torso: Thin rectangle */}
            <path d="M 40 40 L 60 40 L 58 110 L 42 110 Z" fill={bodyColor} />
            {/* Arms: Thin */}
            <rect x="30" y="42" width="8" height="70" rx="4" fill={bodyColor} />
            <rect x="62" y="42" width="8" height="70" rx="4" fill={bodyColor} />
            {/* Legs: Thin, gap */}
            <path d="M 42 110 L 40 210 L 48 210 L 49 140 L 51 140 L 52 210 L 60 210 L 58 110" fill={bodyColor} />
        </svg>
    );

    const MaleNormal = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-xl">
            <circle cx="50" cy="25" r="13" fill={bodyColor} />
            {/* Torso: V-shape */}
            <path d="M 35 40 L 65 40 L 60 110 L 40 110 Z" fill={bodyColor} />
            {/* Arms: Standard */}
            <rect x="23" y="42" width="10" height="70" rx="5" fill={bodyColor} />
            <rect x="67" y="42" width="10" height="70" rx="5" fill={bodyColor} />
            {/* Legs: Athletic */}
            <path d="M 40 110 L 38 210 L 48 210 L 49 140 L 51 140 L 52 210 L 62 210 L 60 110" fill={bodyColor} />
        </svg>
    );

    const MaleOverweight = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="25" r="13" fill={bodyColor} />
            {/* Torso: Wider, straighter */}
            <path d="M 35 42 L 65 42 L 65 110 L 35 110 Z" fill={bodyColor} />
            {/* Belly bump check? Just wider overall */}
            <path d="M 35 70 Q 28 90 35 110 L 65 110 Q 72 90 65 70 Z" fill={bodyColor} />
            {/* Arms */}
            <rect x="20" y="44" width="12" height="65" rx="6" fill={bodyColor} transform="rotate(5 26 44)" />
            <rect x="68" y="44" width="12" height="65" rx="6" fill={bodyColor} transform="rotate(-5 74 44)" />
            {/* Legs: Thicker */}
            <path d="M 35 110 L 35 210 L 46 210 L 48 140 L 52 140 L 54 210 L 65 210 L 65 110" fill={bodyColor} />
        </svg>
    );

    const MaleObese = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="25" r="14" fill={bodyColor} />
            {/* Torso: Round/Oval */}
            <ellipse cx="50" cy="80" rx="28" ry="35" fill={bodyColor} />
            {/* Shoulders connection */}
            <path d="M 35 45 L 65 45 L 65 60 L 35 60 Z" fill={bodyColor} />
            {/* Arms: Splayed */}
            <rect x="12" y="50" width="14" height="60" rx="7" fill={bodyColor} transform="rotate(15 20 50)" />
            <rect x="74" y="50" width="14" height="60" rx="7" fill={bodyColor} transform="rotate(-15 80 50)" />
            {/* Legs: Wide stance */}
            <path d="M 32 110 L 32 210 L 44 210 L 46 140 L 54 140 L 56 210 L 68 210 L 68 110" fill={bodyColor} />
        </svg>
    );

    // FEMALE SHAPES (Shoulders narrower, hips wider)
    const FemaleUnderweight = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="25" r="11" fill={bodyColor} />
            {/* Torso: Thin, slight waist */}
            <path d="M 40 40 L 60 40 L 56 110 L 44 110 Z" fill={bodyColor} />
            {/* Arms */}
            <rect x="32" y="42" width="7" height="70" rx="3.5" fill={bodyColor} />
            <rect x="61" y="42" width="7" height="70" rx="3.5" fill={bodyColor} />
            {/* Legs */}
            <path d="M 44 110 L 44 210 L 49 210 L 49 150 L 51 150 L 51 210 L 56 210 L 56 110" fill={bodyColor} />
        </svg>
    );

    const FemaleNormal = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-xl">
            <circle cx="50" cy="25" r="12" fill={bodyColor} />
            {/* Torso: Hourglass */}
            <path d="M 38 40 L 62 40 Q 66 55 60 70 Q 55 80 64 95 L 66 110 L 34 110 L 36 95 Q 45 80 40 70 Q 34 55 38 40 Z" fill={bodyColor} />
            {/* Arms */}
            <rect x="28" y="42" width="9" height="70" rx="4.5" fill={bodyColor} transform="rotate(5 32 42)" />
            <rect x="63" y="42" width="9" height="70" rx="4.5" fill={bodyColor} transform="rotate(-5 68 42)" />
            {/* Legs */}
            <path d="M 36 110 L 38 210 L 48 210 L 49 150 L 51 150 L 52 210 L 62 210 L 64 110" fill={bodyColor} />
        </svg>
    );

    const FemaleOverweight = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="25" r="12" fill={bodyColor} />
            {/* Torso: Curvier, wider hips */}
            <path d="M 38 42 L 62 42 Q 68 60 62 75 Q 60 85 68 100 L 70 115 L 30 115 L 32 100 Q 40 85 38 75 Q 32 60 38 42 Z" fill={bodyColor} />
            {/* Arms */}
            <rect x="25" y="44" width="11" height="65" rx="5.5" fill={bodyColor} transform="rotate(8 30 44)" />
            <rect x="64" y="44" width="11" height="65" rx="5.5" fill={bodyColor} transform="rotate(-8 70 44)" />
            {/* Legs */}
            <path d="M 32 115 L 36 210 L 48 210 L 49 160 L 51 160 L 52 210 L 64 210 L 68 115" fill={bodyColor} />
        </svg>
    );

    const FemaleObese = () => (
        <svg viewBox="0 0 100 220" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="25" r="13" fill={bodyColor} />
            {/* Torso: Pear shape/Round */}
            <ellipse cx="50" cy="90" rx="30" ry="38" fill={bodyColor} />
            {/* Upper chest connection */}
            <path d="M 38 45 L 62 45 L 65 65 L 35 65 Z" fill={bodyColor} />
            {/* Arms */}
            <rect x="18" y="50" width="13" height="60" rx="6.5" fill={bodyColor} transform="rotate(15 25 50)" />
            <rect x="69" y="50" width="13" height="60" rx="6.5" fill={bodyColor} transform="rotate(-15 75 50)" />
            {/* Legs */}
            <path d="M 30 115 L 35 210 L 48 210 L 49 160 L 51 160 L 52 210 L 65 210 L 70 115" fill={bodyColor} />
        </svg>
    );

    return (
        <div className="relative w-40 h-64 flex items-center justify-center animate-scale-in">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-t from-white/0 to-${isMale ? 'blue' : 'pink'}-500/10 rounded-full blur-2xl transform scale-75 translate-y-4`} />

            {isMale ? (
                <>
                    {category === 'Underweight' && <MaleUnderweight />}
                    {category === 'Normal' && <MaleNormal />}
                    {category === 'Overweight' && <MaleOverweight />}
                    {category === 'Obese' && <MaleObese />}
                </>
            ) : (
                <>
                    {category === 'Underweight' && <FemaleUnderweight />}
                    {category === 'Normal' && <FemaleNormal />}
                    {category === 'Overweight' && <FemaleOverweight />}
                    {category === 'Obese' && <FemaleObese />}
                </>
            )}
        </div>
    );
};

export default HumanFigure;

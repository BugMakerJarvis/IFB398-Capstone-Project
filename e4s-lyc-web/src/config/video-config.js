const cardConfig = [
    {title: "Day1", info: "Your Challenge Inspiration"},
    {title: "Day2", info: "Connecting To Yourself"},
    {title: "Day3", info: "Notice Yourself"},
    {title: "Day4", info: "Energy Giving, Energy Draining"},
    {title: "Day5", info: "A Day In The Life"},
    {title: "Day6", info: "Finding Joy"},
    {title: "Day7", info: "Acknowledging Fear"},
    {title: "Day8", info: "Self Feedback"},
    {title: "Day9", info: "Feedback To Others"},
    {title: "Day10", info: "Notice yourself"},
    {title: "Day11", info: "Notice yourself"},
    {title: "Day12", info: "Notice yourself"},
    {title: "Day13", info: "Notice yourself"},
    {title: "Day14", info: "Notice yourself"},
    {title: "Day15", info: "Notice yourself"},
    {title: "Day16", info: "Notice yourself"},
    {title: "Day17", info: "Notice yourself"},
    {title: "Day18", info: "Notice yourself"},
    {title: "Day19", info: "Notice yourself"},
    {title: "Day20", info: "Notice yourself"},
    {title: "Day21", info: "Notice yourself"}
];

export function getVideoCardConfig() {
    if (!cardConfig) {
        throw new Error('No video card config.');
    } else {
        return cardConfig;
    }
}

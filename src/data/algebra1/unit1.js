// Algebra 1 Unit 1: One-Variable Statistics
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u1", title: "One-Variable Statistics", color: "#6366f1",
  topics: [
    {
      id: "a1u1-l2", lesson: 2,
      title: "Five-Number Summary",
      target: "I can find the five-number summary for data.",
      generate() {
        const n = 7;
        const raw = Array.from({ length: n }, () => rand(10, 50)).sort((a, b) => a - b);
        const [min, , , , , , max] = raw;
        const median = raw[3];
        const q1 = raw[1];
        const q3 = raw[5];
        const correct = `Min=${raw[0]}, Q1=${q1}, Med=${median}, Q3=${q3}, Max=${raw[6]}`;
        const wrong = [
          `Min=${raw[0]}, Q1=${raw[2]}, Med=${median}, Q3=${raw[4]}, Max=${raw[6]}`,
          `Min=${raw[0]}, Q1=${q1}, Med=${raw[2]}, Q3=${q3}, Max=${raw[6]}`,
          `Min=${raw[1]}, Q1=${q1}, Med=${median}, Q3=${q3}, Max=${raw[5]}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Find the five-number summary for: ${raw.join(", ")}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Sorted: ${raw.join(", ")}. Min=${raw[0]}, Q1=${q1} (median of lower half), Median=${median} (middle value), Q3=${q3} (median of upper half), Max=${raw[6]}.`,
        };
      },
    },
    {
      id: "a1u1-l5", lesson: 5,
      title: "Mean, Median, IQR, and MAD",
      target: "I can calculate mean absolute deviation, interquartile range, mean, and median for a set of data.",
      generate() {
        const type = pick(["mean", "median", "IQR"]);
        const data = Array.from({ length: 6 }, () => rand(5, 30)).sort((a, b) => a - b);
        const mean = +(data.reduce((s, v) => s + v, 0) / data.length).toFixed(1);
        const median = +((data[2] + data[3]) / 2).toFixed(1);
        const iqr = data[4] - data[1];

        const [correct, exp, wrong] = type === "mean"
          ? [String(mean), `Mean = sum ÷ count = ${data.reduce((s,v)=>s+v,0)} ÷ ${data.length} = ${mean}.`,
             [String(median), String(iqr), String(data[2])]]
          : type === "median"
          ? [String(median), `With 6 values, median = average of 3rd and 4th: (${data[2]}+${data[3]})/2 = ${median}.`,
             [String(mean), String(data[2]), String(data[3])]]
          : [String(iqr), `IQR = Q3 − Q1 = ${data[4]} − ${data[1]} = ${iqr}.`,
             [String(data[5]-data[0]), String(data[3]-data[2]), String(iqr+2)]];

        const choices = shuffle([correct, ...wrong.filter(w => w !== correct)].slice(0, 4));
        return {
          question: `Data set: ${data.join(", ")}. Find the ${type === "IQR" ? "interquartile range (IQR)" : type}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
        };
      },
    },
    {
      id: "a1u1-l10", lesson: 10,
      title: "Mean vs. Median with Outliers",
      target: "I can describe how an extreme value will affect the mean and median.",
      generate() {
        const data = [rand(10,20), rand(10,20), rand(10,20), rand(10,20), rand(10,20)].sort((a,b)=>a-b);
        const outlier = rand(80, 120);
        const withOut = [...data, outlier].sort((a,b)=>a-b);
        const mean1 = +(data.reduce((s,v)=>s+v,0)/data.length).toFixed(1);
        const mean2 = +(withOut.reduce((s,v)=>s+v,0)/withOut.length).toFixed(1);
        const med1 = data[2];
        const med2 = +((withOut[2]+withOut[3])/2).toFixed(1);
        const q = pick(["mean", "median"]);
        const correct = q === "mean"
          ? `Increases significantly (from ~${mean1} to ~${mean2})`
          : `Changes very little (from ${med1} to ${med2})`;
        const wrong = q === "mean"
          ? [`Stays the same`, `Changes very little`, `Decreases`]
          : [`Increases significantly`, `Stays exactly the same`, `Decreases significantly`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Data: ${data.join(", ")}. An outlier of ${outlier} is added. What happens to the ${q}?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: q === "mean"
            ? `The mean is pulled toward the outlier: ${mean1} → ${mean2}. Extreme values heavily affect the mean.`
            : `The median is resistant to outliers. It shifts only slightly: ${med1} → ${med2}.`,
        };
      },
    },
    { id:"a1u1-l4",  lesson:4,  title:"Distribution Shape",    target:"I can describe the shape of a distribution using the terms symmetric, skewed, uniform, bimodal, and bell-shaped." },
    { id:"a1u1-l11", lesson:11, title:"Comparing Variability",  target:"I can arrange data sets in order of variability given graphic representations." },
    { id:"a1u1-l12", lesson:12, title:"Standard Deviation",     target:"I can describe standard deviation as a measure of variability and use technology to compute it." },
    { id:"a1u1-l14", lesson:14, title:"Outliers",               target:"I can find values that are outliers and tell how an outlier will impact mean, median, IQR, or standard deviation." },
    { id:"a1u1-l15", lesson:15, title:"Comparing Distributions",target:"I can compare and contrast situations using measures of center and measures of variability." },
  ],
};

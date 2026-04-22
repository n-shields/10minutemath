// Algebra 1 Unit 3: Two-Variable Statistics
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u3", title: "Two-Variable Statistics", color: "#ec4899",
  topics: [
    {
      id: "a1u3-l1", lesson: 1,
      title: "Two-Way Tables",
      target: "I can calculate missing values in a two-way table and describe what they mean.",
      generate() {
        const a = rand(10, 30), b = rand(10, 30), c = rand(10, 30), d = rand(10, 30);
        const rowA = a + b, rowB = c + d, colX = a + c, colY = b + d, total = a + b + c + d;
        const q = pick(["row total", "column total", "grand total"]);
        const correct = q === "row total" ? `Row 1 total = ${rowA}` : q === "column total" ? `Col 1 total = ${colX}` : `Grand total = ${total}`;
        const wrong = [
          `Row 1 total = ${rowA + 2}`,
          `Col 1 total = ${colX - 1}`,
          `Grand total = ${total + rand(1, 5)}`,
        ].filter(w => w !== correct).slice(0, 3);
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Two-way table:\n  Cat X: ${a} (Group A), ${c} (Group B)\n  Cat Y: ${b} (Group A), ${d} (Group B)\nFind the ${q}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Add across the row or down the column: ${correct}.`,
        };
      },
    },
    {
      id: "a1u3-l4", lesson: 4,
      title: "Linear Models and Rate of Change",
      target: "I can describe the rate of change and y-intercept for a linear model in everyday language.",
      generate() {
        const m = rand(2, 10), b = rand(0, 50);
        const contexts = [
          { ctx: `A plant grows ${m} cm per week and starts at ${b} cm.`, x: "weeks", y: "height (cm)", exp: `Slope = ${m} means the plant grows ${m} cm each week. y-intercept = ${b} means it started at ${b} cm.` },
          { ctx: `A car rental costs $${b} upfront plus $${m} per mile.`, x: "miles", y: "total cost ($)", exp: `Slope = ${m} means cost increases $${m} per mile. y-intercept = ${b} is the flat upfront fee.` },
        ];
        const ctx = pick(contexts);
        const x1 = rand(1, 5), y1 = m * x1 + b;
        const correct = `Slope = ${m}, y-intercept = ${b}`;
        const wrong = [`Slope = ${b}, y-intercept = ${m}`, `Slope = ${m+1}, y-intercept = ${b}`, `Slope = ${m}, y-intercept = ${b+1}`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `${ctx.ctx} The equation is y = ${m}x + ${b}. Identify the slope and y-intercept.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: ctx.exp,
        };
      },
    },
    {
      id: "a1u3-l7", lesson: 7,
      title: "Correlation Coefficient",
      target: "I can describe the goodness of fit of a linear model using the correlation coefficient.",
      generate() {
        const scenarios = [
          { r: "0.97", desc: "Number of hours studied and test score", strength: "Strong positive", exp: "r = 0.97 is close to 1, indicating a strong positive linear relationship." },
          { r: "−0.85", desc: "Temperature and hot chocolate sales", strength: "Strong negative", exp: "r = −0.85 is close to −1, indicating a strong negative linear relationship." },
          { r: "0.12", desc: "Shoe size and GPA", strength: "Weak/no relationship", exp: "r = 0.12 is close to 0, indicating little to no linear relationship." },
          { r: "−0.63", desc: "Age of car and resale value", strength: "Moderate negative", exp: "r = −0.63 indicates a moderate negative linear relationship." },
          { r: "0.78", desc: "Height and weight of adults", strength: "Moderate positive", exp: "r = 0.78 indicates a moderate positive linear relationship." },
        ];
        const s = pick(scenarios);
        const correct = s.strength;
        const wrong = ["Strong positive", "Strong negative", "Weak/no relationship", "Moderate positive", "Moderate negative"].filter(w => w !== s.strength).slice(0, 3);
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A linear model for "${s.desc}" has correlation coefficient r = ${s.r}. How would you describe the relationship?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: s.exp,
        };
      },
    },
    { id:"a1u3-l2", lesson:2, title:"Relative Frequency Tables", target:"I can calculate values in a relative frequency table and describe what they mean in everyday language." },
    { id:"a1u3-l3", lesson:3, title:"Association in Tables",      target:"I can look for patterns in two-way tables to see if there is a possible association between two variables." },
    { id:"a1u3-l6", lesson:6, title:"Residuals",                   target:"I can plot and calculate residuals for a data set and use the information to judge whether a linear model is a good fit." },
    { id:"a1u3-l9", lesson:9, title:"Correlation vs. Causation",   target:"I can look for connections between two variables to analyze whether or not there is a causal relationship." },
  ],
};

export const lessons = [
    {
        id: "01",
        title: "The Model That Looked Perfect... On Paper",
        type: "Failure",
        domain: "Machine Learning",
        description: "Built a customer churn prediction model with 95% accuracy in testing. Celebrated, deployed, and... it failed spectacularly in production. Turns out, I had data leakage—using information that wouldn't be available at prediction time.",
        lesson: "Always simulate the production environment during testing. If it feels too good to be true, dig deeper. Now I obsessively check for temporal leakage and use time-based splits.",
        borderColor: "border-red-500" // Optional accent for failures
    },
    {
        id: "02",
        title: "When I Over-Engineered a Simple Solution",
        type: "Mistake",
        domain: "Architecture",
        description: "Spent three weeks building a sophisticated deep learning model for a classification problem. A senior engineer showed me a logistic regression solution that performed just as well and took 10 minutes to build.",
        lesson: "Start simple, then scale complexity only when needed. The best solution is the one that solves the problem reliably, not the one that sounds coolest at conferences.",
        borderColor: "border-orange-500"
    },
    {
        id: "03",
        title: "Ignoring the Stakeholders' Perspective",
        type: "Failure",
        domain: "Communication",
        description: "Created an amazing recommendation system with cutting-edge collaborative filtering. Business team rejected it because they couldn't explain to customers why certain products were recommended. All that work, shelved.",
        lesson: "Model interpretability isn't optional—it's a feature. Now I involve stakeholders from day one and prioritize solutions they can actually use and trust.",
        borderColor: "border-yellow-500"
    },
    {
        id: "04",
        title: "The Pipeline That Wasn't Production-Ready",
        type: "Mistake",
        domain: "Engineering",
        description: "My Jupyter notebook worked perfectly for the demo. Handed it off to engineering, and they spent two weeks refactoring it. No error handling, hardcoded paths, no logging, no tests. It was a mess.",
        lesson: "Write production-quality code from the start. Every notebook should have error handling, logging, and tests. \"It works on my machine\" isn't a deployment strategy.",
        borderColor: "border-indigo-500"
    }
];

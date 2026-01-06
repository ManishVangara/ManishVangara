import { default as aiCustomerSupportHtml } from './projects/ai-customer-support.html?raw';

export const allProjects = [
    {
        id: 1,
        title: "AI Customer Support Agent",
        category: "Generative AI",
        description: "A context-aware customer support agent built with Large Language Models (LLMs) and RAG. Handles complex queries and escalates appropriately.",
        tech: ["Python", "LangChain", "OpenAI", "Pinecone"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop",
        github: "#",
        live: "#",
        notionId: "2a70b6c96b2280f89442e97c41208abc", // Placeholder: Official Notion API Test Page
        htmlContent: aiCustomerSupportHtml
    },
    {
        id: 2,
        title: "Predictive Maintenance System",
        category: "Machine Learning",
        description: "End-to-end pipeline predicting machinery failure. Processes sensor data via Kafka, trains XGBoost models, and serves insights via FastAPI.",
        tech: ["Python", "Kafka", "XGBoost", "FastAPI"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        github: "#",
        live: "#",
        notionId: "067dd719a912471ea9a3ac10710e7fdf" // Placeholder
    },
    {
        id: 3,
        title: "Real-time Traffic Analytics",
        category: "Data Engineering",
        description: "Scalable data warehouse solution utilizing Airflow and Snowflake to visualize city traffic patterns in real-time.",
        tech: ["Airflow", "Snowflake", "dbt", "AWS"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        github: "#",
        live: "#",
        notionId: "067dd719a912471ea9a3ac10710e7fdf" // Placeholder
    },
    {
        id: 4,
        title: "Computer Vision Safety System",
        category: "Computer Vision",
        description: "Automated safety compliance monitoring using YOLOv8 to detect PPE equipment in manufacturing plants.",
        tech: ["PyTorch", "YOLOv8", "OpenCV", "Flask"],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
        github: "#",
        live: "#",
        notionId: "067dd719a912471ea9a3ac10710e7fdf" // Placeholder
    },
    {
        id: 5,
        title: "Financial Sentiment Analyzer",
        category: "NLP",
        description: "Analyzes news headlines and social media to gauge market sentiment for crypto assets using customized BERT models.",
        tech: ["HuggingFace", "BERT", "React", "Python"],
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
        github: "#",
        live: "#",
        notionId: "067dd719a912471ea9a3ac10710e7fdf" // Placeholder
    },
    {
        id: 6,
        title: "Secure Data Vault",
        category: "Full Stack",
        description: "Zero-knowledge encryption file storage system allowing users to securely store and share sensitive documents.",
        tech: ["Node.js", "React", "WebCrypto API", "MongoDB"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
        github: "#",
        live: "#",
        notionId: "067dd719a912471ea9a3ac10710e7fdf" // Placeholder
    }
];

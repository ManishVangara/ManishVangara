
/**
 * Blog Data Configuration
 * 
 * Instructions:
 * - content: Use standard HTML tags. Use backticks (`) for multi-line strings.
 * - mediumUrl: If provided, the card will link to Medium. If empty ("") or null, it will open the local blog page using 'content'.
 */

export const blogs = [
    {
        id: "1",
        title: "The Art of Scaling Microservices",
        excerpt: "Lessons learned from decomposing a monolithic application into distributed services using Kubernetes and gRPC.",
        date: "Jan 1, 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&auto=format&fit=crop&q=60",
        mediumUrl: "https://medium.com/@manishvangara/art-of-scaling-microservices",
        tags: ["System Design", "Kubernetes", "Microservices"],
        content: `
            <h2>Introduction</h2>
            <p>Scaling a system from a few hundred users to millions is a journey fraught with challenges, unexpected bottlenecks, and difficult architectural decisions. In this post, I'll share the lessons we learned while migrating our core e-commerce platform from a monolithic architecture to a distributed microservices ecosystem.</p>
            
            <h3>The Monolith: Where We Started</h3>
            <p>Our journey began with a classic problem: success. Our Ruby on Rails monolith was serving us well, until it wasn't. Deployment times crept up to 45 minutes, a single memory leak could bring down the entire checkout process, and onboarding new engineers meant navigating a codebase with high coupling and low cohesion.</p>
            
            <blockquote>
                "The complexity of a system scales with the square of the team size unless you actively work to decouple it."
            </blockquote>

            <h3>Why Kubernetes?</h3>
            <p>We chose Kubernetes not just for orchestration, but for the ecosystem. The declarative nature of K8s resources allowed us to define our infrastructure as code, giving us reproducibility and confidence in our deployments.</p>
            
            <ul>
                <li><strong>Service Discovery:</strong> Automated DNS management for internal services.</li>
                <li><strong>Self-healing:</strong> Automatic restarts for crashed containers.</li>
                <li><strong>Scaling:</strong> Horizontal Pod Autoscaling (HPA) based on custom metrics.</li>
            </ul>

            <h3>Communication Patterns: REST vs. gRPC</h3>
            <p>While REST is great for external APIs, we found the JSON serialization overhead significant for extensive inter-service communication. We adopted <strong>gRPC</strong> for internal traffic, which gave us:</p>
            <ol>
                <li>Strongly typed contracts (Protobuf).</li>
                <li>Smaller payload sizes.</li>
                <li>Bidirectional streaming capabilities.</li>
            </ol>

            <pre><code class="language-protobuf">
service OrderService {
  rpc CreateOrder (CreateOrderRequest) returns (OrderResponse);
}

message CreateOrderRequest {
  string user_id = 1;
  repeated Item items = 2;
}
            </code></pre>

            <h3>Conclusion</h3>
            <p>Microservices aren't a silver bullet. They introduce new complexities around observability, data consistency, and network latency. However, for a team of 50+ engineers and a system serving millions of requests, the trade-offs were worth it.</p>
        `
    },
    {
        id: "2",
        title: "Understanding LLMs: From Zero to Hero",
        excerpt: "A deep dive into the architecture of Large Language Models, attention mechanisms, and fine-tuning strategies.",
        date: "Dec 15, 2023",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
        mediumUrl: "", // Empty URL triggers local view
        tags: ["AI", "Machine Learning", "NLP"],
        content: `
            <h2>The Transformer Revolution</h2>
            <p>It all changed in 2017 with the paper "Attention Is All You Need". The Transformer architecture proposed a mechanism that allowed models to process data in parallel, unlike the sequential nature of RNNs and LSTMs.</p>
            
            <h3>Self-Attention Mechanism</h3>
            <p>At the heart of the Transformer is the self-attention mechanism. It calculates the importance of each word in a sentence relative to every other word. This allows the model to understand context and nuance locally and globally.</p>

            <p>Imagine reading a sentence:</p>
            <blockquote>"The animal didn't cross the street because it was too tired."</blockquote>
            <p>What does "it" refer to? The street or the animal? Self-attention allows the model to associate "it" strongly with "animal".</p>

            <h3>Fine-Tuning Strategies</h3>
            <p>Training a model from scratch is prohibitively expensive. This is where fine-tuning comes in. Techniques like <strong>LoRA (Low-Rank Adaptation)</strong> allow us to fine-tune massive models on consumer hardware by freezing the pre-trained weights and injecting trainable rank decomposition matrices.</p>
        `
    },
    {
        id: "3",
        title: "Optimizing React Performance",
        excerpt: "Advanced techniques to reduce re-renders, optimize bundle size, and improve Core Web Vitals.",
        date: "Nov 28, 2023",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        mediumUrl: "https://medium.com/@manishvangara/optimizing-react",
        tags: ["React", "Frontend", "Performance"],
        content: `
            <h2>The Cost of Re-renders</h2>
            <p>React is fast, but it can be faster. Unnecessary re-renders are the silent killer of React performance. Understanding the virtual DOM diffing algorithm is key to writing efficient components.</p>

            <h3>UseMemo and UseCallback</h3>
            <p>These hooks are powerful, but overusing them has a cost. They should be used when:</p>
            <ul>
                <li>Referential equality is required (e.g., in dependency arrays).</li>
                <li>Expensive calculations need to be cached.</li>
            </ul>

            <h3>Code Splitting</h3>
            <p>Don't ship code the user doesn't need. React.lazy and Suspense allow us to split our bundle into smaller chunks that are loaded on demand.</p>
        `
    },
    {
        id: "4",
        title: "Data Engineering Pipelines with Airflow",
        excerpt: "Building robust ETL pipelines using Apache Airflow, dbt, and Snowflake for real-time analytics.",
        date: "Oct 10, 2023",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        mediumUrl: "",
        tags: ["Data Engineering", "Airflow", "Snowflake"],
        content: `
            <h2>Modern Data Stack</h2>
            <p>The days of drag-and-drop ETL tools are fading. The modern data stack is defined by "Engineering" practices applied to data. Version control, testing, and CI/CD are now standard in data pipelines.</p>

            <h3>Orchestration with Airflow</h3>
            <p>Airflow allows us to define pipelines as code (DAGs) in Python. This gives us immense flexibility and power to define complex dependencies and retry logic.</p>

            <h3>Transformation with dbt</h3>
            <p>dbt (data build tool) has revolutionized how we transform data. By running SQL select statements inside our data warehouse, we leverage the compute power of Snowflake while maintaining modular, testable SQL code.</p>
        `
    }
];

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
// Lazy load page components for better performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ProjectDetails = React.lazy(() => import('./pages/ProjectDetails').then(module => ({ default: module.ProjectDetails })));
const Blogs = React.lazy(() => import('./pages/Blogs').then(module => ({ default: module.Blogs })));
const BlogPost = React.lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPost })));

import { ScrollToAnchor } from './components/ScrollToAnchor';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-[#F3F0E6] dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        <ScrollToAnchor />
        <Navbar />
        <main>
          <React.Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogPost />} />
            </Routes>
          </React.Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

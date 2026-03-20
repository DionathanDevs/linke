import { useState, useEffect } from 'react';
import { links } from './data/links';
import LinkCard from './components/LinkCard';
import ViewBadge from './components/ViewBadge';

function App() {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        // 1. Fetch current views initially just in case POST is rate-limited
        const fetchViews = async () => {
            try {
                const response = await fetch('/api/views');
                if (response.ok) {
                    const data = await response.json();
                    setViewCount(data.count);
                }
            } catch (error) {
                console.error('Error fetching views:', error);
            }
        };

        // 2. Increment the view count by making a POST request
        const incrementViews = async () => {
            try {
                const response = await fetch('/api/views', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setViewCount(data.count);
                } else if (response.status === 429) {
                    // If rate limited, just fetch the current count without incrementing
                    fetchViews();
                }
            } catch (error) {
                console.error('Error incrementing views:', error);
            }
        };

        // Use relative path since backend will serve this in production, 
        // or proxy needs to be set up in vite config for local dev.
        incrementViews();
    }, []);

    return (
        <div className="app-container">
            {/* Profile Header */}
            <header className="profile-section">
                {/* Using a placeholder avatar, replace src with your actual image */}
                <img
                    src="/images/perfil.jpeg"
                    alt="Profile Avatar"
                    className="profile-img"
                />
                <h1 className="profile-name">@Dionathan</h1>
                <p className="profile-bio">Desenvolvedor Full Stack Junior | JavaScript | NodeJs</p>
            </header>

            {/* Links Layout */}
            <main className="links-container">
                {links.map((link) => (
                    <LinkCard
                        key={link.id}
                        title={link.title}
                        url={link.url}
                        icon={link.icon}
                    />
                ))}
            </main>

            {/* Footer / Badge */}
            <footer className="footer">
                <ViewBadge viewCount={viewCount} />
            </footer>
        </div>
    );
}

export default App;

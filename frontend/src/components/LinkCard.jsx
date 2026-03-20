import React from 'react';

const LinkCard = ({ title, url, icon: Icon }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="link-item">
            {Icon && (
                <div className="link-icon">
                    <Icon size={24} />
                </div>
            )}
            <span className="link-title">{title}</span>
        </a>
    );
};

export default LinkCard;

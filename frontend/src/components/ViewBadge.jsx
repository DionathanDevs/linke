import React from 'react';
import { Eye } from 'lucide-react';

const ViewBadge = ({ viewCount }) => {
    return (
        <div className="view-badge">
            <Eye size={16} />
            <span>{viewCount.toLocaleString()} views</span>
        </div>
    );
};

export default ViewBadge;

import React from 'react';
import { Link } from 'react-router-dom';

function CategoryItem({category}) {
    return (
        <div className="category-box">
            <Link 
                to={category.url}
            >
                <div className="category-image">
                    <img 
                        src={ category.image } 
                        alt={category.label} 
                    />
                    <div className="category-text-box">
                        <span>{category.label}</span>
                    </div>
                </div>
            </Link>
        </div> 
    )
}

export default CategoryItem;

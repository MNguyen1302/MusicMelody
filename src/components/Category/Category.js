import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import './Category.css';

function Category() {
    const [ category, setCategory ] = useState([]);
    useEffect(() => {
        const category = [
            {
                label: 'Classical',
                image: 'https://i1.wp.com/whimsicalwonderlandweddings.com/wp-content/uploads/2018/09/Northern-Violin-2.jpg?resize=960%2C640&ssl=1',
                url: '/genre/classical'
            },
            {
                label: 'Country',
                image: 'https://townsquare.media/site/204/files/2018/04/Taylor-Country-Comeback.jpg?w=980&q=75',
                url: '/genre/country'
            
            },
            {
                label: 'Edm',
                image: 'https://cdn.digitaldjtips.com/app/uploads/2014/08/06035221/How-To-Mix-Six-Tips-For-Complete-Beginner-Digital-DJs-copy-1204x642.jpg',
                url: '/genre/edm'
            },
            {
                label: 'Hip-hop',
                image: 'https://www.udiscovermusic.com/wp-content/uploads/2016/02/Hip-Hop-In-20-Songs-artwork-web-optimised-1000.jpg',
                url: '/genre/hiphop'
            },
            {
                label: 'Jazz',
                image: 'https://www.elleman.vn/wp-content/uploads/2016/09/20/The-Reverie-Saigon-ra-m%E1%BA%AFt-ch%C6%B0%C6%A1ng-tr%C3%ACnh-nh%E1%BA%A1c-jazz-s%E1%BB%91ng-%C4%91%E1%BB%99ng-475x267.jpg',
                url: '/genre/jazz'
            },
            {
                label: 'Kpop',
                image: 'https://bloganchoi.com/wp-content/uploads/2021/02/black-pink.jpg',
                url: '/genre/kpop'
            },
            {
                label: 'Pop',
                image: 'https://ca-times.brightspotcdn.com/dims4/default/91665e0/2147483647/strip/true/crop/2048x1152+0+0/resize/1486x836!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F53%2Fee%2Fd757603e1686a76c6895211b4b70%2Fla-1526433194-6oe63vlztw-snap-image',
                url: '/genre/pop'
            },
            {
                label: 'Rap',
                image: 'https://saigondance.files.wordpress.com/2018/10/image34.jpg',
                url: '/genre/rap'
            },
            {
                label: 'R&b',
                image: 'https://www.rollingstone.com/wp-content/uploads/2019/12/SummerWalker.jpg?w=800',
                url: '/genre/r&b'
            },
            {
                label: 'Rock',
                image: 'https://images.saymedia-content.com/.image/t_share/MTc0OTkyOTg1NDUxMjc1NzE2/100-best-bollywood-rock-songs.jpg',
                url: '/genre/rock'
            },
        ]

        setCategory(category);
    }, [])

    return (
        <div className="allsong-container">
            <div className="allsong-wrapper">
                <div className="category-container">
                    <div className="category-title">
                        <div className="title">
                            <h2>Category</h2>
                        </div>
                    </div>
                    <div className="category-wrapper">
                        { 
                            category.map((item, index) => {
                                return  <CategoryItem 
                                            key={ index } 
                                            category={ item }
                                        />
                            }) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;


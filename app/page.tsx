'use client'

import React, { useState, useEffect } from 'react'; 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { X as CloseIcon } from 'lucide-react';

interface Slide {
  src: string;
  caption: string;
}

interface Album {
  _id: string; 
  text: string;
  img: string;  
  alt: string;
  des: string;
  price: number;
  slides: Slide[];
}

export default function HomePage() {
    
    // --- STATE MANAGEMENT ---
    const [items, setItems] = useState<Album[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [activeSlideshow, setActiveSlideshow] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadData() {
            try {
                // FIXED: Added /getItem to match your backend route
                const res = await fetch('http://localhost:4000/api/v1/items');
                const data = await res.json();
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch items:", error);
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const totalSlides = activeSlideshow.length; 

    const nextSlide = () => setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
    const goToSlide = (index: number) => setCurrentSlide(index);

    const openModal = (album: Album) => {
        setSelectedAlbum(album);
        // Safety check to ensure slides exist
        setActiveSlideshow(album.slides || []);
        setCurrentSlide(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAlbum(null);
        setActiveSlideshow([]);
        setCurrentSlide(0);
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }
    }, []);

    const Logo = () => (
        <div className="logo-container">
          <span className="logo-text">Logo</span>
        </div>
    );
    
return (
<>
<header className="navbar-header">
    <nav className="navbar-nav">
        <div className="navbar-flex">
            <Logo />
        </div>
    </nav>
</header>

<div className="page-container">
    <div className="image-grid">
        {items.map((obj) =>  (
            <div key={obj._id} className="grid-item" onClick={() => openModal(obj)}>
                {/* FIXED: Changed src from obj.alt to obj.img */}
                <img src={obj.img} alt={obj.alt}/>
                <div className="overlay">
                    <p className="overlay-text">
                        <strong>{obj.text}</strong>
                    </p>
                </div>
            </div>
        ))}
    </div>
</div>

<Dialog
    open={isModalOpen}
    onClose={closeModal}
    maxWidth="lg"
    fullWidth={true}
    PaperProps={{
        style: {
            backgroundColor: '#f8f8f8',
            color: '#1a202c',
        }
    }}
>
{selectedAlbum && (
    <>
        <DialogContent dividers className='dialogContent'>
            <Box sx={{ mb: 2, overflow: 'hidden' }}>

                <div className="slideshow-page-container">
                    <div className="slideshow-container">
                        {activeSlideshow.map((slide, index) => (
                            <div
                                className={`slide fade ${index === currentSlide ? 'active' : ''}`}
                                key={index}
                                style={{ display: index === currentSlide ? 'block' : 'none' }}
                            >
                                <img src={slide.src} alt={slide.caption} />
                            </div>
                        ))}

                        {totalSlides > 1 && (
                            <>
                                <a className="prev" onClick={prevSlide}>&#10094;</a>
                                <a className="next" onClick={nextSlide}>&#10095;</a>
                            </>
                        )}
                    </div>

                    <div className="thumbnail-grid">
                        {activeSlideshow.map((slide, index) => (
                            <div
                                key={index}
                                className={`thumbnail-item ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            >
                                <img src={slide.src} alt={`Thumbnail for ${slide.caption}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </Box>

            <DialogTitle className='dialogTitle' style={{padding: 0,}}>
                <p className='dialogTitle-p'>
                    {selectedAlbum.text}
                </p>
                <IconButton 
                    className='closeBtn'
                    aria-label="close" 
                    onClick={closeModal} 
                    style={{ color: '#666', right: 0, position: 'absolute', transition: 'all 0.3s ease-in-out 0s', padding: 0,}}
                >
                    <CloseIcon size={24} />
                </IconButton>
            </DialogTitle>
            
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ fontFamily: 'josefin sans', fontSize: {xs:"0.6rem", sm: " 0.8rem", md: "1rem"}}} className='dialogDescr'>
                        {selectedAlbum.des}
                </Typography>
            </Box>

            <Typography variant="body1" sx={{fontFamily: 'josefin sans', fontSize: {xs:"1.5rem", sm: " 2.5rem", md: "3.125rem"}, letterSpacing: 3,}} className='dialogPrice'>
                    {selectedAlbum.price} <span>GEL</span>
            </Typography>

            <Box>
                <div className="simItems-page-container">
                    <div className="simItems-image-grid">
                        {/* FIXED: Using _id and img correctly here too */}
                        {items.filter(item => item._id !== selectedAlbum._id).slice(0, 3).map((album) => (
                            <div 
                                key={album._id} 
                                className="simItems-grid-item"
                                onClick={() => openModal(album)}
                            >
                                <img
                                    src={album.img}
                                    alt={album.alt}
                                    className="simItems-grid-item-img"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Box>
        </DialogContent>
    </>
)}
</Dialog>
</>
);
}
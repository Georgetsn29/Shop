'use client'
import React, { useState, useEffect } from 'react'; 

import { simobject } from '../../backend/src/data/similarItems'
import { object } from '../../backend/src/data/items'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { X as CloseIcon } from 'lucide-react';

// --- 1. RESTRUCTURED DATA: Albums of Images ---
// Each object represents a main gallery thumbnail (Album).
// The 'slides' property holds the 3-4 images for the dialog slideshow.
interface Slide {
  src: string;
  caption: string;
}

interface Album {
  id: number;
  text: string;
  coverSrc: string;
  alt: string;
  des: string;
  price: number;
  slides: Slide[];
}

export default function HomePage() {

    useEffect(() => {
    async function loadData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hello`
      );
      const data = await res.json();
    }

    loadData();
  }, []);
    
    // --- STATE MANAGEMENT ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [activeSlideshow, setActiveSlideshow] = useState<Slide[]>([]);

    // Total slides is now dynamic based on the active set
    const totalSlides = activeSlideshow.length; 

    // --- SLIDESHOW NAVIGATION ---
    const nextSlide = () => {
        setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };


    const openModal = (album) => {
        setSelectedAlbum(album);
        setActiveSlideshow(album.slides);
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
    

    const currentSlideDetails = activeSlideshow[currentSlide] || {};
    

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
        {/* --- MAIN GALLERY GRID: Maps over imageAlbums --- */}
        {object.map(obj =>  (
            <div 
                key={obj.id} 
                className="grid-item"
                onClick={() => openModal(obj)} // Pass the full album
            >
                <img key={obj.id} src={obj.img} alt={obj.title} />
                
                {/* <img
                    src={album.coverSrc} // Use the coverSrc for the main page thumbnail
                    alt={album.alt}
                    className="grid-item-img"
                    width={400}
                    height={400}
                /> */}
                <div className="overlay">
                    <p className="overlay-text">
                        <strong>{obj.text}</strong> {obj.alt}
                    </p>
                </div>
            </div>
        ))}
    </div>
</div>

    {/* --- MUI Dialog Component --- */}
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

                        {/* --- SLIDESHOW: Maps over activeSlideshow --- */}
                        {activeSlideshow.map((slide, index) => (
                            <div
                                className={`slide fade ${index === currentSlide ? 'active' : ''}`}
                                key={index}
                                style={{ display: index === currentSlide ? 'block' : 'none' }}
                            >
                                <img src={slide.src} alt={slide.caption} />
                                {/* <div className="slide-caption">{slide.caption}</div> */}
                            </div>
                        ))}

                        {/* Only show navigation if there is more than 1 slide */}
                        {totalSlides > 1 && (
                            <>
                                {/* Next and previous buttons */}
                                <a className="prev" onClick={prevSlide}>&#10094;</a>
                                <a className="next" onClick={nextSlide}>&#10095;</a>
                            </>
                        )}

                        {/* Dot indicators */}
                        {/* {totalSlides > 1 && (
                            <div className="dot-container">
                                {activeSlideshow.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                    ></span>
                                ))}
                            </div>
                        )} */}
                    </div>

                    {/* Thumbnail Grid Section */}
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
                {/* Display the main album title + the current slide's caption */}
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
                {/* Display details for the overall album */}
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
    {simobject.map((album) => (
        <div 
            key={album.id} 
            className="simItems-grid-item"
            onClick={() => openModal(album)}
        >
            <img
                src={album.coverSrc}
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
'use client'
import React, { useState, useEffect } from 'react'; 

// --- MUI Component Imports ---
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

const imageAlbums = [
    { 
      id: 1, 
      text: 'Mountain Ridge Album',
      coverSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80', // Thumbnail image
      alt: 'A beautiful mountain ridge at sunset.',
      des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
      price: 199,
      slides: [
          { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 1: Misty Lake at Dawn' },
          { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', caption: 'Slide 2: Rocky Peak View' },
          { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 3: Forest Path in Summer' },
      ]
    },
    { 
      id: 2, 
      text: 'Desert Night Exploration',
      coverSrc: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', 
      alt: 'Stars over a vast desert landscape.',
      des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 1500,
      slides: [
          { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 1: Stars Above Desert' },
          { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 2: Desert Canyon Trail' },
          { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 3: Sunset Dunes Panorama' },
      ]
    },
    // Add more albums here...
    { 
        id: 3, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 20,
        slides: [
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80', caption: 'Slide 1: Spice Stalls' },
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 2: Misty Lake at Dawn' },
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 3: Alley Vendors' },
        ]
    },

    { 
        id: 4, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 20,
        slides: [
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80', caption: 'Slide 1: Spice Stalls' },
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 2: Misty Lake at Dawn' },
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 3: Alley Vendors' },
        ]
    },

    { 
        id: 5, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 199,
        slides: [
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 1: Misty Lake at Dawn' },
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', caption: 'Slide 2: Rocky Peak View' },
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 3: Forest Path in Summer' },
        ]
    },

    { 
        id: 6, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 1500,
        slides: [
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 1: Stars Above Desert' },
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 2: Desert Canyon Trail' },
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 3: Sunset Dunes Panorama' },
        ]
    },

    { 
        id: 7, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 199,
        slides: [
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 1: Misty Lake at Dawn' },
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', caption: 'Slide 2: Rocky Peak View' },
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 3: Forest Path in Summer' },
        ]
    },
    
    { 
        id: 8, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 1500,
        slides: [
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 1: Stars Above Desert' },
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 2: Desert Canyon Trail' },
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 3: Sunset Dunes Panorama' },
        ]
    },

    { 
        id: 9, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        price: 20,
        slides: [
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80', caption: 'Slide 1: Spice Stalls' },
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 2: Misty Lake at Dawn' },
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 3: Alley Vendors' },
        ]
    },
];

const similarItems = [
  { 
      id: 1, 
      text: 'Mountain Ridge Album',
      coverSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80', // Thumbnail image
      alt: 'A beautiful mountain ridge at sunset.',
      des: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
      price: 199,
      slides: [
          { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 1: Misty Lake at Dawn' },
          { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', caption: 'Slide 2: Rocky Peak View' },
          { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 3: Forest Path in Summer' },
      ]
    },
    { 
      id: 2, 
      text: 'Desert Night Exploration',
      coverSrc: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&q=80', 
      alt: 'Stars over a vast desert landscape.',
      des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 1500,
      slides: [
          { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 1: Stars Above Desert' },
          { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', caption: 'Slide 2: Desert Canyon Trail' },
          { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 3: Sunset Dunes Panorama' },
      ]
    },
    // Add more albums here...
    { 
        id: 3, 
        text: 'Vibrant Marketplace Scenes',
        coverSrc: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80', 
        alt: 'A bustling marketplace full of colour and life.',
        des: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
        price: 20,
        slides: [
            { src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80', caption: 'Slide 1: Spice Stalls' },
            { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Slide 2: Misty Lake at Dawn' },
            { src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80', caption: 'Slide 3: Alley Vendors' },
        ]
    },
]

export default function HomePage() {
    
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
        {imageAlbums.map((album) => (
            <div 
                key={album.id} 
                className="grid-item"
                onClick={() => openModal(album)} // Pass the full album
            >
                <img
                    src={album.coverSrc} // Use the coverSrc for the main page thumbnail
                    alt={album.alt}
                    className="grid-item-img"
                    width={400}
                    height={400}
                />
                <div className="overlay">
                    <p className="overlay-text">
                        <strong>{album.text}</strong> {album.alt}
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
                <Typography variant="body1" style={{ marginBottom: '0.5rem', fontFamily: 'josefin sans'}} className='dialogDescr'>
                        {selectedAlbum.des}
                </Typography>

            </Box>

            <Typography variant="body1" style={{fontFamily: 'josefin sans', fontSize: 50, letterSpacing: 3,}} className='dialogPrice'>
                    {selectedAlbum.price} <span>GEL</span>
            </Typography>

            <Box>

<div className="simItems-page-container">
<div className="simItems-image-grid">
    {similarItems.map((album) => (
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
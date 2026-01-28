'use client';

import { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from '@/components/ui';
import { galleryApi } from '@/lib/api';
import { useTranslation } from '@/context';
import type { GalleryItem, Album } from '@/types';
import { getYouTubeThumbnail } from '@/lib/utils';

// ============================================
// Gallery Item Component
// ============================================

function GalleryItemCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const thumbnailUrl =
    item.type === 'video' && item.youtubeId
      ? getYouTubeThumbnail(item.youtubeId, 'maxres')
      : item.thumbnailUrl || item.url;

  const isVideo = item.type === 'video';

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        isVideo ? 'aspect-video col-span-2' : 'aspect-square'
      }`}
    >
      <img
        src={thumbnailUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {isVideo ? (
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : (
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          )}
        </div>
      </div>
      {isVideo && (
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {t.gallery.video}
        </div>
      )}
      {isVideo && (
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-semibold text-lg drop-shadow-lg">{item.title}</h3>
          {item.description && (
            <p className="text-white/80 text-sm drop-shadow-lg">{item.description}</p>
          )}
        </div>
      )}
    </button>
  );
}

// ============================================
// Lightbox Modal
// ============================================

function Lightbox({
  item,
  isOpen,
  onClose,
}: {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="flex flex-col items-center">
        {item.type === 'video' && item.youtubeId ? (
          <div className="aspect-video w-full max-w-4xl">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        ) : (
          <img
            src={item.url}
            alt={item.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        )}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.description && (
            <p className="text-gray-600 mt-1">{item.description}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

// ============================================
// Sample Gallery Data (for design preview)
// ============================================

const sampleGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Cultural Celebration',
    description: 'Traditional Tamu dress and celebration',
    url: '/images/gallery/1.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Our Homeland',
    description: 'The beautiful Himalayan mountains',
    url: '/images/gallery/2.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Traditional Lifestyle',
    description: 'Pastoral life in the hills',
    url: '/images/gallery/3.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Tamu Cultural Video',
    description: 'Experience our rich cultural heritage',
    url: '',
    type: 'video',
    youtubeId: 'm0MXDApIC8U',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Traditional Music & Dance',
    description: 'Celebrating our ancestral traditions',
    url: '',
    type: 'video',
    youtubeId: '0PHJ-kGuWdY',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Festival Moments',
    description: 'Celebrating together',
    url: '/images/gallery/1.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Mountain Views',
    description: 'Views from our homeland',
    url: '/images/gallery/2.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Village Life',
    description: 'Life in the mountains',
    url: '/images/gallery/3.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Community Gathering',
    description: 'Our people coming together',
    url: '/images/gallery/1.jpg',
    type: 'image',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ============================================
// Gallery Page
// ============================================

export default function GalleryPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<GalleryItem[]>(sampleGalleryItems);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  // Try to fetch from API, fallback to sample data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const [itemsResponse, albumsData] = await Promise.all([
          galleryApi.getAll({
            type: activeFilter === 'all' ? undefined : activeFilter,
            albumId: activeAlbum || undefined,
          }),
          galleryApi.getAlbums(),
        ]);
        if (itemsResponse.data.length > 0) {
          setItems(itemsResponse.data);
        }
        setAlbums(albumsData);
      } catch {
        // Keep sample data on error
      }
    };

    fetchGallery();
  }, [activeFilter, activeAlbum]);

  // Filter items based on active filter
  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t.gallery.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.gallery.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex gap-2">
              <Button
                variant={activeFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                {t.common.all}
              </Button>
              <Button
                variant={activeFilter === 'image' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('image')}
              >
                {t.common.photos}
              </Button>
              <Button
                variant={activeFilter === 'video' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('video')}
              >
                {t.common.videos}
              </Button>
            </div>

            {albums.length > 0 && (
              <select
                value={activeAlbum || ''}
                onChange={(e) => setActiveAlbum(e.target.value || null)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Albums</option>
                {albums.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <GalleryItemCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery.noItems}</h3>
              <p className="text-gray-500">{t.gallery.noItemsSubtitle}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { Button, Modal, Spinner } from '@/components/ui';
import { galleryApi } from '@/lib/api';
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
  const thumbnailUrl =
    item.type === 'video' && item.youtubeId
      ? getYouTubeThumbnail(item.youtubeId, 'hq')
      : item.thumbnailUrl || item.url;

  return (
    <button
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <img
        src={thumbnailUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {item.type === 'video' ? (
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          )}
        </div>
      </div>
      {item.type === 'video' && (
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          Video
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
// Gallery Page
// ============================================

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const [itemsResponse, albumsData] = await Promise.all([
          galleryApi.getAll({
            type: activeFilter === 'all' ? undefined : activeFilter,
            albumId: activeAlbum || undefined,
          }),
          galleryApi.getAlbums(),
        ]);
        setItems(itemsResponse.data);
        setAlbums(albumsData);
      } catch {
        setItems([]);
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [activeFilter, activeAlbum]);

  const filteredItems = items;

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Photo & Video Gallery
            </h1>
            <p className="text-xl text-gray-600">
              Explore moments from our community events, cultural celebrations, and gatherings
              through our collection of photos and videos.
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
                All
              </Button>
              <Button
                variant={activeFilter === 'image' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('image')}
              >
                Photos
              </Button>
              <Button
                variant={activeFilter === 'video' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('video')}
              >
                Videos
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Items</h3>
              <p className="text-gray-500">Check back soon for photos and videos!</p>
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

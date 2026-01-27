'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Badge, Spinner, Modal, ModalFooter } from '@/components/ui';
import { galleryApi } from '@/lib/api';
import type { GalleryItem } from '@/types';
import { getYouTubeThumbnail, formatDate } from '@/lib/utils';

// ============================================
// Admin Gallery Page
// ============================================

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: GalleryItem | null }>({
    isOpen: false,
    item: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await galleryApi.getAll({ limit: 50 });
      setItems(response.data);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;

    setIsDeleting(true);
    try {
      await galleryApi.delete(deleteModal.item.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteModal.item?.id));
      setDeleteModal({ isOpen: false, item: null });
    } catch {
      alert('Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  const getThumbnail = (item: GalleryItem) => {
    if (item.type === 'video' && item.youtubeId) {
      return getYouTubeThumbnail(item.youtubeId, 'hq');
    }
    return item.thumbnailUrl || item.url;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600">Manage photos and videos</p>
        </div>
        <Button
          onClick={() => setUploadModal(true)}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Upload Media
        </Button>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <Card key={item.id} padding="none" className="group relative overflow-hidden">
              <div className="aspect-square">
                <img
                  src={getThumbnail(item)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
                <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-medium truncate mb-1">{item.title}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={item.type === 'video' ? 'primary' : 'default'}
                      size="sm"
                    >
                      {item.type === 'video' ? 'Video' : 'Photo'}
                    </Badge>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, item })}
                        className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Type indicator */}
              {item.type === 'video' && (
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Media Yet</h3>
          <p className="text-gray-500 mb-4">Get started by uploading photos or videos</p>
          <Button onClick={() => setUploadModal(true)}>Upload Media</Button>
        </Card>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModal}
        onClose={() => setUploadModal(false)}
        title="Upload Media"
        size="lg"
      >
        <div className="space-y-6">
          {/* Upload Zone */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-primary-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>

          {/* YouTube URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or add a YouTube video URL
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button variant="outline">Add Video</Button>
            </div>
          </div>
        </div>

        <ModalFooter>
          <Button variant="ghost" onClick={() => setUploadModal(false)}>
            Cancel
          </Button>
          <Button>Upload</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Media"
        size="sm"
      >
        <p className="text-gray-600">
          Are you sure you want to delete &quot;{deleteModal.item?.title}&quot;? This action cannot be undone.
        </p>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => setDeleteModal({ isOpen: false, item: null })}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

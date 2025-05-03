import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const FunUploadsAdmin = () => {
  const [uploads, setUploads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUpload, setNewUpload] = useState({
    name: '',
    description: '',
    file: null,
    previewUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  // Backend API base URL
  const API_BASE_URL = 'https://tma-hackathon.onrender.com';

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/uploads`);
      setUploads(response.data);
    } catch (err) {
      console.error('Error fetching uploads:', err);
      setError('Failed to load uploads. Please try again later.');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUpload({
          ...newUpload,
          file,
          previewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', newUpload.name);
      formData.append('description', newUpload.description);
      formData.append('file', newUpload.file);

      await axios.post(`${API_BASE_URL}/api/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await fetchUploads();
      setIsModalOpen(false);
      setNewUpload({
        name: '',
        description: '',
        file: null,
        previewUrl: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="fun-uploads" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              Community Gallery
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Share fun moments, memes, and behind-the-scenes from the event
          </p>
        </div>

        {/* Upload Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-all"
          >
            Share Your Moment
          </button>
          <p className="text-sm text-gray-400 mt-2">All uploads are anonymous</p>
        </div>

        {/* Loading State */}
        {fetchLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && !fetchLoading && (
          <div className="text-center py-12 bg-red-900/20 rounded-xl border border-red-800/50 max-w-2xl mx-auto">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={fetchUploads}
              className="mt-4 px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Uploads Gallery */}
        {!fetchLoading && !error && (
          <>
            {uploads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploads.map((upload) => (
                  <div key={upload._id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all">
                    {upload.fileType.startsWith('image') ? (
                      <img 
                        src={`${API_BASE_URL}${upload.fileUrl}`} 
                        alt={upload.description} 
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <video 
                        src={`${API_BASE_URL}${upload.fileUrl}`} 
                        controls 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      {upload.name && (
                        <h3 className="font-bold text-purple-300 mb-1">{upload.name}</h3>
                      )}
                      <p className="text-gray-300 text-sm">{upload.description}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        {new Date(upload.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-dashed border-gray-700">
                <p className="text-gray-400">No uploads yet. Be the first to share!</p>
              </div>
            )}
          </>
        )}

        {/* Upload Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-gray-900 rounded-xl border border-purple-900/50 max-w-md mx-auto p-6 mt-20"
          overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-purple-300">Share Your Fun Moment</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Your Name (Optional)</label>
                <input
                  type="text"
                  value={newUpload.name}
                  onChange={(e) => setNewUpload({...newUpload, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  placeholder="Anonymous"
                  maxLength={30}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={newUpload.description}
                  onChange={(e) => setNewUpload({...newUpload, description: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  placeholder="What's happening in this moment?"
                  rows={3}
                  maxLength={200}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Image or Video</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-gray-300 hover:cursor-pointer bg-gray-800 border border-gray-700 rounded px-4 py-2"
                  accept="image/*, video/*"
                  required
                />
                {newUpload.previewUrl && (
                  <div className="mt-2">
                    {newUpload.file?.type?.startsWith('image') ? (
                      <img src={newUpload.previewUrl} alt="Preview" className="max-h-40 rounded" />
                    ) : (
                      <video src={newUpload.previewUrl} controls className="max-h-40 rounded" />
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Max 10MB. Images or videos only.</p>
              </div>
              
              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {isLoading ? 'Uploading...' : 'Share'}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </section>
  );
};

export default FunUploadsAdmin;
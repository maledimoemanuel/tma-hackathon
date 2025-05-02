import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FunUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing uploads
  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/uploads');
      setUploads(response.data);
    } catch (err) {
      console.error('Error fetching uploads:', err);
      setError('Failed to load uploads. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="fun-uploads" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background matching other sections */}
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
            See the fun moments, memes, and behind-the-scenes from the event
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 bg-red-900/20 rounded-xl border border-red-800/50 max-w-2xl mx-auto">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Uploads Gallery */}
        {!isLoading && !error && (
          <>
            {uploads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploads.map((upload) => (
                  <div key={upload._id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all">
                    {upload.fileType.startsWith('image') ? (
                      <img 
                        src={`http://localhost:3001${upload.fileUrl}`} 
                        alt={upload.description} 
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <video 
                        src={`http://localhost:3001${upload.fileUrl}`} 
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
                <p className="text-gray-400">No uploads yet. Check back later!</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FunUploads;
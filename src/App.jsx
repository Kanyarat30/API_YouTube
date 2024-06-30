import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const YouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'YOUR_KEY'; // ใส่ API key ของคุณที่นี่
  const API_URL = 'https://www.googleapis.com/youtube/v3/search';

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: {
            part: 'snippet',
            q: searchTerm,
            type: 'video',
            maxResults: 10,
            key: API_KEY
          }
        });
        setVideos(response.data.items);
      } catch (error) {
        setError('Error fetching videos');
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchVideos();
    }
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">YouTube Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search YouTube videos"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={() => {}}>
            Search
          </button>
        </div>
      </div>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {videos.map((video) => (
          <div key={video.id.videoId} className="col-md-4 mb-4">
            <div className="card">
              <img src={video.snippet.thumbnails.medium.url} className="card-img-top" alt={video.snippet.title} />
              <div className="card-body">
                <h5 className="card-title">{video.snippet.title}</h5>
                <p className="card-text">{video.snippet.description}</p>
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Watch</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch;

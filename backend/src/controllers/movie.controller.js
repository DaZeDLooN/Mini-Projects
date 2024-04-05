const Movies = require("../models/movies.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Get All Movies
const getAllMovies = async (req, res) => {
    try {
      const movies = await Movies.findAll();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Movie by ID
  const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await Movies.findByPk(id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Create Movie
  const createMovie = async (req, res) => {
    const { title, genre, duration } = req.body;
    try {
      const movie = await Movies.create({ title, genre, duration });
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  };
  
  // Update Movie
  const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, genre, duration } = req.body;
    try {
      const movie = await Movies.findByPk(id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      movie.title = title;
      movie.genre = genre;
      movie.duration = duration;
      await movie.save();
      res.json(movie);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  };
  
  // Delete Movie
  const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await Movies.findByPk(id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      await movie.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
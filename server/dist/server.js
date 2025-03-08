import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './middleware/Auth.js';
import axios from 'axios';
import cors from 'cors'; // ✅ Import cors
// ✅ Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const startApolloServer = async () => {
    await server.start();
    await db();
    const PORT = process.env.PORT || 3001;
    const app = express();
    // ✅ Enable CORS for all routes BEFORE other middleware
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server, {
        context: authenticateToken
    }));
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/dist')));
        app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });
    }
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
    app.get('/api/jobs/search', async (req, res) => {
        try {
            const { query } = req.query;
            const page = req.query.page || 1;
            console.log('Query parameters:', { query, page });
            console.log('API credentials:', {
                appId: process.env.ADZUNA_APP_ID?.substring(0, 3) + '...',
                appKeyLength: process.env.ADZUNA_APP_KEY?.length
            });
            if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
                console.error('API credentials are missing');
                return res.status(500).json({ error: 'API configuration error' });
            }
            if (!query) {
                return res.status(400).json({ error: 'Query parameter is required' });
            }
            const url = `https://api.adzuna.com/v1/api/jobs/us/search/${page}`;
            console.log('Making request to:', url);
            const params = {
                app_id: process.env.ADZUNA_APP_ID,
                app_key: process.env.ADZUNA_APP_KEY,
                results_per_page: 10,
                what: query.toString(),
            };
            console.log('Request params:', params);
            const response = await axios.get(url, { params });
            console.log('Response status:', response.status);
            return res.json(response.data);
        }
        catch (error) {
            console.error('Error fetching jobs:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            return res.status(500).json({
                error: 'Failed to fetch jobs',
                details: error.message,
                response: error.response?.data
            });
        }
    });
};
startApolloServer();

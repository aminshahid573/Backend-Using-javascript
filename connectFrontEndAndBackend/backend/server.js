import express from 'express';

const app = express();

app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, title: "Joke 1", content: "Content 1" },
        { id: 2, title: "Joke 2", content: "Content 2" },
        { id: 3, title: "Joke 3", content: "Content 3" },
        { id: 4, title: "Joke 4", content: "Content 4" },
        { id: 5, title: "Joke 5", content: "Content 5" },
    ];

    res.json(jokes);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

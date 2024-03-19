import express from "express";
const app = express();
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

const generateIdNote = () => {
    const maxIdNote = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxIdNote + 1;
};

const generateIdPerson = () => {
    let min = 1;
    let max = 6000;
    let idPersonRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return idPersonRandom;
};

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

// notes
app.get("/api/notes", (request, response) => {
    response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find((note) => note.id === id);
    if (note) {
        response.json(note);
    } else {
        response.status(404).json({
            error: "No exist note",
        });
    }
});

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);

    console.log(notes);
    response.status(204).end();
});

app.post("/api/notes", (request, response) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: "content missing",
        });
    }
    const note = {
        id: generateIdNote(),
        content: body.content,
        important: Boolean(body.important) || false,
    };
    notes.push(note);
    console.log(note);
    response.json(note);
});

// Persons
app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).json({
            error: "No exist person",
        });
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    console.log(persons);
    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    const searchName = persons.find((person) => person.name === body.name);
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number missing",
        });
    }
    if (searchName) {
        return response.status(400).json({
            error: "exist name",
        });
    }
    const person = {
        id: generateIdPerson(),
        name: body.name,
        number: body.number,
    };
    persons.push(person);
    console.log(person);
    response.json(person);
});

// info
app.get("/info", (request, response) => {
    let personCount = persons.length;
    console.log(personCount);
    let now = new Date();
    response.send(`<h3>phonebook has info ${personCount} people</h3><h4>${now}</h4>`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

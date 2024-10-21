const express = require('express');
const app = express();

// Utiliser express.json() pour traiter les données JSON
app.use(express.json());

// Simuler une base de données locale avec un tableau
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Route POST pour ajouter un nouvel élément
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).send(newItem);
});

// Route GET pour récupérer tous les éléments
app.get('/items', (req, res) => {
  res.status(200).send(items);
});

// Route GET pour récupérer un élément spécifique par ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.send(item);
});

// Route PUT pour mettre à jour un élément par ID
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = req.body.name; // Mettre à jour le nom de l'élément
  res.send(item);
});

// Route DELETE pour supprimer un élément par ID
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');

  const deletedItem = items.splice(itemIndex, 1); // Supprimer l'élément
  res.send(deletedItem);
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

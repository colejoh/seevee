var products = {

  getAll: function(req, res) {
    var allProducts = data; // Spoof a DB call
    res.json(allProducts);
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var product = data[0]; // Spoof a DB call
    res.json(product);
  },

  create: function(req, res) {
    var newProduct = req.body;
    data.push(newProduct); // Spoof a DB call
    res.json(newProduct);
  },

  update: function(req, res) {
    var updateProduct = req.body;
    var id = req.params.id;
    data[id] = updateProduct // Spoof a DB call
    res.json(updateProduct);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

var data = [{
  title: 'CEO & Cofounder',
  importance: 100,
  place: 'seevee',
  dateStart: '2016',
  dateEnd: null,
  type: 'work',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
},
{
  title: 'CTO',
  importance: 23,
  place: 'seevee',
  dateStart: '2016',
  dateEnd: null,
  type: 'work',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
},
{
  title: 'Engineer',
  importance: 83,
  place: 'seevee',
  dateStart: '2016',
  dateEnd: null,
  type: 'work',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
},
{
  title: 'B.S. Computer Science',
  importance: 23,
  place: 'Purdue Univeristy',
  dateStart: '2015',
  dateEnd: '2019',
  type: 'ed',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
},
{
  title: 'Best Guy',
  importance: 66,
  place: 'seevee',
  dateStart: '2012',
  dateEnd: null,
  type: 'honor',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
},
{
  title: 'Yep',
  importance: 52,
  place: 'boilermake',
  dateStart: '2015',
  dateEnd: null,
  type: 'project',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
},
];

module.exports = products;

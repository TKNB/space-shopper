const conn = require('./conn');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Product = require('./Product');
const User = require('./User');

Order.belongsTo(User)
User.hasMany(Order)
User.hasMany(Product)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
LineItem.belongsTo(Product)
Product.hasMany(LineItem)

const syncAndSeed = () => conn.sync({ force: true })
  .then(async () => {
    const [carlSagan, nicolausCopernicus, albertEinstein] = await
      Promise.all([
        User.create({
          //temporary id hard coding
          id: 'c211e173-5346-4044-a2a3-9109460c6d47',
          username: 'CarlSagan@cosmos.net',
          firstName: 'Carl',
          lastName: 'Sagan',
          password: 'yuman',
        }),
        User.create({
          username: 'NicolausCopernicus@heliocentric.net',
          firstName: 'Nicolaus',
          lastName: 'Copernicus',
          password: 'flatEarth',
        }),
        User.create({
          username: 'AlbertEinstein@emc2.net',
          firstName: 'Albert',
          lastName: 'Einstein',
          password: 'itsAllRelative',
        }),
      ])

    const [comet, sun, blackHole, string, milkyWay, popRocks] = await
      Promise.all([
        Product.create({
          name: 'Comet',
          description: 'An icy small Solar System body.',
          price: 6000000,
          imageUrl: 'http://www.clker.com/cliparts/Q/f/q/B/X/O/comet-md.png',
          userId: carlSagan.id,
        }),
        Product.create({
          name: 'Sun',
          description: 'The star at the center of the Solar System.',
          price: 10000000,
          imageUrl: 'https://pngimg.com/uploads/sun/sun_PNG13424.png',
          userId: carlSagan.id,
        }),
        Product.create({
          name: 'Black hole',
          description: 'A region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.',
          price: 50000000,
          imageUrl: 'https://moziru.com/images/black-hole-clipart-transparent-3.png',
          userId: carlSagan.id,
        }),
        Product.create({
          name: 'String',
          description: 'Point-like particles of the quantum field.',
          price: 10,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Calabi_yau_formatted.svg/220px-Calabi_yau_formatted.svg.png',
          userId: albertEinstein.id,
        }),
        Product.create({
          name: 'Milky Way Candy Bar',
          description: 'It\'s a candy bar',
          price: 2,
          imageUrl: 'https://s3-us-west-1.amazonaws.com/vbs2016/wp-content/uploads/2017/04/26172850/milky-way-candy-bar.png',
          featured: true,
          userId: albertEinstein.id,
        }),
        Product.create({
          name: 'Pop Rocks',
          description: 'Taste the EXPLOSION!',
          price: 1,
          imageUrl: 'https://cdn.shopify.com/s/files/1/0972/7116/products/pop-rocks-watermelon.png?v=1459348676',
          featured: true,
          userId: nicolausCopernicus.id,
        }),
      ])

    const order1 = await Order.create({
      userId: carlSagan.id,
    });

    const order2 = await Order.create({
      complete: true,
      userId: carlSagan.id,
    });

    const order3 = await Order.create({
      complete: true,
      userId: albertEinstein.id,
    });

    await Promise.all([
      LineItem.create({ productId: comet.id, orderId: order1.id, qty: 3 }),
      LineItem.create({ productId: blackHole.id, orderId: order2.id, qty: 2 }),
      LineItem.create({ productId: sun.id, orderId: order3.id, qty: 1 }),
      LineItem.create({ productId: comet.id, orderId: order3.id, qty: 5 }),
      LineItem.create({ productId: popRocks.id, orderId: order1.id, qty: 8 }),
      LineItem.create({ productId: sun.id, orderId: order3.id, qty: 4 }),
    ])

  }).then(() => console.log('--> DB Seeded <--'))

module.exports = { syncAndSeed }

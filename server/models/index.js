const conn = require('./conn');
//const LineItem = require('./LineItem');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

Order.belongsTo(User)
User.hasMany(Order)

// Order.hasMany(LineItem)
// LineItem.belongsTo(Order)
// LineItem.belongsTo(Product)

const syncAndSeed = () => conn.sync({ force: true })
  .then(async () => {
    const [carlSagan, nicolausCopernicus, albertEinstein] = await
      Promise.all([
        User.create({
          id: '26858798-85a0-41f5-a1e5-8148f7ed9904',
          username: 'CarlSagan@cosmos.net',
          firstName: 'Carl',
          lastName: 'Sagan',
          password: 'yuman',
        }),
        User.create({
          id: 'f925c63e-04c1-4d9f-9888-ca9fe60d82f6',
          username: 'NicolausCopernicus@heliocentric.net',
          firstName: 'Nicolaus',
          lastName: 'Copernicus',
          password: 'flatEarth',
        }),
        User.create({
          id: 'f930647d-d1d3-4c39-80eb-bbcf319b3e9d',
          username: 'AlbertEinstein@emc2.net',
          firstName: 'Albert',
          lastName: 'Einstein',
          password: 'itsAllRelative',
        }),
      ])

    const [comet, sun, blackHole, string] = await
      Promise.all([
        Product.create({
          name: 'Comet',
          description: 'An icy small Solar System body.',
          price: 6000000,
          imageUrl: 'http://www.clker.com/cliparts/Q/f/q/B/X/O/comet-md.png',
        }),
        Product.create({
          name: 'Sun',
          description: 'The star at the center of the Solar System.',
          price: 10000000,
          imageUrl: 'https://pngimg.com/uploads/sun/sun_PNG13424.png',
        }),
        Product.create({
          name: 'Black hole',
          description: 'A region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.',
          price: 50000000,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/BH_LMC.png',
        }),
        Product.create({
          name: 'String',
          description: 'Point-like particles of the quantum field.',
          price: 10,
          imageUrl: 'https://i.huffpost.com/gen/907310/images/o-WHAT-IS-STRING-THEORY-facebook.jpg',
        }),
      ])

    const order1 = await Order.create({
      id: 'b7f123d2-718f-4756-9404-6108785200e5',
      complete: false,
      userId: carlSagan.id,
    });

    const order2 = await Order.create({
      id: '822992d7-3fac-435b-b500-fba6221a37e2',
      complete: false,
      userId: carlSagan.id,
    });

    const order3 = await Order.create({
      id: '30ee0eb2-7a65-4ccd-8dac-c0261cd9fd11',
      complete: true,
      userId: albertEinstein.id,
    });

    // await Promise.all([
    //   LineItem.create({ productId: comet.id, orderId: order1.id, qty: 3 }),
    //   LineItem.create({ productId: blackHole.id, orderId: order2.id, qty: 2 }),
    //   LineItem.create({ productId: sun.id, orderId: order3.id, qty: 1 }),
    //   LineItem.create({ productId: comet.id, orderId: order3.id, qty: 5 }),
    //   LineItem.create({ productId: comet.id, orderId: order1.id, qty: 8 }),
    //   LineItem.create({ productId: sun.id, orderId: order3.id, qty: 4 }),
    // ])

  }).then(() => console.log('--> DB Seeded <--'))

module.exports = { syncAndSeed }

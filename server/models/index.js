const conn = require('./conn');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Product = require('./Product');
const User = require('./User');
const Category = require('./Category');
const Review = require('./Review');
const jwt = require('jwt-simple');

Order.belongsTo(User);
User.hasMany(Order);
User.hasMany(Product);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Product.hasMany(LineItem);
Product.belongsTo(Category);
Category.hasMany(Product);
Review.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Review);

const syncAndSeed = () =>
  conn
    .sync({ force: true })
    .then(async () => {
      const [carlSagan, nicolausCopernicus, albertEinstein] = await Promise.all(
        [
          User.create({
            //temporary id hard coding
            id: 'c211e173-5346-4044-a2a3-9109460c6d47',
            username: 'CarlSagan@cosmos.net',
            firstName: 'Carl',
            lastName: 'Sagan',
            password: jwt.encode('yuman', process.env.JWT_SECRET || 'TKNB'),
          }),
          User.create({
            username: 'NicolausCopernicus@heliocentric.net',
            firstName: 'Nicolaus',
            lastName: 'Copernicus',
            password: jwt.encode('flatEarth', process.env.JWT_SECRET || 'TKNB'),
          }),
          User.create({
            username: 'AlbertEinstein@emc2.net',
            firstName: 'Albert',
            lastName: 'Einstein',
            password: jwt.encode(
              'ItsAllRelative',
              process.env.JWT_SECRET || 'TKNB'
            ),
          }),
        ]
      );

      const [
        planets,
        comets,
        stars,
        quantumPhysics,
        chocolates,
      ] = await Promise.all([
        Category.create({
          name: 'Planets',
          description:
            'a celestial body moving in an elliptical orbit around a star.',
        }),
        Category.create({
          name: 'Comets',
          description:
            'Comets are cosmic snowballs of frozen gases, rock and dust that orbit the Sun',
        }),
        Category.create({
          name: 'Stars',
          description:
            'A star is type of astronomical object consisting of a luminous spheroid of plasma held together by gravity',
        }),
        Category.create({
          name: 'Quantum Physics',
          description: 'Space snacks are always amazing',
        }),
        Category.create({
          name: 'Chocolates',
          description: 'Space snacks are always amazing',
        }),
      ]);
      const [
        comet,
        sun,
        blackHole,
        string,
        milkyWay,
        popRocks,
      ] = await Promise.all([
        Product.create({
          name: 'Comet',
          description: 'An icy small Solar System body.',
          price: 6000000,
          imageUrl: 'http://www.clker.com/cliparts/Q/f/q/B/X/O/comet-md.png',
          userId: carlSagan.id,
          categoryId: comets.id,
        }),
        Product.create({
          name: 'Sun',
          description: 'The star at the center of the Solar System.',
          price: 10000000,
          imageUrl: 'https://pngimg.com/uploads/sun/sun_PNG13424.png',
          userId: carlSagan.id,
          categoryId: stars.id,
        }),
        Product.create({
          name: 'Black hole',
          description:
            'A region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.',
          price: 50000000,
          imageUrl:
            'https://moziru.com/images/black-hole-clipart-transparent-3.png',
          userId: carlSagan.id,
          categoryId: quantumPhysics.id,
        }),
        Product.create({
          name: 'String',
          description: 'Point-like particles of the quantum field.',
          price: 10,
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Calabi_yau_formatted.svg/220px-Calabi_yau_formatted.svg.png',
          userId: albertEinstein.id,
          categoryId: quantumPhysics.id,
        }),
        Product.create({
          name: 'Milky Way',
          description: "It's a candy bar",
          price: 2,
          imageUrl:
            'https://s3-us-west-1.amazonaws.com/vbs2016/wp-content/uploads/2017/04/26172850/milky-way-candy-bar.png',
          featured: true,
          userId: albertEinstein.id,
          categoryId: chocolates.id,
        }),
        Product.create({
          name: 'Pop Rocks',
          description: 'Taste the EXPLOSION!',
          price: 1,
          imageUrl:
            'https://cdn.shopify.com/s/files/1/0972/7116/products/pop-rocks-watermelon.png?v=1459348676',
          featured: true,
          userId: nicolausCopernicus.id,
          categoryId: chocolates.id,
        }),
      ]);

      await Promise.all([
        Review.create({
          rating: 4,
          review: 'Beautiful tail, no regrets!',
          userId: carlSagan.id,
          productId: comet.id,
        }),
        Review.create({
          rating: 5,
          review: 'Will create a monopoly on sun :evil:',
          userId: nicolausCopernicus.id,
          productId: sun.id,
        }),
        Review.create({
          rating: 3,
          review: 'No reviews, no one ever came back to leave one.',
          userId: albertEinstein.id,
          productId: blackHole.id,
        }),
        Review.create({
          rating: 2,
          review: 'Fun stuff no one can even see. Was I scammed???',
          userId: carlSagan.id,
          productId: string.id,
        }),
        Review.create({
          rating: 5,
          review: 'my favorite candy since I can remember myself!!!',
          userId: nicolausCopernicus.id,
          productId: milkyWay.id,
        }),
        Review.create({
          rating: 4,
          review: 'pop ROCKS!!!',
          userId: albertEinstein.id,
          productId: popRocks.id,
        }),
      ]);

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
        LineItem.create({
          productId: blackHole.id,
          orderId: order2.id,
          qty: 2,
        }),
        LineItem.create({ productId: sun.id, orderId: order3.id, qty: 1 }),
        LineItem.create({ productId: comet.id, orderId: order3.id, qty: 5 }),
        LineItem.create({ productId: popRocks.id, orderId: order1.id, qty: 8 }),
        LineItem.create({ productId: sun.id, orderId: order3.id, qty: 4 }),
      ]);
    })
    .then(() => console.log('--> DB Seeded <--'));

module.exports = { syncAndSeed };

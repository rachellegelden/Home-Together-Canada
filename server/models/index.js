/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: initial setup required for express app to interact with the database
 *
 */

const { DataTypes, Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/../db.config.js')[env];

const sequelize = new Sequelize({
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    pool: dbConfig.POOL,
    dialect: dbConfig.DIALECT
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.abstractUser = require('./abstractUser.js')(DataTypes, sequelize);
db.businessAccount = require('./businessAccount.js')(DataTypes, sequelize);
db.memberAccount = require('./memberAccount.js')(DataTypes, sequelize);
db.livesWith = require('./livesWith.js')(DataTypes, sequelize);
db.areaOfInterest = require('./areaOfInterest')(DataTypes, sequelize);
db.listing = require('./listing')(DataTypes, sequelize);
db.listingCategory = require('./listingCategory')(DataTypes, sequelize);
db.listingSubcategory = require('./listingSubcategory')(DataTypes, sequelize);
db.listingAssignedSubcategory = require('./listingAssignedSubcategory')(DataTypes, sequelize);
db.memberListingLocation = require('./memberListingLocation')(DataTypes, sequelize);
db.message = require('./message')(DataTypes, sequelize);

db.businessAccount.belongsTo(db.abstractUser, {
    foreignKey: {
        name: 'uid',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.abstractUser.hasOne(db.businessAccount, {
    foreignKey: {
        name: 'uid',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

db.memberAccount.belongsTo(db.abstractUser, {
    foreignKey: {
        name: 'uid',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

db.memberAccount.belongsToMany(db.memberAccount, { as: "Roommates", through: db.livesWith });

db.memberAccount.hasMany(db.areaOfInterest, {
    foreignKey: {
        name: 'uid'
    },
    onDelete: 'CASCADE'
});

// relationship between listings and abstract users
db.listing.belongsTo(db.abstractUser, {
    foreignKey: {
        name: 'uid',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.abstractUser.hasMany(db.listing, {
    onDelete: 'CASCADE'
});

// relationship between listings and categories
db.listing.belongsTo(db.listingCategory, {
    onDelete: 'CASCADE'
});
db.listingCategory.hasMany(db.listing, {
    onDelete: 'CASCADE'
});

// relationship between categories and subcategories
db.listingSubcategory.belongsTo(db.listingCategory, {
    onDelete: 'CASCADE'
});
db.listingCategory.hasMany(db.listingSubcategory), {
    onDelete: 'CASCADE'
};

// Through table for listings and subcategories
db.listingSubcategory.belongsToMany(db.listing, {
    through: db.listingAssignedSubcategory,
});
db.listing.belongsToMany(db.listingSubcategory, {
    through: db.listingAssignedSubcategory
});

// Relationship between member listing locations and listings
db.listing.hasOne(db.memberListingLocation, {
    onDelete: 'CASCADE'
});
db.memberListingLocation.belongsTo(db.listing, {
    onDelete: 'CASCADE'
});

module.exports = db;

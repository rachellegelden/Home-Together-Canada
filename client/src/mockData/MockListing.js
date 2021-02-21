/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.02.20
 *
 * @Description: Mock Listing
 *
 */
import {BUSINESS_SERVICE_CATEGORIES} from "../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../createListing/constants/classifiedListingCategoriesText";

var faker = require('faker');

export const mockServiceListings = [
    //CO-HOUSING 0
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.CO_HOUSING,
        full_des: faker.lorem.paragraph(),
        contactName: faker.name.findName(),
        unitsForSale: faker.random.number(),
        unitsForRent: faker.random.number(),
    },
    // SHARED HOME 1
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES,
        full_des: faker.lorem.paragraph(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // SHARED BUSINESS 2
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES,
        full_des: faker.lorem.paragraph(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // GOVERNMENT 3
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES,
        full_des: faker.lorem.paragraph(),
        contactName: faker.name.findName(),
        contactPhoneNumber: faker.phone.phoneNumber(),
    }
]

export const mockClassifiedsListings = [
    //RENTALS 0
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS,
        full_des: faker.lorem.paragraph(),

        price: faker.random.number(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
        numBed: faker.random.number(),
        numBath: faker.random.number(),
        furnished: faker.random.boolean(),
        petFriendly: faker.random.boolean(),
        smokeFriendly: faker.random.boolean(),
    },
    // HOUSE_YARD 1
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD,
        full_des: faker.lorem.paragraph(),

        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // LEGAL_SALES 2
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES,
        full_des: faker.lorem.paragraph(),

        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // CLASSES_CLUBS 3
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS,
        full_des: faker.lorem.paragraph(),

        contactName: faker.name.findName(),
        contactPhoneNumber: faker.phone.phoneNumber(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
        eventDateTime: faker.date.soon() + " " + faker.time.recent()
    }
]
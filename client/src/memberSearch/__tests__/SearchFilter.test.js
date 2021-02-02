/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.28
 *
 * @Description: Search Filter Snapshot Test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import SearchFilter from "../SearchFilter";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('SearchFilter', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                genderPreference: ["Male", "Female"],
                handleGenderPrefChange: jest.fn(),

                familyStatusPreference: ["Single", "Couple"],
                setFamilyStatusPreference: jest.fn(),

                minAgePreference: 20,
                setMinAgePreference: jest.fn(),
                minAgePreferenceError: true,

                maxAgePreference: 25,
                setMaxAgePreference: jest.fn(),
                maxAgePreferenceError: false,

                selectedLimitPreference: [1,3],
                handleSelectedLimitPreferenceChange: jest.fn(),

                minBudgetPreference: 200,
                setMinBudgetPreference: jest.fn(),
                minBudgetPreferenceError: false,

                maxBudgetPreference: 250,
                setMaxBudgetPreference: jest.fn(),
                maxBudgetPreferenceError: true,

                petPreference: true,
                setPetPreference: jest.fn(),

                smokingPreference: true,
                setSmokingPreference: jest.fn(),

                religionPreference: true,
                setReligionPreference: jest.fn(),

                dietPreference: false,
                setDietPreference: jest.fn(),

                homeToSharePreference: false,
                setHomeToSharePreference: jest.fn(),

                onSubmit: jest.fn(),
            }

            // when
            const component = renderer.create(<Router><SearchFilter {...props} /></Router>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})
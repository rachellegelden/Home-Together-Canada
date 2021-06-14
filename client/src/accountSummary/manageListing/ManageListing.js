/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.6.9
 *
 * @Description: Manage Listing Cards
 *
 */

import React, {useState} from "react";
import PropTypes from "prop-types";
import {MdDeleteForever} from "react-icons/md";
import Modal from 'react-modal';
import {TAB_LABELS} from "./ManageListingTabs";
import MemberListingCard from "../../searchServicesClassifieds/listingCards/MemberListingCard";
import Paginate from "../../common/forms/Paginate";
import {customModalStyles} from "../../css/ModelCSSUtil";


const MANAGE_LISTING_TEXT = {
    TITLE: "Manage Listings",
    DESCRIPTION: "Use the tabs below to view your listings based on their status.",
    NO_LISTING: "No ",
    CONFIRM_DELETE: "Are you sure you want to delete listing #",
    DELETE: "Delete",
    CANCEL: "Cancel"
}

const NUM_RESULTS = 7;
Modal.setAppElement('body')

function ManageListing(props) {
    const {
        onSubmit,
        listingData,
        activeTab
    } = props;

    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [listingID, setListingID] = useState();

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function deleteListing() {
        closeModal();
        onSubmit(listingID);
    }

    const onClickDecision = (listingID) => {
        setListingID(listingID);
        openModal();
    }

    //TODO: Refactor to handle business cards as well
    function displayListingCards() {
        const listingCards = listingData.map(
            (listing) =>
                <div className={"flex"} key={listing.id}>
                    <section className={"w-full"}>
                        <MemberListingCard
                            title={listing.title}
                            monthlyCost={listing.monthlyCost}
                            petFriendly={listing.petFriendly}
                            smokeFriendly={listing.smokeFriendly}
                            shortDescription={listing.shortDescription}
                            datePosted={listing.createdAt}/>
                    </section>

                    {/* only show delete button (garbage can) when the listing status is LIVE */}
                    {activeTab === TAB_LABELS[0] &&
                    <section className={"my-8"}>
                        <MdDeleteForever color="#DB4437" size="40"
                                         onClick={() => onClickDecision(listing.id)}/>
                    </section>
                    }
                </div>
        );

        return <Paginate data={listingCards} resultsPerPage={NUM_RESULTS}/>
    }

    return (
        <div>
            {listingData && displayListingCards()}

            {listingData && <Modal
                isOpen={IsModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Confirm Decision for Listing"
            >
                {/*TODO: Change ListingID to Listing Title to display to user*/}
                <h1 className={"text-gray-800 h1"}>{MANAGE_LISTING_TEXT.CONFIRM_DELETE}{listingID + "?"} </h1>
                <section className={"flex pt-10 space-x-10"}>
                    <button type={"button"} className="py-2 w-1/2 bg-gray-500 btn" onClick={closeModal}>
                        {MANAGE_LISTING_TEXT.CANCEL}
                    </button>
                    <button
                        type={"submit"}
                        className={"btn-red btn w-1/2 py-2"}
                        onClick={deleteListing}
                        value={MANAGE_LISTING_TEXT.DELETE}
                    >
                        {MANAGE_LISTING_TEXT.DELETE}
                    </button>
                </section>
            </Modal>
            }
        </div>
    );
}

ManageListing.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingData: PropTypes.array,
    activeTab: PropTypes.string
};

export default ManageListing;
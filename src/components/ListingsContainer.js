import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";

function ListingsContainer({ search }) {
  const [listings, setListings] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  
  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then(resp => resp.json())
      .then(data => setListings(data))
  }, []);

  function handleDelete(id) {
    const updatedListings = listings.filter(
      listing => listing.id !== id
    )

    setListings(updatedListings);
  }

  function handleAdd(newListing) {
    const updatedListings = [newListing, ...listings];
    setListings(updatedListings);
  }

  let listingCards = listings
    .filter(listing =>
      listing.description.toLowerCase().include(search.toLowerCase())
    )

    .sort((listingA, listingB) => {
      if (sortBy === "id") {
        return listingA.id - listingB.id;
      } else {
        return listingA.location.localeCompare(listingB.location);
      }
    })

    .map(listingObj => {
      <ListingCard
        key={listingObj.id}
        listing={listingObj}
        onDeleteListing={handleDelete}
      />
    })

  return (
    <main>
      <NewListingForm onAddListing={handleAdd} />
      <button onClick={() => setSortBy("id")}>Sort By Default</button>
      <button onClick={() => setSortBy("location")}>Sort By Location</button>
      <ul className="cards">
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;

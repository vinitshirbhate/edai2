import React from "react";
import BookCard from "../components/Card";

const ModalComp = ({ open, setOpen, suitableCrops }) => {
  const { farm, cashCrops, indoor } = suitableCrops;

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Suitable Crops</h3>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Farm Crops</h4>
          {farm.length > 0 ? (
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
              {farm.map((crop) => (
                <BookCard
                  key={crop.id}
                  name={crop.id}
                  {...crop.data()}
                  showSuggestionButton={true}
                />
              ))}
            </div>
          ) : (
            <p>No farm crops can grow in these conditions</p>
          )}
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Cash Crops</h4>
          {cashCrops.length > 0 ? (
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
              {cashCrops.map((crop) => (
                <BookCard
                  key={crop.id}
                  name={crop.id}
                  {...crop.data()}
                  showSuggestionButton={true}
                />
              ))}
            </div>
          ) : (
            <p>No cash crops can grow in these conditions</p>
          )}
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Indoor Plants</h4>
          {indoor.length > 0 ? (
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
              {indoor.map((crop) => (
                <BookCard
                  key={crop.id}
                  name={crop.id}
                  {...crop.data()}
                  showSuggestionButton={true}
                />
              ))}
            </div>
          ) : (
            <p>No indoor plants can grow in these conditions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComp;

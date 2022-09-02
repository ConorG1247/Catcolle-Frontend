type props = {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
};
function CreationButtons({ nextPage, prevPage, currentPage }: props) {
  console.log(currentPage);
  return (
    <div
      style={currentPage > 0 ? { justifyContent: "center" } : {}}
      className="usercreation-continue-container"
    >
      {currentPage > 0 && (
        <div className="usercreation-continue" onClick={prevPage}>
          Back
        </div>
      )}
      <div className="usercreation-continue" onClick={nextPage}>
        {currentPage === 3 ? "Confirm" : "Continue"}
      </div>
    </div>
  );
}

export default CreationButtons;

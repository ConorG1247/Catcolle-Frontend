type props = {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
};
function CreationButtons({ nextPage, prevPage, currentPage }: props) {
  return (
    <div className="usercreation-continue-container">
      <div className="usercreation-continue" onClick={nextPage}>
        Continue
      </div>
      {currentPage > 0 && (
        <div className="usercreation-continue" onClick={prevPage}>
          Back
        </div>
      )}
    </div>
  );
}

export default CreationButtons;

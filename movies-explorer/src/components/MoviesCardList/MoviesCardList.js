import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import NoResults from "../NoResults/NoResults";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
    isLoading,
    moviesFiltered,
    cardsToShow,
    likedMovies,
    cardLikeButtonClicked,
    cardButtonClicked
}) {

    return (
        <section className="moviesList">
            {isLoading && <Preloader />}
            {cardsToShow.length > 0 ? (
                <ul className="films-list">
                    {cardsToShow.map((movie) => {
                        return (
                            <MoviesCard
                                key={movie._id || movie.id}
                                movie={movie}
                                likedMovies={likedMovies}
                                cardLikeButtonClicked={cardLikeButtonClicked}
                                cardButtonClicked={cardButtonClicked}                              
                            />
                        );
                    })}
                </ul>
            ) : (
                <NoResults />
            )}
        </section>
    );
}

export default MoviesCardList;

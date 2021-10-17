import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import NoResults from "../NoResults/NoResults";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
    isLoading,
    moviesFiltered,
    likedMovies,
    cardLikeButtonClicked,
    cardDislikeButtonClicked,
}) {
    return (
        <section className="MoviesList">
            {isLoading && <Preloader />}
            {moviesFiltered.length > 0 ? (
                <ul className="films-list">
                    {moviesFiltered.map((movie) => {
                        return (
                            <MoviesCard
                                key={movie._id || movie.id}
                                movie={movie}
                                likedMovies={likedMovies}
                                cardLikeButtonClicked={cardLikeButtonClicked}
                                cardDislikeButtonClicked={cardDislikeButtonClicked}
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

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Rating } from 'semantic-ui-react';
import './MovieInfo.css';
import Placeholder from '../../styles/images/placeholder.png';
import MoviePlaceholder from '../../styles/images/moviePlaceholder.png';

const MovieInfo = props => {
  console.log(props);
  const { favorite, watchlist } = props;
  let posterImg = 'https://image.tmdb.org/t/p/w300' + props.movie.poster_path;

  const genres = props.movie.genres.map((genre, i) => {
    return <h4 key={i}>{genre.name}</h4>;
  });

  let director = null;
  for (let i = 0; i < props.movie.credits.crew.length; i++) {
    if (props.movie.credits.crew[i].job === 'Director') {
      director = props.movie.credits.crew[i].name;
      break;
    }
  }

  let videoLink = '';
  for (let i = 0; i < props.movie.videos.results.length; i++) {
    if (props.movie.videos.results[i].type === 'Trailer') {
      videoLink =
        'https://www.youtube.com/embed/' + props.movie.videos.results[i].key;
      break;
    }
  }

  const shortenCast = props.movie.credits.cast.slice(0, 10);
  const cast = shortenCast.map((actor, i) => {
    let actorImg = 'https://image.tmdb.org/t/p/w300' + actor.profile_path;
    let link = '/actor/' + actor.id;
    return (
      <Link to={link} key={i}>
        <div className='actor'>
          <img
            src={actor.profile_path === null ? Placeholder : actorImg}
            alt='actor img'
          />
          <p>{actor.name}</p>
        </div>
      </Link>
    );
  });

  const similarArr = props.movie.similar.results.slice(0, 10);
  const similarMovies = similarArr.map((movie, i) => {
    let movieImg = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    let link = '/movie/' + movie.id;
    return (
      <Link to={link} key={i} onClick={props.pageChange}>
        <div className='similarMovie'>
          <img
            src={movie.poster_path !== null ? movieImg : MoviePlaceholder}
            alt='movie img'
          />
        </div>
      </Link>
    );
  });

  return (
    <div className='movieInfo'>
      <div className='top'>
        <div className='left'>
          <div className='poster'>
            <img
              src={
                props.movie.poster_path !== null ? posterImg : MoviePlaceholder
              }
              alt='movie poster'
            />
          </div>
          {Object.keys(props.user).length ? (
            <div className='cataloging'>
              <div onClick={props.changeToFavorite}>
                <FontAwesomeIcon
                  className={favorite ? 'heartColor' : 'heartNoColor'}
                  icon={faHeart}
                  size='2x'
                />
              </div>
              <div onClick={props.putToWatchlist}>
                <FontAwesomeIcon
                  className={watchlist ? 'bookmarkColor' : 'bookmarkNoColor'}
                  icon={faBookmark}
                  size='2x'
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {Object.keys(props.user).length ? (
            <div className='moviewRating'>
              <Rating
                icon='star'
                onRate={props.changeRating}
                defaultRating={0}
                maxRating={10}
              />
            </div>
          ) : (
            ''
          )}
          <div className='rating'>
            <h4>
              TMDB rating
              <FontAwesomeIcon className='star' icon={faStar} />{' '}
              {props.movie.vote_average}
              /10
            </h4>
            <h4>
              MoView rating
              <FontAwesomeIcon className='star' icon={faStar} /> 0/10
            </h4>
          </div>
        </div>

        <div className='right'>
          <div className='description'>
            <h1>
              {props.movie.title} ({props.movie.release_date.slice(0, 4)})
            </h1>
            {props.movie.credits.crew.length !== 0 && (
              <h3>Directed By {director}</h3>
            )}
            <div className='genres'>{genres}</div>
            <h4 className='runtime'>{props.movie.runtime} minutes</h4>
            <div className='summary'>
              <h3>{props.movie.overview}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='cast'>
        <h1>Cast</h1>
        {cast}
      </div>

      {videoLink !== '' && (
        <div className='trailer'>
          <h1>Trailer</h1>
          <iframe
            title='trailer'
            className='video'
            src={videoLink}
            allow='encrypted-media'
          />
        </div>
      )}

      <div className='similar'>
        <h1>Similar movies</h1>
        {similarMovies}
      </div>
    </div>
  );
};

export default MovieInfo;

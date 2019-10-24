import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Comment, Form } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
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
      <div className='actor' key={i}>
        <Link to={link}>
          <img
            src={actor.profile_path === null ? Placeholder : actorImg}
            alt='actor img'
          />
          <p>{actor.name}</p>
        </Link>
      </div>
    );
  });

  const similarArr = props.movie.similar.results.slice(0, 10);
  const similarMovies = similarArr.map((movie, i) => {
    let movieImg = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    let link = '/movie/' + movie.id;
    return (
      <div className='similarMovie' key={i}>
        <Link to={link} onClick={props.moviePageChange}>
          <img
            src={movie.poster_path !== null ? movieImg : MoviePlaceholder}
            alt='movie img'
          />
        </Link>
      </div>
    );
  });

  const reviews = props.reviews.map((review, i) => {
    const { username, time, text, likes, image, userId } = review;
    const timeNowDay = new Date(Date.now()).getTime();
    const timeReviewDay = new Date(time).getTime();
    const diffDays = Number((timeNowDay - timeReviewDay) / (24 * 3600 * 1000));
    let timeStamp = null;
    if (diffDays < 1) {
      timeStamp = `Today at ${new Date(time).getHours()}:${new Date(
        time
      ).getMinutes()}`;
    } else {
      timeStamp = `${Math.round(diffDays)} days ago`;
    }

    const imageLink = process.env.PUBLIC_URL + '/' + image;
    return (
      <Comment key={i}>
        <Comment.Avatar src={imageLink} />
        <Comment.Content>
          <Comment.Author>{username}</Comment.Author>
          <Comment.Metadata>
            <div>{timeStamp}</div>
            <div>
              <FontAwesomeIcon
                className='heartColor'
                icon={faHeart}
                size='1x'
              />
              {likes} likes
            </div>
          </Comment.Metadata>
          <Comment.Text>{text}</Comment.Text>
          <Comment.Actions>
            {props.user._id === userId && (
              <Comment.Action onClick={() => props.openEditForm(i, text)}>
                Edit
              </Comment.Action>
            )}
          </Comment.Actions>
          {props.editing.reviewIndex === i && props.editing.openEdit ? (
            <Form>
              <Form.TextArea
                value={props.editedReview}
                onChange={e => props.changeEdit(e.target.value)}
              />
              <Button
                onClick={props.editReview}
                content='Edit Review'
                primary
              />
            </Form>
          ) : (
            ''
          )}
        </Comment.Content>
      </Comment>
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
          <div className='imdbLink'>
            <a
              href={`https://www.imdb.com/title/${props.movie.imdb_id}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FontAwesomeIcon className='imdbIcon' icon={faImdb} size='4x' />
            </a>
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
                defaultRating={props.rating}
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
              <FontAwesomeIcon className='star' icon={faStar} />{' '}
              {props.totalRating}/10
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

      {Object.keys(props.user).length && (
        <div className='reviewPost'>
          <h1>Add Review</h1>
          <textarea
            name='review'
            className='reviewInput'
            value={props.review}
            onChange={e => props.changeReview(e.target.value)}
            placeholder={`Add your review for ${props.movie.title}...`}
            rows='5'
          ></textarea>
          <Button
            onClick={props.addReview}
            className='addReview'
            color='orange'
          >
            Add Review
          </Button>
        </div>
      )}

      <div className='reviews'>
        <Comment.Group>{reviews}</Comment.Group>
      </div>

      <div className='similar'>
        <h1>Similar movies</h1>
        {similarMovies}
      </div>
    </div>
  );
};

export default MovieInfo;

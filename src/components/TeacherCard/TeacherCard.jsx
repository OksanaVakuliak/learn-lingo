import { useId, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './TeacherCard.module.css';

function TeacherCard({
  teacher,
  isFavorite = false,
  activeLevel,
  onToggleFavorite,
}) {
  const {
    name,
    surname,
    languages,
    levels,
    rating,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
    reviews = [],
  } = teacher;

  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  const fullName = `${name} ${surname}`;
  const highlightedLevel = activeLevel ?? levels[0];

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.favorite}
        aria-pressed={isFavorite}
        aria-label={`Add ${fullName} to favorites`}
        onClick={onToggleFavorite}
      >
        <Icon name={isFavorite ? 'heart-filled' : 'heart'} size={26} />
      </button>

      <div className={styles.avatar}>
        <img
          src={avatar_url}
          alt={fullName}
          width="96"
          height="96"
          loading="lazy"
        />
        <span className={styles.status} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.identity}>
            <p className={styles.label}>Languages</p>
            <h2 className={styles.name}>{fullName}</h2>
          </div>

          <ul className={styles.stats}>
            <li>
              <Icon name="book-open" size={16} />
              Lessons online
            </li>
            <li>Lessons done: {lessons_done}</li>
            <li>
              <Icon name="star" size={16} className={styles.star} />
              Rating: {rating}
            </li>
            <li>
              Price / 1 hour:{' '}
              <span className={styles.price}>{price_per_hour}$</span>
            </li>
          </ul>
        </div>

        <div className={styles.details}>
          <p>
            <span className={styles.label}>Speaks: </span>
            <span className={styles.speaks}>{languages.join(', ')}</span>
          </p>
          <p>
            <span className={styles.label}>Lesson Info: </span>
            {lesson_info}
          </p>
          <p>
            <span className={styles.label}>Conditions: </span>
            {conditions.join(' ')}
          </p>
        </div>

        <button
          type="button"
          className={styles.readMore}
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>

        <div id={detailsId} className={styles.expanded} hidden={!isExpanded}>
          <p>{experience}</p>

          {reviews.length > 0 && (
            <ul className={styles.reviews}>
              {reviews.map(
                ({ reviewer_name, reviewer_rating, comment }, index) => (
                  <li
                    key={`${reviewer_name}-${index}`}
                    className={styles.review}
                  >
                    <div className={styles.reviewer}>
                      <span
                        className={styles.reviewerAvatar}
                        aria-hidden="true"
                      >
                        {reviewer_name.charAt(0)}
                      </span>
                      <div>
                        <p className={styles.reviewerName}>{reviewer_name}</p>
                        <p className={styles.reviewerRating}>
                          <Icon
                            name="star"
                            size={16}
                            className={styles.star}
                            label="Rating"
                          />
                          {reviewer_rating}
                        </p>
                      </div>
                    </div>
                    <p>{comment}</p>
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <ul className={styles.levels}>
          {levels.map((level) => (
            <li
              key={level}
              className={[
                styles.level,
                level === highlightedLevel && styles.levelActive,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              #{level}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default TeacherCard;

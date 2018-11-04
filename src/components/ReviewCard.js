import React from 'react';
import { Card, CardTitle, CardText, CardFooter } from 'reactstrap';

const ReviewCard = ({ review, user }) => {
  return (
    <Card>
      <CardTitle className="cardTitle">Rating: {review.rating}</CardTitle>
      <CardText>
        <div>{review.review}</div> by {user.username}
      </CardText>
    </Card>
  );
};

export default ReviewCard;

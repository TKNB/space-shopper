import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardFooter } from 'reactstrap';

const ReviewCard = ({ review, user }) => {
  return (
    <Card>
      <CardTitle>Rating: {review.rating}</CardTitle>
      <CardText>
        {review.review}
        <br />
        by {user.username}
      </CardText>
    </Card>
  );
};

const mapStateToProps = ({ users }, { review }) => {
  const user = users.filter(user => user.id === review.userId).pop();
  return {
    user,
  };
};
export default connect(mapStateToProps)(ReviewCard);

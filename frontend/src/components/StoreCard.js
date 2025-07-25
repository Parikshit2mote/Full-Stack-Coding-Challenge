// frontend/src/components/StoreCard.js
import React from "react";
import { Card, CardContent, Typography, Rating } from "@mui/material";

const StoreCard = ({ store, userRating, onRate }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{store.name}</Typography>
        <Typography variant="body2">{store.address}</Typography>
        <Typography variant="subtitle2">
          Overall Rating: {parseFloat(store.rating || 0).toFixed(1)}
        </Typography>

        {typeof userRating === "number" && (
          <Typography variant="body2">Your Rating: {userRating}</Typography>
        )}

        {onRate && (
          <Rating
            name={`rate-${store.id}`}
            value={userRating || 0}
            onChange={(e, newValue) => onRate(store.id, newValue)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StoreCard;

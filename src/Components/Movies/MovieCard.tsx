import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import cinema from '../../Assets/Images/cinema.png';
import { IMovie } from '../Models/movie';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MovieCard({ id, title, year, imageUrl, description, loading = true }: IMovie) {
  const navigate = useNavigate();
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://cinema-webapi.azurewebsites.net/api/Movie/Delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(`Movie with id ${id} deleted successfully`);
      } else {
        console.error(`Failed to delete movie with id ${id}`);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    navigate('/movies');
  };
  return (
    <Card>
      {loading ? (
        <Skeleton sx={{ height: 600 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          sx={{}}
          component="img"
          src={`${imageUrl}`}
          title={title}
        />
      )}
      <CardContent sx={{ maxHeight: 450 }}>
        {loading ? (
          <React.Fragment>
            <Skeleton height={60} animation="wave" />
            <Skeleton animation="wave" height={200} />
          </React.Fragment>
        ) : (
          <div>
            <Typography gutterBottom variant="h5" component="div" sx={{ minHeight: 20 }}>
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {year}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 200 }}>
              {description}
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/details/${id}`}>Details</Link></Button>
        <Button size="small"><Link to={`/edit/${id}`}>Edit</Link></Button>
        <Button size="small" onClick={() => handleDelete(id)}>Delete</Button>
      </CardActions>
    </Card>
  );
}

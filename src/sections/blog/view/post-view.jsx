import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSearch from '../post-search';
import { useEffect, useState } from 'react';
import postApi from 'src/api/postApi';

// ----------------------------------------------------------------------

export default function BlogView() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('All');

  const getPost = async (params) => {
    const resPost = await postApi.searchPost(params);
    setPosts(resPost.data);
  };

  useEffect(() => {
    (async () => {
      const resPost = await postApi.searchPost();
      setPosts(resPost.data);
    })();
  }, []);

  const options = [
    { value: 'All', label: 'All' },
    { value: 'A', label: 'Active' },
    { value: 'W', label: 'Waiting' },
    { value: 'V', label: 'Verify' },
    { value: 'I', label: 'Inactive' },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Post</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button> */}
      </Stack>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        {posts ? <PostSearch posts={posts} /> : <PostSearch posts={[]} />}

        <div>
          <span className="inline-block mt-2 mr-2">Status: </span>
          <TextField
            select
            size="small"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              if (e.target.value == 'All') {
                getPost();
              } else {
                getPost({ status: e.target.value });
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Stack>
      <Grid container spacing={3}>
        {posts?.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}

import { Helmet } from 'react-helmet-async';

import { PostDetailView } from 'src/sections/post-detail/view';

// ----------------------------------------------------------------------

export default function PostDetailPage() {
  return (
    <>
      <Helmet>
        <title> Post | HomieAdmin</title>
      </Helmet>

      <PostDetailView />
    </>
  );
}

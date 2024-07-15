import { lazy } from 'react';
import { Suspense } from 'react';
import Loading from './components/loading';
const PostList = lazy(() => import('./components/post-list'));

function App() {


  return <main className="flex flex-col justify-center items-center">
    <section> 
      <Suspense fallback={<Loading/>}>
          <PostList />
      </Suspense>
    </section>
  </main>;
}

export default App;

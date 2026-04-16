import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <section className="section">
        <div className="container tile">
          <h1>Page Not Found</h1>
          <p>The page you requested does not exist.</p>
          <Link className="btn btn-primary" to="/">
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;

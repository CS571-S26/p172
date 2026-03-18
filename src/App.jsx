function App() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>BadgerLease</h1>
      <p>
        A specialized sublease marketplace for UW–Madison students.
      </p>

      <section>
        <h2>About the Project</h2>
        <p>
          BadgerLease helps UW–Madison students find and advertise subleases in one centralized platform.
          Students can browse listings, filter by rent, bedrooms, and amenities, and save favorite listings.
        </p>
      </section>

      <section>
        <h2>Planned Features</h2>
        <ul>
          <li>Create and manage sublease listings</li>
          <li>Search and filter by price, bedrooms, and amenities</li>
          <li>Save favorite listings</li>
          <li>Student-focused housing marketplace for Madison</li>
        </ul>
      </section>

      <section>
        <h2>Project Status</h2>
        <p>This is the initial published version of the CS571 web project.</p>
      </section>
    </main>
  );
}

export default App;
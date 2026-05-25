import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ContactList } from './components/Contact/ContactList';
import { ContactForm } from './components/Contact/ContactForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>📋 Contact Manager</h1>
            <nav className="header-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/contacts" className="nav-link">Contacts</Link>
              <Link to="/contacts/new" className="nav-link nav-link-new">+ New Contact</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <div className="home-page">
                <h2>Welcome to Contact Manager</h2>
                <p>Manage your contacts efficiently using this Spring Boot + React CRUD application.</p>
                <Link to="/contacts" className="btn-primary">View Contacts</Link>
              </div>
            } />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/new" element={<ContactForm />} />
            <Route path="/contacts/edit/:id" element={<ContactForm />} />
            <Route path="*" element={<Navigate to="/contacts" replace />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Spring Boot CRUD Application. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;


import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

function DashboardLayout({ user, onLogout }) {
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div style={{marginBottom: '2rem'}}>
          <h1 className="gradient-text" style={{fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em'}}>CAMPUS PORTAL</h1>
          <div style={{marginTop: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div style={{color: 'white', fontWeight: 600, fontSize: '0.95rem'}}>{user.name}</div>
            <div style={{color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500}}>{user.role} • {user.department || 'Campus'}</div>
          </div>
        </div>
        
        <nav className="sidebar-nav" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <Link to={user.role === 'ADMIN' ? "/admin" : "/events"} 
                className={`nav-item ${location.pathname === '/events' || location.pathname === '/admin' ? 'active' : ''}`}>
            🏠 Dashboard Home
          </Link>
          
          {user.role === 'STUDENT' ? (
            <Link to="/my-registrations" 
                  className={`nav-item ${location.pathname === '/my-registrations' ? 'active' : ''}`}>
              ✅ My Registrations
            </Link>
          ) : (
             <Link to="/events" className="nav-item">
               📅 Manage Events
             </Link>
          )}

          <div style={{marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem'}}>
            <button onClick={onLogout} className="nav-item" style={{width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#fca5a5'}}>
              🚪 Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 2.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <span style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>Welcome back, <strong>{user.name}</strong></span>
            <div style={{width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, boxShadow: 'var(--shadow-md)'}}>
              {user.name?.[0]}
            </div>
          </div>
        </header>

        <div className="content" style={{padding: '2.5rem'}}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;

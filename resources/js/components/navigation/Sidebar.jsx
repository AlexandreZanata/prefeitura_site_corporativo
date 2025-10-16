import React, { useMemo, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './Sidebar.css';

function groupChildrenByCategory(children = []) {
  const groups = {};
  children.forEach(c => {
    const key = c.category || 'Outros';
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });
  return groups;
}

function DesktopMenu({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpenIndex(null);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <ul className="nav-menu desktop-only navbar-react" ref={menuRef}>
      {items.map((item, idx) => (
        <li className={`nav-item dropdown ${openIndex === idx ? 'open' : ''}`} key={idx}>
          {(!item.children || item.children.length === 0) ? (
            <a href={item.url || '#'}>{item.name}</a>
          ) : (
            <div className="dropdown">
              <button
                className="nav-button"
                aria-haspopup="true"
                aria-expanded={openIndex === idx}
                aria-controls={`menu-${idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === idx ? null : idx);
                }}
              >
                {item.name} <i className="fa-solid fa-caret-down ms-1"></i>
              </button>
              <div
                id={`menu-${idx}`}
                className={`dropdown-menu-react ${openIndex === idx ? 'open' : ''}`}
                role="menu"
              >
                {Object.entries(groupChildrenByCategory(item.children)).map(([cat, list]) => (
                  <div key={cat}>
                    {cat && <div className="dropdown-header-react">{cat}</div>}
                    {list.map((child, i) => (
                      <a key={i} className="dropdown-item-react" href={child.url || '#'} role="menuitem">{child.name}</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function MobileDrawer({ open, onClose, items, siteName, auth }) {
  const [expanded, setExpanded] = useState({});
  // Close on ESC or overlay click
  useEffect(() => {
    function onKey(e){ if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside id="mobile-drawer" className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-header">
          <strong>{siteName || 'Menu'}</strong>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">
            <span className="icon-close" aria-hidden="true"></span>
          </button>
        </div>
        <div className="drawer-body">
          <div className="drawer-menu" role="menu">
            {items.map((item, idx) => (
              <div key={idx} className="drawer-group">
                {(!item.children || item.children.length === 0) ? (
                  <a href={item.url || '#'} role="menuitem">{item.name}</a>
                ) : (
                  <div>
                    <button
                      className="drawer-toggle"
                      aria-expanded={!!expanded[`p-${idx}`]}
                      aria-controls={`drawer-sec-${idx}`}
                      onClick={() => toggle(`p-${idx}`)}
                    >
                      <span>{item.name}</span>
                      <i className={`fa-solid fa-chevron-right caret ${expanded[`p-${idx}`] ? 'rotated' : ''}`}></i>
                    </button>
                    <div id={`drawer-sec-${idx}`} className={`drawer-section ${expanded[`p-${idx}`] ? 'open' : ''}`}>
                      {Object.entries(groupChildrenByCategory(item.children)).map(([cat, list]) => (
                        <div key={cat}>
                          {cat && <div className="group-title">{cat}</div>}
                          {list.map((child, i) => (
                            <a key={i} href={child.url || '#'} role="menuitem">{child.name}</a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr />
          <div>
            {!auth?.authenticated ? (
              auth?.routes?.login && (
                <a className="btn btn-outline-primary w-100" href={auth.routes.login}>
                  <i className="fa-solid fa-user-shield me-1"></i> Área Restrita
                </a>
              )
            ) : (
              <div className="d-grid gap-2">
                {auth?.routes?.home && (
                  <a className="btn btn-light" href={auth.routes.home}>
                    <i className="fa-solid fa-table-columns fa-fw me-1"></i> Dashboard
                  </a>
                )}
                {auth?.routes?.logout && (
                  <form method="POST" action={auth.routes.logout}>
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                    <button type="submit" className="btn btn-outline-danger">
                      <i className="fa-solid fa-right-from-bracket fa-fw me-1"></i> Logout
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function ReactSidebar() {
  const data = typeof window !== 'undefined' ? (window.__APP__ || {}) : {};
  const items = useMemo(() => Array.isArray(data.menuItems) ? data.menuItems : [], [data.menuItems]);
  const siteName = data.siteName;
  const auth = data.auth || {};
  const [open, setOpen] = useState(false);

  // Close when route changes (basic)
  useEffect(() => {
    function onLinkClick(e){
      const target = e.target.closest('a');
      if (target && target.href) setOpen(false);
    }
    document.addEventListener('click', onLinkClick);
    return () => document.removeEventListener('click', onLinkClick);
  }, []);

  return (
    <div className="navbar-react">
      <div className="nav-left desktop-only">
        <DesktopMenu items={items} />
      </div>
      <div className="nav-right ms-auto d-flex align-items-center">
        {/* Desktop auth actions */}
        <div className="desktop-only">
          {!auth?.authenticated ? (
            auth?.routes?.login && (
              <a className="btn btn-outline-primary btn-sm" href={auth.routes.login}>
                <i className="fa-solid fa-user-shield me-1"></i> Área Restrita
              </a>
            )
          ) : (
            <div className="dropdown">
              <a href="#" className="nav-button" onClick={(e)=>e.preventDefault()}>
                {auth.userName} <i className="fa-solid fa-caret-down ms-1" />
              </a>
              <div className="dropdown-menu-react dropdown-menu-end" style={{right:0, left:'auto'}}>
                {auth?.routes?.home && (
                  <a className="dropdown-item-react" href={auth.routes.home}>
                    <i className="fa-solid fa-table-columns fa-fw me-1"></i> Dashboard
                  </a>
                )}
                {auth?.routes?.logout && (
                  <form method="POST" action={auth.routes.logout}>
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                    <button type="submit" className="dropdown-item-react text-danger">
                      <i className="fa-solid fa-right-from-bracket fa-fw me-1"></i> Logout
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile toggle on the right */}
        <button
          className={`hamburger mobile-only ms-2 ${open ? 'active' : ''}`}
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>

      {/* Mobile right-side drawer */}
      <MobileDrawer open={open} onClose={()=>setOpen(false)} items={items} siteName={siteName} auth={auth} />
    </div>
  );
}

// Auto-mount when the placeholder div exists
(function mountIfPresent(){
  const el = document.getElementById('react-sidebar-root');
  if (!el) return;
  const root = createRoot(el);
  root.render(<ReactSidebar />);
})();

export default ReactSidebar;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, LogOut, User, ChevronDown, CheckCheck } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { getPersonaByEmail } from '../../data/personaData';

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const personaData = user ? getPersonaByEmail(user.email) : null;
  const notifications = personaData?.notifications || [];
  const personaTheme = personaData?.theme;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isLanding = location.pathname === '/';

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b border-border ${isLanding ? 'bg-white/80' : 'bg-white/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to='/' className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="font-bold text-lg text-text-primary hidden sm:block">Credit Catalyst</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {!user ? (
              <>
                <a href="#features" className="px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-gray-50">Features</a>
                <a href="#how-it-works" className="px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-gray-50">How It Works</a>
                <div className="ml-4 flex items-center gap-3">
                  <Link to="/signin" className="px-5 py-2 text-sm font-medium text-primary hover:text-primary-light transition-colors">Sign In</Link>
                  <Link to="/signup" className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-xl transition-all shadow-sm hover:shadow-md">Get Started</Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`px-4 py-2 text-sm rounded-lg transition-colors ${location.pathname === '/dashboard' ? 'text-primary bg-primary/5 font-medium' : 'text-text-secondary hover:text-primary hover:bg-gray-50'}`}>Dashboard</Link>

                {/* Notifications */}
                <div className="relative ml-2" ref={notifRef}>
                  <button
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                    className="relative p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                      >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                          <h3 className="font-semibold text-sm text-text-primary">Notifications</h3>
                          <span className="text-xs text-text-muted flex items-center gap-1">
                            <CheckCheck size={13} /> Mark all read
                          </span>
                        </div>
                        <div className="max-h-72 overflow-y-auto divide-y divide-border">
                          {notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? 'bg-primary/[0.03]' : ''}`}
                            >
                              <div className="flex items-start gap-2">
                                {!n.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                                <div className={!n.read ? '' : 'ml-4'}>
                                  <p className="text-sm font-medium text-text-primary">{n.title}</p>
                                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{n.message}</p>
                                  <p className="text-xs text-text-muted mt-1">{n.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-border text-center">
                          <button className="text-xs text-primary font-medium hover:underline">View all notifications</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative ml-2" ref={profileRef}>
                  <button
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-border"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${personaTheme?.gradient || 'from-primary to-accent'} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{user.name?.charAt(0)}</span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-text-primary leading-tight">{user.name}</p>
                      <p className="text-xs text-text-muted leading-tight">{user.businessName}</p>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-text-muted transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-border">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${personaTheme?.gradient || 'from-primary to-accent'} flex items-center justify-center flex-shrink-0`}>
                              <span className="text-white text-sm font-bold">{user.name?.charAt(0)}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                              <p className="text-xs text-text-secondary truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">
                            <User size={16} />
                            <span>My Profile</span>
                          </button>
                          <div className="my-1 border-t border-border" />
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-danger hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {!user ? (
                <>
                  <a href="#features" className="block px-4 py-2 text-sm text-text-secondary rounded-lg hover:bg-gray-50">Features</a>
                  <a href="#how-it-works" className="block px-4 py-2 text-sm text-text-secondary rounded-lg hover:bg-gray-50">How It Works</a>
                  <Link to="/signin" className="block px-4 py-2 text-sm font-medium text-primary rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link to="/signup" className="block px-4 py-3 text-sm font-medium text-white bg-primary rounded-xl text-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-text-secondary rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-danger rounded-lg hover:bg-red-50">Sign Out</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

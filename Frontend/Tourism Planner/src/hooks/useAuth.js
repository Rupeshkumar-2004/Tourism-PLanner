/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  📘 LESSON: Custom Hooks — Reusable Logic Containers            ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║  A custom hook is just a function that starts with "use".        ║
  ║  It can use other hooks (useState, useEffect, useContext...).    ║
  ║                                                                  ║
  ║  WHY?                                                            ║
  ║  Instead of writing useContext(AuthContext) in every component:   ║
  ║                                                                  ║
  ║    // In Navbar.jsx                                              ║
  ║    import { useContext } from 'react';                           ║
  ║    import { AuthContext } from '../context/AuthContext';          ║
  ║    const auth = useContext(AuthContext);                          ║
  ║                                                                  ║
  ║    // In Dashboard.jsx — same 3 lines again!                     ║
  ║    import { useContext } from 'react';                           ║
  ║    import { AuthContext } from '../context/AuthContext';          ║
  ║    const auth = useContext(AuthContext);                          ║
  ║                                                                  ║
  ║  We create a custom hook and write just:                         ║
  ║                                                                  ║
  ║    import { useAuth } from '../hooks/useAuth';                   ║
  ║    const { user, login, logout } = useAuth();                    ║
  ║                                                                  ║
  ║  Cleaner, and we can add error checking too!                     ║
  ║                                                                  ║
  ║  🎯 INTERNSHIP TIP: "Can you create a custom hook?" is a        ║
  ║  common interview question. The answer is always: extract        ║
  ║  shared logic into a function starting with "use".               ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export function useAuth() {
  const context = useContext(AuthContext);

  // Safety check: if someone uses useAuth() outside of <AuthProvider>,
  // we want a clear error instead of silent `null`.
  if (!context) {
    throw new Error(
      '🚨 useAuth() must be used inside an <AuthProvider>. ' +
      'Wrap your App component with <AuthProvider> in main.jsx.'
    );
  }

  return context;
}
